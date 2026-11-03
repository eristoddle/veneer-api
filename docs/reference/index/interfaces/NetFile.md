# Interface: NetFile

Defined in: [index.ts:3143](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3143)

A file in a multipart upload (Story 9.8).

## Properties

### name

> **name**: `string`

Defined in: [index.ts:3145](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3145)

The file name the service sees.

***

### type?

> `optional` **type?**: `string`

Defined in: [index.ts:3147](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3147)

Its media type; `application/octet-stream` when left out.

***

### data

> **data**: `Uint8Array`

Defined in: [index.ts:3148](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3148)
