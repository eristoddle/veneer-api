# Type Alias: EditingModeExtension

> **EditingModeExtension** = `unknown`

Defined in: [index.ts:758](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L758)

A mode's CodeMirror 6 extension set: a CM6 `Extension` handed to the editor as-is (the
raw-CM6 escape hatch, unstable and unenforced). Typed `unknown` so `@veneer/api` takes no
CodeMirror dependency. A mode must only draw: decorations, widgets, view plugins, themes
(AD-7). It must not change the text or override the base editor (read-only, spellcheck
attributes, keymaps, theme), even though raw CM6 makes that possible.
