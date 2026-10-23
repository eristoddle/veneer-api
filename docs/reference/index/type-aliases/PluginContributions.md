# Type Alias: PluginContributions

> **PluginContributions** = `object` & `Record`\<`string`, `unknown`\>

Defined in: [index.ts:1753](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1753)

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

### editorHost?

> `optional` **editorHost?**: `boolean`

The plugin may register the editor host (`api.editor.registerHost`, AD-18).
