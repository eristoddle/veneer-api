# Interface: FakeSavedImage

Defined in: [testing.ts:207](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L207)

One `api.vault.saveImage` call, as the fake host recorded it.

## Properties

### bytes

> **bytes**: `Uint8Array`

Defined in: [testing.ts:208](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L208)

***

### name

> **name**: `string` \| `undefined`

Defined in: [testing.ts:210](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L210)

The dropped file's name; undefined for a paste.

***

### link

> **link**: `string` \| `null`

Defined in: [testing.ts:212](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L212)

The link the fake returned, or null when the call was made to fail.
