# Manifests and contributions

`manifest.json` is the authority for everything you contribute (tools, commands, settings, surfaces, and so on). Code only attaches handlers to IDs the manifest declares; declaring something in code that the manifest doesn't list throws `plugin/undeclared-contribution`. Because Veneer reads the manifest alone, it can list your contributions without running your code.

```json
{
  "id": "word-goals",
  "name": "Word Goals",
  "version": "1.0.0",
  "apiVersion": "^0.60.0",
  "main": "index.js",
  "contributes": {
    "commands": [{ "id": "word-goals:show", "title": "Show Word Goals" }],
    "settings": [
      {
        "id": "word-goals:daily",
        "type": "number",
        "default": 1000,
        "label": "Daily goal",
        "description": "Words to write each day.",
        "scope": "both"
      }
    ],
    "surfaces": [
      { "id": "word-goals:panel", "title": "Goals", "icon": "target", "side": "right" }
    ]
  },
  "activationEvents": ["vault:saved"]
}
```

## Top-level fields

| Field | Meaning |
|---|---|
| `id` | Lowercase words joined by hyphens: `word-goals`. |
| `name` | Display name, used in notices. |
| `version` | Your plugin's own version. |
| `apiVersion` | `^x.y.z` or exact `x.y.z` of `@veneer/api` it was built for. |
| `main` | The bundled ES module, relative to the folder. |
| `contributes` | Everything you offer; see below. |
| `activationEvents` | Events that wake you before first use, e.g. `["vault:saved"]`. |
| `needs` | Capabilities you say you use (shown to the writer as your word, not verified). |
| `ai` | `"none"`, `"optional"`, or `"required"`: how much you depend on an AI model; see [AI features](#ai-features-the-writers-switch). |
| `requiredProjectType` | A project type ID the open project must have; see [project types](project-types.md). |
| `description` | One line (at most 160 characters) shown under your name in Settings > Plugins and Browse (API 0.58.0). |

## Contributions

Contribution IDs are `<pluginId>:<name>`: `word-goals:show`. Each ID is declared once.

- **`commands`**: `{ id, title }`. They appear in the palette and can take a key in Settings > Keybindings. Attach with `api.commands.handle(id, handler)`.
- **`tools`**: selection-box tools; see [tools and results](tools-and-results.md).
- **`settings`**: see [settings](settings.md).
- **`surfaces`**: `{ id, title, icon, side?, scope?, rowActions? }`: a side panel the kernel draws from data you hand over; see [views](views.md). `icon` is a Lucide icon name; `side` is `"left"` or `"right"`; leave it out and give `scope` (`"project"` opens left, `"file"` opens right), see [Which side](views.md#which-side).
- **`topBarButtons`**: `{ id, title, icon, surface | command }`: a button the writer may turn on. It targets exactly one surface or command that you declare, and stays hidden until turned on.
- **`rowActions`**: `{ surface, id, title, input, appliesTo, key?, prompt?, verb? }`: right-click items you add to a surface another plugin owns, such as the Files panel (`surface: "files:tree"`). `input` is `"confirm"` or `"none"` (runs at once). The items show after the owner's, and you handle them with `api.surfaces.onRowAction(surface, handler)`; the handler gets the row's ID (for the Files panel, the project-relative path). Turning your plugin off removes them.
- **`imageDestination`**: `true`: the plugin chooses where pasted and dropped images are saved, with `api.vault.onImageDestination`. It is asked with the document, the file name, and whether a site root is set; it returns `{ folder, base: 'project' | 'site' }` or `undefined` for the default. See `shelf/plugins/image-year-folder`.
- **`help`** (API 0.57.0): `{ "file": "HELP.md", "title": "My plugin" }`: your plugin's chapter in the in-app Help. `file` is a markdown file in your plugin folder (no leading `/`, no `..`, ending in `.md`); `title` defaults to your plugin's `name`. Veneer reads it only when the writer opens the chapter, so no plugin code runs and it works for a plugin that never activated. The chapter is listed under **Core plugins** or **Plugins**, found in the palette as "Help: <title>", and linked from your plugin's Settings page. A link `[New note](command:my-plugin:new-note)` renders as a button that closes Help and runs that command, with its current key after it; a command that is unknown or off shows as plain text. Only `command:` and `https:` links are live; the chapter is text only (no image paths). A theme-only package may declare it too.
- **`paletteProviders`**: `{ id, title }`: a list of items you feed to the palette; see [views](views.md).
- **`editingModes`, `editorHost`**: for plugins that supply the editor or an editing mode. Advanced; see `api.editor`.
- **`syntax`**: `{ id, kind, pattern, end?, hide?, token?, look?, render?, callout? }`: markup the editor draws for you (a `#tag`, a `%%comment%%`, `$math$`), with no code needed for plain styling. `kind` is `inline`, `line`, or `block` (a block gives `pattern` for its opening line and `end` for its closing line). `pattern` is a JavaScript regular expression source (the kernel sets the flags, and a pattern that does not compile or backtracks badly is dropped with a notice). `hide` lists capture groups to hide off the caret; `token` is a `--vn-*` or your own `--vnp-*` color; `look` is `chip`, `faint`, or `superscript`. Add `render: true` and answer `api.editor.onRenderSyntax(id, handler)` with a text, sanitized HTML or SVG, or project image view that replaces the match off the caret (`api.editor.onSyntaxClick` handles a click on it). Code, front matter, HTML, and link addresses are never matched. Declare `activationEvents: ["app:started"]` so the plugin is loaded before the page is drawn.
- **`projectTypes`**: see [project types](project-types.md).
- **`colors`**: your own color tokens, `--vnp-<pluginId>-<id>`, each with a light and dark default; see [colors and tokens](color-tokens.md).
- **`themes`**: a light and dark pair of color values; see [colors and tokens](color-tokens.md).
- **`keybindings`**: `[{ "command": "word-goals:show", "key": "CmdOrCtrl+Shift+G" }]`. A suggestion binds nothing. It appears in Settings > Keybindings, and only when the writer accepts it does it go into their `keybindings.json`. Reserved keys (cut, copy, paste, undo, redo, print) show as unavailable.

## Help for your plugin

If your plugin has anything a writer would not find from the menus, the palette, or its own Settings page (panels, project types, row actions, model tools, tools with options, syntax, sounds), give it a Help chapter. Add a `HELP.md` to the plugin folder and declare it:

```json
"contributes": { "help": { "file": "HELP.md" } }
```

Write it in plain markdown, text only. Say what the plugin is for, how to reach each feature, and what it does not do; for a project type, say what assigning it adds and what it expects on disk. One paragraph is one line. To let the writer try a feature from the chapter, link to the command: `[New note](command:my-plugin:new-note)` becomes a button that closes Help and runs the command. Only commands your manifest declares (or the app's own) should be linked; the example plugin [`daily-notes-type`](../../../examples/plugins/daily-notes-type) shows the pattern.

`HELP.md` ships in your package like any other file. The publish script warns, without refusing, when a package that contributes commands, surfaces, project types, row actions, model tools, tools, or syntax has no help.

## Seeing what is installed (API 0.60.0)

`api.plugins.list()` returns a read-only summary of every plugin and theme (`id`, `name`, `version`, `description`, `kind` of `plugin` or `theme`, `tier` of `core`, `built-in`, or `installed`, `enabled`, and `contributions`, a count per kind). `api.plugins.manifest(id)` returns one validated manifest, and rejects `plugin/unknown-plugin` for an ID nothing has. Neither returns code or files, so every plugin may call them without a permission question. Use them to check an ID is free or to copy a real pattern.

## Naming and limits

IDs are lowercase with hyphens. Event names are `domain:past-verb`. Keep titles short. A manifest that fails validation stops an install with a sentence naming the problem, so fix it there rather than at runtime.

## AI features: the writer's switch

Writers can turn AI features off (Settings > Writing > AI features, or View > AI Features), and a writer who answers "no" at first launch keeps them off. While they are off, the kernel hides every contribution that uses AI. Hidden means gone, not greyed out, from the palette, menus, Settings, the selection box, panels, the top bar, and the keybindings page, and nothing about it says AI is off except the switch itself.

Say which of your contributions use a model, in the manifest, so the kernel can filter them one by one and the rest of your plugin keeps working:

- `"usesAI": true` on a command, setting, surface, top-bar button, or palette provider. A tool that sets `needsProvider` is already marked; a key suggestion follows its command.
- `"ai"` on the plugin: `"none"` (nothing uses AI), `"optional"` (some contributions do; they are hidden while AI is off), or `"required"` (the plugin is useless without AI; it does not load while AI is off and none of it shows). When you leave `ai` out it is derived: `optional` if anything uses AI or a tool needs a provider, otherwise `none`. `"ai": "none"` beside an AI contribution is rejected.

A hidden command rejects with `ai/off` if code runs it anyway, and `api.providers` rejects with `ai/off` too. Use `api.ai.enabled()` and `api.ai.onChanged(fn)` to leave AI rows out of data you hand the kernel, such as a surface's items.

**Declare AI you reach yourself.** The kernel cannot see a model call made through `api.net.fetch` to a model host. If your plugin does that, mark the contributions that cause it with `usesAI` (or set `"ai": "required"`). The marketplace review checks this.

**Build AI as an optional layer.** A plugin whose non-AI half is useful on its own works for writers who chose no AI, and costs the rest of your users nothing.

**What the switch promises.** That no AI feature is reachable while it is off, not that no AI code is in the app.

**How the marketplace will use `ai`** (not built yet). The plugin list shows an "AI" badge on `optional` and `required` plugins. For a writer with AI off, `required` plugins are not listed and `optional` ones install with their AI parts hidden. Review checks that a plugin which reaches a model host through `api.net.fetch` declares it. The Plugins page in Settings already shows the badge, and "Needs AI features, which are off." for a `required` plugin that is waiting.
