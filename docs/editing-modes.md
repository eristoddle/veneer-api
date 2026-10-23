# Editing modes

An editing mode is a way of drawing the same file text: live preview, plain source, and so on (FR-12, AD-7). A mode is a CodeMirror 6 extension set (decorations, widgets, view plugins, themes) over the unchanged document. It never gets its own document model and never rewrites the text. The core editor's own Live Preview is a mode contributed like any other.

## Declare it in the manifest

```json
{
  "id": "source-mode",
  "contributes": {
    "editingModes": [{ "id": "source-mode:source", "title": "Source" }]
  }
}
```

Each `id` is `<pluginId>:<name>` and appears once. `title` is what the View menu shows. The manifest is authoritative (AD-5): code can only attach an extension set to an ID declared here.

## Attach the extension set

```ts
import { EditorView } from '@codemirror/view'
import type { PluginApi } from '@veneer/api'

export function onload(api: PluginApi): void {
  api.editor.registerMode(
    'source-mode:source',
    EditorView.theme({ '.cm-content': { fontFamily: 'ui-monospace, monospace' } })
  )
}
```

```ts
registerMode(id: string, extension: EditingModeExtension): Disposable
type EditingModeExtension = unknown // a CodeMirror 6 `Extension`
```

A mode must only draw: decorations, widgets, view plugins, themes (AD-7). It must not change the text or override the base editor (read-only, spellcheck attributes, keymaps, theme), even though raw CM6 makes that possible; this escape hatch is unstable and unenforced.

`EditingModeExtension` is typed `unknown` so `@veneer/api` takes no CodeMirror dependency; pass a CM6 `Extension`. Plugins may import `@codemirror/*` for this. An ID the manifest doesn't declare throws `plugin/undeclared-contribution`; registering one ID twice throws `plugin/duplicate-handler`.

## How the kernel uses it

- A plugin that only contributes modes needs no activation event. When the writer picks its mode, the kernel activates the plugin, then applies the mode.
- The kernel applies a mode through `EditorHost.setMode`, which reconfigures one compartment over the same editor state. Switching changes no text, keeps the undo history, fires no `onChanged`, and so autosave writes nothing. A newly opened document keeps the mode that is showing.
- The base editor (markdown language, history, keymaps, spellcheck exclusions, theme, image paste, read-only) stays outside the mode, so every mode gets it.
- The default mode is the first one declared by the plugin that declares `editorHost`: `editor:live-preview`. Every launch starts in it; the choice is not stored.
- The View menu lists the modes as radio items only when two or more are available.
- If your plugin fails or is disabled, its modes are withdrawn; if one was showing, the editor falls back to the default. If applying your extension set throws synchronously (an invalid extension value, a throwing `StateField.create`), the previous mode is restored and your plugin takes the standard failure path (one notice naming it). Errors CM6 catches itself, in a view plugin's constructor or update or a decoration provider, are only logged: the mode stays applied and no notice is raised.
