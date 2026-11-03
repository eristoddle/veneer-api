# Interface: ExportFile

Defined in: [index.ts:3370](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3370)

A file for the writer to save with `api.export.saveAs` (Story 9.8).

## Properties

### suggestedName

> **suggestedName**: `string`

Defined in: [index.ts:3372](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3372)

The name offered in the dialog, e.g. `My Book.epub`.

***

### data

> **data**: `Uint8Array`

Defined in: [index.ts:3374](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3374)

The file's bytes, up to `MAX_NET_BYTES`.

***

### filters?

> `optional` **filters?**: `object`[]

Defined in: [index.ts:3376](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3376)

File types the dialog offers, e.g. `[{ name: 'EPUB', extensions: ['epub'] }]`.

#### name

> **name**: `string`

#### extensions

> **extensions**: `string`[]
