# Models, and the network

## The writer's models: `api.providers`

Your plugin never holds an API key, a URL, or a list of providers. It asks the kernel, and the kernel sends the request to the writer's default model provider from the main process, where the keys live.

```ts
const reply = await api.providers.complete({
  messages: [{ role: 'user', content: 'Give me a synonym for "quick".' }]
})

let text = ''
await api.providers.stream(
  { messages: [{ role: 'user', content: 'Rewrite: The cat sat.' }] },
  (piece) => {
    text += piece
  },
  signal
)
```

- `complete(request, signal?)` resolves with the whole reply; `stream(request, onText, signal?)` calls `onText` with each piece, in order, then resolves.
- A message is `{ role: 'system' | 'user' | 'assistant', content }`.
- A request may say what it is for with `role: 'writing' | 'quick' | 'building'` (API 0.50.0). The writer can give each role its own provider in Settings > Model providers > Roles, so a small job can use a cheap, fast model. A role the writer left alone uses the default provider, and you never learn which provider answered. Leave `role` out for the default.
- Pass the `signal` your tool handler received so cancelling the box cancels the request.
- Only a plugin whose manifest declares a tool with `"needsProvider": true` may call `api.providers`. Others get `plugin/undeclared-contribution`.

### Errors

Failures reject with a `VeneerError` whose `code` is one of `provider/none` (no provider is set up), `offline`, `auth`, `rate-limit`, `server`, `timeout`, or `canceled`, and a sentence naming the provider. A tool that lets the error through shows it in the selection box as one plain sentence with Retry.

### Disclosure

The first time a tool that `needsProvider` sends text to a **remote** provider, the writer sees "Your text will be sent to <Provider>. It leaves this computer." and chooses Continue or Cancel. A local provider needs no disclosure. You don't build this.

### Showing results as they stream

Use the `report` argument of a tool handler to show completed options while the model is still writing; see [tools and results](tools-and-results.md). The N versions plugin does this: one `stream` call, versions separated by a `===` line, each reported as it completes.

`api.providers` is text only: a plugin cannot offer the model tools or receive tool calls. (The kernel does that for skills, to let a model read a skill's reference files.)

**AI features off.** While the writer has AI features off, `api.providers.stream` and `complete` reject with `ai/off` before anything else. See [AI features](manifests-and-contributions.md#ai-features-the-writers-switch).

## The network: `api.net.fetch`

`api.net.fetch(request, signal?)` is a plugin's only way onto the network (since API 0.20.0). The renderer is sandboxed, so main makes the request for you. It resolves with `{ status, ok, headers, text, truncated }`: any status is an answer (a 404 resolves with `ok: false`), and only a failure to get one rejects.

```ts
export function onload(api: PluginApi): void {
  api.tools.handle('my-plugin:define', async (input) => {
    const word = input.selection?.text.trim() ?? ''
    const response = await api.net.fetch({ url: `https://example.com/define?w=${encodeURIComponent(word)}` })
    return { kind: 'info', items: [{ text: response.ok ? response.text.slice(0, 300) : 'No definition found.' }] }
  })
}
```

**Tools only.** It works while one of your plugin's tools is running. Called from a command, an event, or `onload`, it rejects `plugin/net-outside-tool`: only a tool can ask the writer in the selection box, so only a tool can reach out.

**The writer's say (FR-51).** A tool marked `readOnly` is refused outright (`plugin/read-only-tool`). Any other tool makes the writer confirm the first time, in the selection box: "<Tool> from <Plugin> wants to connect to example.com. Allow it?" Declining rejects `plugin/declined`, nothing is sent, and the plugin is not marked failed. After Allow the tool is not asked again. Mark a tool `readOnly` if it never needs the network or writes.

**Limits.** `http:` and `https:` only, no username or password in the address. Addresses on this computer or its local network (`localhost`, `192.168.x.x`, `10.x.x.x`, and so on) are refused with `net/blocked`, and so is a redirect to one. At most five redirects. No cookies are sent or kept. The body is cut off at 5 MB (`truncated: true`), and a request that takes over 30 seconds rejects `timeout`. Methods are GET, HEAD, POST, PUT, PATCH, and DELETE with a text body.

**Errors.** `offline`, `timeout`, `canceled` (the `signal` aborted), `net/blocked`, `net/invalid` (not a web address, a bad header, a body on a GET), plus the two gate codes above.

**Testing.** The fake host takes `netReplies` (a string is a 200 body) and records `netRequests`. It does not gate by tool; the real host does.

Provider keys never go through this: the writer's models are reached with `api.providers` only, and a key never reaches a plugin.

## Images (API 0.53.0)

`api.providers.image({ prompt, count?, shape? })` makes 1 to 4 pictures with the provider the writer set for the Images role (Settings > Providers > Images: Gemini or OpenAI). It answers `{ images: Uint8Array[], mime }`; save one with `api.vault.saveAttachment` so the writer's image-folder rules apply. The same manifest rule as `complete` applies (a tool that declares `needsProvider`), and it is refused while AI features are off. Failures reject like text requests, plus `provider/none` when no image provider is set up. In tests, the fake host takes `imageReplies` and records `imageRequests`.

## Source folders (API 0.54.0)

`api.sources` reads folders the writer grants a plugin, outside the project: a notes vault, a research folder. The manifest must say `"needs": ["sourceFolders"]` (the install warning reads "Read folders you choose, outside your project"). `pickFolder(label?)` opens the native folder dialog and resolves with `{ id, name, markers }` (or `null` on cancel); the plugin never sees the real path. `markers` lists the hidden folders directly inside it, so `.obsidian` tells an Obsidian vault. `list(id, dir?)`, `read(id, path)` (markdown and text, 1 MB), and `search(id, query, { limit? })` (up to 50 hits, about 2 seconds per folder) are read-only, skip `.obsidian`, `.git`, `.trash`, `node_modules`, and hidden files, and refuse any path that leaves the folder (`..`, absolute paths, links out) with `sources/out-of-scope`. There is no write, rename, or delete. Removing the plugin removes its grants. In tests, the fake host takes `sourceFolders` (a name and its files per folder the writer would pick).

## Model tools (API 0.54.0)

A plugin can let the model use it on a typed ask in the selection box. Declare up to five in `contributes.modelTools`, each `{ id, name, description, parameters }` where `parameters` is a small schema (an object with string and number properties, and `required`). Attach the answer with `api.ai.onModelTool(id, args => text)`; return at most 20 KB of text. The first call per tool and project raises the card's question "Let the model use <plugin>: <tool name>?" (Allow once, Always for this project, Don't allow). Say what the tool reaches with `api.ai.describeModelTool(id, 'your Obsidian vault and Joplin')` so the question can name it. At most five calls per ask; never on a `/` tool run, and never while AI features are off. The writer's answer also covers the network the handler needs, though local addresses still need the writer's allowance. A thrown error becomes a short sentence for the model. In tests, `callModelTool(id, args)` on the fake host calls the handler as the kernel would.

`api.workspace.openExternal(url)` opens a web address in the browser, or an `obsidian://` or `joplin://` link in that app for a plugin that has a matching source (a granted folder, an allowed local address).
