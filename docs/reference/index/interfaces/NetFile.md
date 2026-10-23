# Interface: NetFile

Defined in: [index.ts:2829](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2829)

A file in a multipart upload (Story 9.8).

## Properties

### name

> **name**: `string`

Defined in: [index.ts:2831](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2831)

The file name the service sees.

***

### type?

> `optional` **type?**: `string`

Defined in: [index.ts:2833](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2833)

Its media type; `application/octet-stream` when left out.

***

### data

> **data**: `Uint8Array`

Defined in: [index.ts:2834](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2834)
