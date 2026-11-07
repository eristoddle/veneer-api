# Interface: FrontmatterSplit

Defined in: [index.ts:361](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L361)

A document cut where the editor hides its frontmatter (Story 9.19).

## Properties

### frontmatter

> **frontmatter**: `string`

Defined in: [index.ts:363](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L363)

The whole leading block, `---` through the closing `---` or `...` line and its newline; `''` when there is none.

***

### yaml

> **yaml**: `string`

Defined in: [index.ts:365](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L365)

The lines between the fences (the YAML itself), without the fences.

***

### body

> **body**: `string`

Defined in: [index.ts:367](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L367)

Everything after the block. `frontmatter + body` is always the original text.
