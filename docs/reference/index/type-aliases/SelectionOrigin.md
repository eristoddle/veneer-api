# Type Alias: SelectionOrigin

> **SelectionOrigin** = `"pointer"` \| `"keyboard"` \| `"select-all"` \| `"find"` \| `"plugin"`

Defined in: [index.ts:1932](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1932)

Where a selection change came from. `pointer`: mouse or trackpad; `keyboard`: arrows, typing,
and other keys; `select-all`: Select All; `find`: a find match; `plugin`: a programmatic
change with no user event behind it.
