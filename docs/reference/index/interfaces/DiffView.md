# Interface: DiffView

Defined in: [index.ts:2014](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2014)

A diff (Story 9.16): the segments of `wordDiff`, drawn in the page's type. Insertions sit on
the `change` kind tint and are underlined; deletions sit on the `flag` tint and are struck
through (a plugin never passes a color). A change with an `id` shows Accept and Reject; they
reach `api.surfaces.onDiffAction` with that ID. The kernel applies nothing itself: the plugin
sets the next view. The text scrolls and selects like any other. Works in a panel, the modal,
and a split's detail.

## Properties

### kind

> **kind**: `"diff"`

Defined in: [index.ts:2015](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2015)

***

### segments

> **segments**: [`DiffSegment`](DiffSegment.md)[]

Defined in: [index.ts:2016](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2016)

***

### note?

> `optional` **note?**: `string`

Defined in: [index.ts:2018](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2018)

A line above the diff in the caption type.
