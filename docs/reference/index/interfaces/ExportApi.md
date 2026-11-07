# Interface: ExportApi

Defined in: [index.ts:4757](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4757)

Saving a file the plugin produced, such as an exported EPUB (Story 9.8, AD-6). The writer
chooses where in a save dialog, and main writes the bytes: a plugin never names a path.

## Methods

### saveAs()

> **saveAs**(`file`): `Promise`\<\{ `saved`: `boolean`; `name?`: `string`; \}\>

Defined in: [index.ts:4773](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4773)

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
