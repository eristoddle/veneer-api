# Interface: ViewEmptyState

Defined in: [index.ts:1220](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1220)

What a list or tree view shows besides rows (UX-DR10): `text` when it has no rows (say
"No documents yet."), and `action` as a button under the rows, shown whether or not there are
rows. Pressing it calls the surface's `onAction` handlers with its ID.

## Properties

### text

> **text**: `string`

Defined in: [index.ts:1221](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1221)

***

### action?

> `optional` **action?**: [`SurfaceAction`](SurfaceAction.md)

Defined in: [index.ts:1222](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1222)
