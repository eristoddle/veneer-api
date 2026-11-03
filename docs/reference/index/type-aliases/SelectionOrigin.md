# Type Alias: SelectionOrigin

> **SelectionOrigin** = `"pointer"` \| `"keyboard"` \| `"select-all"` \| `"find"` \| `"plugin"`

Defined in: [index.ts:2109](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2109)

Where a selection change came from. `pointer`: mouse or trackpad; `keyboard`: arrows, typing,
and other keys; `select-all`: Select All; `find`: a find match; `plugin`: a programmatic
change with no user event behind it.
