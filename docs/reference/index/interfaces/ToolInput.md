# Interface: ToolInput

Defined in: [index.ts:1852](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1852)

What a tool handler receives; the fields it declared in `context` are present.

## Properties

### selection

> **selection**: \{ `text`: `string`; `from`: `number`; `to`: `number`; \} \| `null`

Defined in: [index.ts:1854](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1854)

The selected text and its range, or null with nothing selected.

***

### paragraph?

> `optional` **paragraph?**: `string`

Defined in: [index.ts:1855](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1855)

***

### section?

> `optional` **section?**: `string`

Defined in: [index.ts:1856](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1856)

***

### title?

> `optional` **title?**: `string`

Defined in: [index.ts:1857](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1857)

***

### frontmatter?

> `optional` **frontmatter?**: `string`

Defined in: [index.ts:1858](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1858)

***

### document?

> `optional` **document?**: `string`

Defined in: [index.ts:1859](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1859)
