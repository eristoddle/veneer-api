# Type Alias: SelectionOrigin

> **SelectionOrigin** = `"pointer"` \| `"keyboard"` \| `"select-all"` \| `"find"` \| `"plugin"`

Defined in: [index.ts:1932](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1932)

Where a selection change came from. `pointer`: mouse or trackpad; `keyboard`: arrows, typing,
and other keys; `select-all`: Select All; `find`: a find match; `plugin`: a programmatic
change with no user event behind it.
