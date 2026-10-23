# Interface: SavedImage

Defined in: [index.ts:2279](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2279)

What `api.vault.saveImage` resolves to: the pieces of `![alt](link)`.

## Properties

### link

> **link**: `string`

Defined in: [index.ts:2281](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2281)

Relative to the document, `/` separators, percent-encoded: ready for `(...)`.

***

### alt

> **alt**: `string`

Defined in: [index.ts:2283](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2283)

The file's stem, escaped for `[...]`.
