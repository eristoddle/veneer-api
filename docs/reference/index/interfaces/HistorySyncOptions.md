# Interface: HistorySyncOptions

Defined in: [index.ts:4975](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4975)

What `api.history.sync` syncs (Story 9.18).

## Properties

### remote?

> `optional` **remote?**: `string`

Defined in: [index.ts:4977](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4977)

The remote's name; default `origin`.

***

### branch?

> `optional` **branch?**: `string`

Defined in: [index.ts:4979](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4979)

The branch; default (and only) the current one.

***

### token?

> `optional` **token?**: `string`

Defined in: [index.ts:4981](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4981)

A token for the host, read from `api.secrets`; sent as the HTTP Basic password.

***

### username?

> `optional` **username?**: `string`

Defined in: [index.ts:4983](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4983)

The HTTP Basic user name with the token; default `x-access-token` (GitHub accepts it).
