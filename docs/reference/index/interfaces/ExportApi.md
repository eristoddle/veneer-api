# Interface: ExportApi

Defined in: [index.ts:3383](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3383)

Saving a file the plugin produced, such as an exported EPUB (Story 9.8, AD-6). The writer
chooses where in a save dialog, and main writes the bytes: a plugin never names a path.

## Methods

### saveAs()

> **saveAs**(`file`): `Promise`\<\{ `saved`: `boolean`; `name?`: `string`; \}\>

Defined in: [index.ts:3399](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3399)

Opens the save dialog and writes the file where the writer chooses. Resolves `{ saved: false }`
when the writer cancels. Rejects `export/too-large` or `export/write-failed`.

#### Parameters

##### file

[`ExportFile`](ExportFile.md)

#### Returns

`Promise`\<\{ `saved`: `boolean`; `name?`: `string`; \}\>

#### Example

```ts
const epubBytes = new Uint8Array([0x50, 0x4b])
const result = await api.export.saveAs({
  suggestedName: 'My Book.epub',
  data: epubBytes,
  filters: [{ name: 'EPUB', extensions: ['epub'] }]
})
if (result.saved) console.log(`Saved ${result.name}`)
```
