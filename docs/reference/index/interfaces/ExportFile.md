# Interface: ExportFile

Defined in: [index.ts:3056](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L3056)

A file for the writer to save with `api.export.saveAs` (Story 9.8).

## Properties

### suggestedName

> **suggestedName**: `string`

Defined in: [index.ts:3058](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L3058)

The name offered in the dialog, e.g. `My Book.epub`.

***

### data

> **data**: `Uint8Array`

Defined in: [index.ts:3060](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L3060)

The file's bytes, up to `MAX_NET_BYTES`.

***

### filters?

> `optional` **filters?**: `object`[]

Defined in: [index.ts:3062](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L3062)

File types the dialog offers, e.g. `[{ name: 'EPUB', extensions: ['epub'] }]`.

#### name

> **name**: `string`

#### extensions

> **extensions**: `string`[]
