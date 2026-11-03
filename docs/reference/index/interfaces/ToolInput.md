# Interface: ToolInput

Defined in: [index.ts:2020](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2020)

What a tool handler receives; the fields it declared in `context` are present.

## Properties

### selection

> **selection**: \{ `text`: `string`; `from`: `number`; `to`: `number`; \} \| `null`

Defined in: [index.ts:2022](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2022)

The selected text and its range, or null with nothing selected.

***

### paragraph?

> `optional` **paragraph?**: `string`

Defined in: [index.ts:2023](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2023)

***

### section?

> `optional` **section?**: `string`

Defined in: [index.ts:2024](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2024)

***

### title?

> `optional` **title?**: `string`

Defined in: [index.ts:2025](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2025)

***

### frontmatter?

> `optional` **frontmatter?**: `string`

Defined in: [index.ts:2026](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2026)

***

### document?

> `optional` **document?**: `string`

Defined in: [index.ts:2027](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2027)
