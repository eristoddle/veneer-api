# Interface: TextChange

Defined in: [index.ts:3026](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L3026)

One replacement in the editor text: the span `from`..`to` (offsets into the current text,
`\n` line endings) becomes `text`. An insert has `from === to`; a delete has `text === ''`.

## Properties

### from

> **from**: `number`

Defined in: [index.ts:3027](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L3027)

***

### to

> **to**: `number`

Defined in: [index.ts:3028](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L3028)

***

### text

> **text**: `string`

Defined in: [index.ts:3029](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L3029)
