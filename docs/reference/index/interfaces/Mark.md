# Interface: Mark

Defined in: [index.ts:3226](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L3226)

A range of the open document a plugin marks (Story 9.17). `from` and `to` are character
offsets into the text `api.editor.getText` returns (`\n` endings); `id` is unique within the set.
`id` and `label` are at most 1000 characters each.

## Properties

### id

> **id**: `string`

Defined in: [index.ts:3227](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L3227)

***

### from

> **from**: `number`

Defined in: [index.ts:3228](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L3228)

***

### to

> **to**: `number`

Defined in: [index.ts:3229](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L3229)

***

### kind

> **kind**: [`MarkKind`](../type-aliases/MarkKind.md)

Defined in: [index.ts:3230](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L3230)

***

### label?

> `optional` **label?**: `string`

Defined in: [index.ts:3232](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L3232)

Shown as a tooltip on the marked text.
