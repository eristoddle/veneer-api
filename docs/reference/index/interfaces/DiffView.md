# Interface: DiffView

Defined in: [index.ts:1220](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1220)

A diff (Story 9.16): the segments of `wordDiff`, drawn in the page's type. Insertions sit on
the `change` kind tint and are underlined; deletions sit on the `flag` tint and are struck
through (a plugin never passes a color). A change with an `id` shows Accept and Reject; they
reach `api.surfaces.onDiffAction` with that ID. The kernel applies nothing itself: the plugin
sets the next view. The text scrolls and selects like any other. Works in a panel, the modal,
and a split's detail.

## Properties

### kind

> **kind**: `"diff"`

Defined in: [index.ts:1221](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1221)

***

### segments

> **segments**: [`DiffSegment`](DiffSegment.md)[]

Defined in: [index.ts:1222](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1222)

***

### note?

> `optional` **note?**: `string`

Defined in: [index.ts:1224](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1224)

A line above the diff in the caption type.
