# Interface: BlockInfo

Defined in: [index.ts:775](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L775)

The fenced block a renderer is asked to draw. The text is never changed by a renderer.

## Properties

### language

> **language**: `string`

Defined in: [index.ts:777](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L777)

The info string's first word, lowercased; empty for a bare fence.

***

### text

> **text**: `string`

Defined in: [index.ts:779](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L779)

The code between the fences, `\n` line endings, no trailing newline.

***

### theme

> **theme**: `"light"` \| `"dark"`

Defined in: [index.ts:781](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L781)

Which Veneer theme is showing, so a diagram can pick its colors.
