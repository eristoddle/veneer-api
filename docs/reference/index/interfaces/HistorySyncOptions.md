# Interface: HistorySyncOptions

Defined in: [index.ts:3144](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L3144)

What `api.history.sync` syncs (Story 9.18).

## Properties

### remote?

> `optional` **remote?**: `string`

Defined in: [index.ts:3146](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L3146)

The remote's name; default `origin`.

***

### branch?

> `optional` **branch?**: `string`

Defined in: [index.ts:3148](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L3148)

The branch; default (and only) the current one.

***

### token?

> `optional` **token?**: `string`

Defined in: [index.ts:3150](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L3150)

A token for the host, read from `api.secrets`; sent as the HTTP Basic password.

***

### username?

> `optional` **username?**: `string`

Defined in: [index.ts:3152](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L3152)

The HTTP Basic user name with the token; default `x-access-token` (GitHub accepts it).
