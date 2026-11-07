# Interface: ViewEmptyState

Defined in: [index.ts:1859](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1859)

What a list or tree view shows besides rows (UX-DR10): `text` when it has no rows (say
"No documents yet."), and `action` as a button under the rows, shown whether or not there are
rows. Pressing it calls the surface's `onAction` handlers with its ID.

## Properties

### text

> **text**: `string`

Defined in: [index.ts:1860](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1860)

***

### action?

> `optional` **action?**: [`SurfaceAction`](SurfaceAction.md)

Defined in: [index.ts:1861](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1861)
