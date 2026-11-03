# Interface: TextChange

Defined in: [index.ts:2122](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2122)

One replacement in the editor text: the span `from`..`to` (offsets into the current text,
`\n` line endings) becomes `text`. An insert has `from === to`; a delete has `text === ''`.

## Properties

### from

> **from**: `number`

Defined in: [index.ts:2123](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2123)

***

### to

> **to**: `number`

Defined in: [index.ts:2124](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2124)

***

### text

> **text**: `string`

Defined in: [index.ts:2125](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2125)
