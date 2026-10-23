# Manifests and contributions

`manifest.json` is the authority for everything you contribute (tools, commands, settings, surfaces, and so on). Code only attaches handlers to IDs the manifest declares; declaring something in code that the manifest doesn't list throws `plugin/undeclared-contribution`. Because Veneer reads the manifest alone, it can list your contributions without running your code.

```json
{
  "id": "word-goals",
  "name": "Word Goals",
  "version": "1.0.0",
  "apiVersion": "^0.40.0",
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
| `requiredProjectType` | A project type ID the open project must have; see [project types](project-types.md). |

## Contributions

Contribution IDs are `<pluginId>:<name>`: `word-goals:show`. Each ID is declared once.

- **`commands`**: `{ id, title }`. They appear in the palette and can take a key in Settings > Keybindings. Attach with `api.commands.handle(id, handler)`.
- **`tools`**: selection-box tools; see [tools and results](tools-and-results.md).
- **`settings`**: see [settings](settings.md).
- **`surfaces`**: `{ id, title, icon, side, rowActions? }`: a side panel the kernel draws from data you hand over; see [views](views.md). `icon` is a Lucide icon name; `side` is `"left"` or `"right"`.
- **`topBarButtons`**: `{ id, title, icon, surface | command }`: a button the writer may turn on. It targets exactly one surface or command that you declare, and stays hidden until turned on.
- **`paletteProviders`**: `{ id, title }`: a list of items you feed to the palette; see [views](views.md).
- **`editingModes`, `editorHost`**: for plugins that supply the editor or an editing mode. Advanced; see `api.editor`.
- **`projectTypes`**: see [project types](project-types.md).
- **`colors`**: your own color tokens, `--vnp-<pluginId>-<id>`, each with a light and dark default; see [colors and tokens](color-tokens.md).
- **`themes`**: a light and dark pair of color values; see [colors and tokens](color-tokens.md).
- **`keybindings`**: `[{ "command": "word-goals:show", "key": "CmdOrCtrl+Shift+G" }]`. A suggestion binds nothing. It appears in Settings > Keybindings, and only when the writer accepts it does it go into their `keybindings.json`. Reserved keys (cut, copy, paste, undo, redo, print) show as unavailable.

## Naming and limits

IDs are lowercase with hyphens. Event names are `domain:past-verb`. Keep titles short. A manifest that fails validation stops an install with a sentence naming the problem, so fix it there rather than at runtime.
