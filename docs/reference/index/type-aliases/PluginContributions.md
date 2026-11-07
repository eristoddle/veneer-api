# Type Alias: PluginContributions

> **PluginContributions** = `object` & `Record`\<`string`, `unknown`\>

Defined in: [index.ts:2742](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2742)

## Type Declaration

### commands?

> `optional` **commands?**: [`CommandContribution`](../interfaces/CommandContribution.md)[]

### tools?

> `optional` **tools?**: [`ToolContribution`](../interfaces/ToolContribution.md)[]

Selection-box tools (FR-23, AD-10).

### settings?

> `optional` **settings?**: [`SettingContribution`](../interfaces/SettingContribution.md)[]

Settings the kernel draws in its settings surface (FR-44, AD-4).

### surfaces?

> `optional` **surfaces?**: [`SurfaceContribution`](../interfaces/SurfaceContribution.md)[]

Side-panel surfaces the kernel draws (FR-7, AD-4).

### topBarButtons?

> `optional` **topBarButtons?**: [`TopBarButtonContribution`](../interfaces/TopBarButtonContribution.md)[]

Top-bar buttons offered to the writer, hidden until turned on (FR-53).

### rowActions?

> `optional` **rowActions?**: [`ContributedRowAction`](../interfaces/ContributedRowAction.md)[]

Right-click items added to another plugin's surface, e.g. the Files panel (Story 17.1).

### colors?

> `optional` **colors?**: [`PluginColorContribution`](../interfaces/PluginColorContribution.md)[]

Color tokens the plugin adds, as `--vnp-<pluginId>-<id>`, each with a light and dark default (FR-57).

### themes?

> `optional` **themes?**: [`ThemeContribution`](../interfaces/ThemeContribution.md)[]

Color themes the plugin offers, a light and dark pair each (FR-45).

### projectTypes?

> `optional` **projectTypes?**: [`ProjectTypeContribution`](../interfaces/ProjectTypeContribution.md)[]

Kinds of project the plugin offers, one assigned per project (FR-36, AD-13).

### keybindings?

> `optional` **keybindings?**: [`KeybindingSuggestion`](../interfaces/KeybindingSuggestion.md)[]

Keys the plugin suggests; none is bound until the writer accepts it (FR-27, AD-5).

### paletteProviders?

> `optional` **paletteProviders?**: [`PaletteProviderContribution`](../interfaces/PaletteProviderContribution.md)[]

Palette providers listed in the palette's files mode (FR-9, UX-DR15).

### editingModes?

> `optional` **editingModes?**: [`EditingModeContribution`](../interfaces/EditingModeContribution.md)[]

Editing modes (FR-12, AD-7). The first mode declared by the plugin that declares
`editorHost` is the default every launch starts in.

### blockRenderers?

> `optional` **blockRenderers?**: [`BlockRendererContribution`](../interfaces/BlockRendererContribution.md)[]

Fenced-block renderers (Story 9.4, AD-19).

### syntax?

> `optional` **syntax?**: [`SyntaxContribution`](../interfaces/SyntaxContribution.md)[]

Markup the editor draws for the plugin: patterns, their look, and rendered views (Story 22.4).

### modelTools?

> `optional` **modelTools?**: [`ModelToolContribution`](../interfaces/ModelToolContribution.md)[]

Tools the model may call on a typed ask, after the writer's say-so (Story 27.2).

### sounds?

> `optional` **sounds?**: [`SoundContribution`](../interfaces/SoundContribution.md)[]

Short sound files bundled in the plugin's folder, for `api.sound` (Story 28.2).

### fonts?

> `optional` **fonts?**: [`PluginFontContribution`](../interfaces/PluginFontContribution.md)[]

Font files bundled in the plugin's folder, for `api.workspace.setPageLook` (Story 28.3).

### editorHost?

> `optional` **editorHost?**: `boolean`

The plugin may register the editor host (`api.editor.registerHost`, AD-18).

### imageDestination?

> `optional` **imageDestination?**: `boolean`

The plugin chooses where pasted images are saved (`api.vault.onImageDestination`, Story 17.2).

### help?

> `optional` **help?**: [`HelpContribution`](../interfaces/HelpContribution.md)

One Help chapter, a markdown file in the plugin's folder (Story 31.1).
