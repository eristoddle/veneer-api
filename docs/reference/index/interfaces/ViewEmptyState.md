# Interface: ViewEmptyState

Defined in: [index.ts:1075](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1075)

What a list or tree view shows besides rows (UX-DR10): `text` when it has no rows (say
"No documents yet."), and `action` as a button under the rows, shown whether or not there are
rows. Pressing it calls the surface's `onAction` handlers with its ID.

## Properties

### text

> **text**: `string`

Defined in: [index.ts:1076](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1076)

***

### action?

> `optional` **action?**: [`SurfaceAction`](SurfaceAction.md)

Defined in: [index.ts:1077](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1077)
