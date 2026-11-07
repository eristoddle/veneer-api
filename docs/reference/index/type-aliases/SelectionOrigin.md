# Type Alias: SelectionOrigin

> **SelectionOrigin** = `"pointer"` \| `"keyboard"` \| `"select-all"` \| `"find"` \| `"plugin"`

Defined in: [index.ts:3013](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L3013)

Where a selection change came from. `pointer`: mouse or trackpad; `keyboard`: arrows, typing,
and other keys; `select-all`: Select All; `find`: a find match; `plugin`: a programmatic
change with no user event behind it.
