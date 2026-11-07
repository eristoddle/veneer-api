# Type Alias: EditingModeExtension

> **EditingModeExtension** = `unknown`

Defined in: [index.ts:1352](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1352)

A mode's CodeMirror 6 extension set: a CM6 `Extension` handed to the editor as-is (the
raw-CM6 escape hatch, unstable and unenforced). Typed `unknown` so `@veneer/api` takes no
CodeMirror dependency. A mode must only draw: decorations, widgets, view plugins, themes
(AD-7). It must not change the text or override the base editor (read-only, spellcheck
attributes, keymaps, theme), even though raw CM6 makes that possible.
