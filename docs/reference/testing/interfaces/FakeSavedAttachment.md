# Interface: FakeSavedAttachment

Defined in: [testing.ts:199](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L199)

One `api.vault.saveAttachment` call, as the fake host recorded it.

## Properties

### bytes

> **bytes**: `Uint8Array`

Defined in: [testing.ts:200](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L200)

***

### name

> **name**: `string`

Defined in: [testing.ts:201](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L201)

***

### link

> **link**: `string` \| `null`

Defined in: [testing.ts:203](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L203)

The link the fake returned, or null when the call was made to fail.
