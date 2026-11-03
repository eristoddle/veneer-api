# Interface: SavedImage

Defined in: [index.ts:2502](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2502)

What `api.vault.saveImage` resolves to: the pieces of `![alt](link)`.

## Properties

### link

> **link**: `string`

Defined in: [index.ts:2504](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2504)

Relative to the document, `/` separators, percent-encoded: ready for `(...)`.

***

### alt

> **alt**: `string`

Defined in: [index.ts:2506](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2506)

The file's stem, escaped for `[...]`.
