# Interface: HistoryLogOptions

Defined in: [index.ts:4935](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4935)

What `api.history.log` lists (Story 9.13).

## Properties

### path?

> `optional` **path?**: `string`

Defined in: [index.ts:4937](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4937)

Only commits that changed this file (an API path).

***

### branch?

> `optional` **branch?**: `string`

Defined in: [index.ts:4939](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4939)

Read this branch instead of the current one.

***

### limit?

> `optional` **limit?**: `number`

Defined in: [index.ts:4941](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4941)

At most this many, newest first; default 100, at most `MAX_HISTORY_LOG`.
