# Interface: FrontmatterSplit

Defined in: [index.ts:339](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L339)

A document cut where the editor hides its frontmatter (Story 9.19).

## Properties

### frontmatter

> **frontmatter**: `string`

Defined in: [index.ts:341](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L341)

The whole leading block, `---` through the closing `---` or `...` line and its newline; `''` when there is none.

***

### yaml

> **yaml**: `string`

Defined in: [index.ts:343](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L343)

The lines between the fences (the YAML itself), without the fences.

***

### body

> **body**: `string`

Defined in: [index.ts:345](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L345)

Everything after the block. `frontmatter + body` is always the original text.
