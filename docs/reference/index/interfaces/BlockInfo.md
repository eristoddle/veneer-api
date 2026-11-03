# Interface: BlockInfo

Defined in: [index.ts:885](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L885)

The fenced block a renderer is asked to draw. The text is never changed by a renderer.

## Properties

### language

> **language**: `string`

Defined in: [index.ts:887](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L887)

The info string's first word, lowercased; empty for a bare fence.

***

### text

> **text**: `string`

Defined in: [index.ts:889](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L889)

The code between the fences, `\n` line endings, no trailing newline.

***

### theme

> **theme**: `"light"` \| `"dark"`

Defined in: [index.ts:891](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L891)

Which Veneer theme is showing, so a diagram can pick its colors.
