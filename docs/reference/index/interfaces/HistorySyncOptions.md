# Interface: HistorySyncOptions

Defined in: [index.ts:3532](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3532)

What `api.history.sync` syncs (Story 9.18).

## Properties

### remote?

> `optional` **remote?**: `string`

Defined in: [index.ts:3534](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3534)

The remote's name; default `origin`.

***

### branch?

> `optional` **branch?**: `string`

Defined in: [index.ts:3536](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3536)

The branch; default (and only) the current one.

***

### token?

> `optional` **token?**: `string`

Defined in: [index.ts:3538](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3538)

A token for the host, read from `api.secrets`; sent as the HTTP Basic password.

***

### username?

> `optional` **username?**: `string`

Defined in: [index.ts:3540](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3540)

The HTTP Basic user name with the token; default `x-access-token` (GitHub accepts it).
