# Interface: HistoryLogOptions

Defined in: [index.ts:3104](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L3104)

What `api.history.log` lists (Story 9.13).

## Properties

### path?

> `optional` **path?**: `string`

Defined in: [index.ts:3106](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L3106)

Only commits that changed this file (an API path).

***

### branch?

> `optional` **branch?**: `string`

Defined in: [index.ts:3108](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L3108)

Read this branch instead of the current one.

***

### limit?

> `optional` **limit?**: `number`

Defined in: [index.ts:3110](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L3110)

At most this many, newest first; default 100, at most `MAX_HISTORY_LOG`.
