# Interface: Mark

Defined in: [index.ts:2308](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2308)

A range of the open document a plugin marks (Story 9.17). `from` and `to` are character
offsets into the text `api.editor.getText` returns (`\n` endings); `id` is unique within the set.
`id` and `label` are at most 1000 characters each.

## Properties

### id

> **id**: `string`

Defined in: [index.ts:2309](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2309)

***

### from

> **from**: `number`

Defined in: [index.ts:2310](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2310)

***

### to

> **to**: `number`

Defined in: [index.ts:2311](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2311)

***

### kind

> **kind**: [`MarkKind`](../type-aliases/MarkKind.md)

Defined in: [index.ts:2312](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2312)

***

### label?

> `optional` **label?**: `string`

Defined in: [index.ts:2314](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2314)

Shown as a tooltip on the marked text.
