# Manifests and contributions

`manifest.json` is the authority for everything you contribute (tools, commands, settings, surfaces, and so on). Code only attaches handlers to IDs the manifest declares; declaring something in code that the manifest doesn't list throws `plugin/undeclared-contribution`. Because Veneer reads the manifest alone, it can list your contributions without running your code.

```json
{
  "id": "word-goals",
  "name": "Word Goals",
  "version": "1.0.0",
  "apiVersion": "^0.46.0",
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

## Contributions

Contribution IDs are `<pluginId>:<name>`: `word-goals:show`. Each ID is declared once.

- **`commands`**: `{ id, title }`. They appear in the palette and can take a key in Settings > Keybindings. Attach with `api.commands.handle(id, handler)`.
- **`tools`**: selection-box tools; see [tools and results](tools-and-results.md).
- **`settings`**: see [settings](settings.md).
- **`surfaces`**: `{ id, title, icon, side, rowActions? }`: a side panel the kernel draws from data you hand over; see [views](views.md). `icon` is a Lucide icon name; `side` is `"left"` or `"right"`.
- **`topBarButtons`**: `{ id, title, icon, surface | command }`: a button the writer may turn on. It targets exactly one surface or command that you declare, and stays hidden until turned on.
- **`rowActions`**: `{ surface, id, title, input, appliesTo, key?, prompt?, verb? }`: right-click items you add to a surface another plugin owns, such as the Files panel (`surface: "files:tree"`). `input` is `"confirm"` or `"none"` (runs at once). The items show after the owner's, and you handle them with `api.surfaces.onRowAction(surface, handler)`; the handler gets the row's ID (for the Files panel, the project-relative path). Turning your plugin off removes them.
- **`imageDestination`**: `true`: the plugin chooses where pasted and dropped images are saved, with `api.vault.onImageDestination`. It is asked with the document, the file name, and whether a site root is set; it returns `{ folder, base: 'project' | 'site' }` or `undefined` for the default. See `examples/plugins/image-year-folder`.
- **`paletteProviders`**: `{ id, title }`: a list of items you feed to the palette; see [views](views.md).
- **`editingModes`, `editorHost`**: for plugins that supply the editor or an editing mode. Advanced; see `api.editor`.
- **`projectTypes`**: see [project types](project-types.md).
- **`colors`**: your own color tokens, `--vnp-<pluginId>-<id>`, each with a light and dark default; see [colors and tokens](color-tokens.md).
- **`themes`**: a light and dark pair of color values; see [colors and tokens](color-tokens.md).
- **`keybindings`**: `[{ "command": "word-goals:show", "key": "CmdOrCtrl+Shift+G" }]`. A suggestion binds nothing. It appears in Settings > Keybindings, and only when the writer accepts it does it go into their `keybindings.json`. Reserved keys (cut, copy, paste, undo, redo, print) show as unavailable.

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
