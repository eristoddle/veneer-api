# Interface: HistoryLogOptions

Defined in: [index.ts:3492](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3492)

What `api.history.log` lists (Story 9.13).

## Properties

### path?

> `optional` **path?**: `string`

Defined in: [index.ts:3494](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3494)

Only commits that changed this file (an API path).

***

### branch?

> `optional` **branch?**: `string`

Defined in: [index.ts:3496](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3496)

Read this branch instead of the current one.

***

### limit?

> `optional` **limit?**: `number`

Defined in: [index.ts:3498](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3498)

At most this many, newest first; default 100, at most `MAX_HISTORY_LOG`.
