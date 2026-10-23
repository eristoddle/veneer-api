# Interface: Mark

Defined in: [index.ts:2130](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2130)

A range of the open document a plugin marks (Story 9.17). `from` and `to` are character
offsets into the text `api.editor.getText` returns (`\n` endings); `id` is unique within the set.

## Properties

### id

> **id**: `string`

Defined in: [index.ts:2131](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2131)

***

### from

> **from**: `number`

Defined in: [index.ts:2132](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2132)

***

### to

> **to**: `number`

Defined in: [index.ts:2133](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2133)

***

### kind

> **kind**: [`MarkKind`](../type-aliases/MarkKind.md)

Defined in: [index.ts:2134](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2134)

***

### label?

> `optional` **label?**: `string`

Defined in: [index.ts:2136](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2136)

Shown as a tooltip on the marked text.
