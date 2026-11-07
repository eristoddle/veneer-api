# Interface: ExportFile

Defined in: [index.ts:4744](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4744)

A file for the writer to save with `api.export.saveAs` (Story 9.8).

## Properties

### suggestedName

> **suggestedName**: `string`

Defined in: [index.ts:4746](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4746)

The name offered in the dialog, e.g. `My Book.epub`.

***

### data

> **data**: `Uint8Array`

Defined in: [index.ts:4748](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4748)

The file's bytes, up to `MAX_NET_BYTES`.

***

### filters?

> `optional` **filters?**: `object`[]

Defined in: [index.ts:4750](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4750)

File types the dialog offers, e.g. `[{ name: 'EPUB', extensions: ['epub'] }]`.

#### name

> **name**: `string`

#### extensions

> **extensions**: `string`[]
