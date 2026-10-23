# Interface: ExportApi

Defined in: [index.ts:3069](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L3069)

Saving a file the plugin produced, such as an exported EPUB (Story 9.8, AD-6). The writer
chooses where in a save dialog, and main writes the bytes: a plugin never names a path.

## Methods

### saveAs()

> **saveAs**(`file`): `Promise`\<\{ `saved`: `boolean`; `name?`: `string`; \}\>

Defined in: [index.ts:3085](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L3085)

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
