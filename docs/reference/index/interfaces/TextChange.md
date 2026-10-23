# Interface: TextChange

Defined in: [index.ts:1945](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1945)

One replacement in the editor text: the span `from`..`to` (offsets into the current text,
`\n` line endings) becomes `text`. An insert has `from === to`; a delete has `text === ''`.

## Properties

### from

> **from**: `number`

Defined in: [index.ts:1946](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1946)

***

### to

> **to**: `number`

Defined in: [index.ts:1947](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1947)

***

### text

> **text**: `string`

Defined in: [index.ts:1948](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1948)
