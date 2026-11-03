# Interface: DiffView

Defined in: [index.ts:1370](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1370)

A diff (Story 9.16): the segments of `wordDiff`, drawn in the page's type. Insertions sit on
the `change` kind tint and are underlined; deletions sit on the `flag` tint and are struck
through (a plugin never passes a color). A change with an `id` shows Accept and Reject; they
reach `api.surfaces.onDiffAction` with that ID. The kernel applies nothing itself: the plugin
sets the next view. The text scrolls and selects like any other. Works in a panel, the modal,
and a split's detail.

## Properties

### kind

> **kind**: `"diff"`

Defined in: [index.ts:1371](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1371)

***

### segments

> **segments**: [`DiffSegment`](DiffSegment.md)[]

Defined in: [index.ts:1372](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1372)

***

### note?

> `optional` **note?**: `string`

Defined in: [index.ts:1374](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1374)

A line above the diff in the caption type.
