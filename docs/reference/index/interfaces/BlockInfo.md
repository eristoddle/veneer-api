# Interface: BlockInfo

Defined in: [index.ts:1369](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1369)

The fenced block a renderer is asked to draw. The text is never changed by a renderer.

## Properties

### language

> **language**: `string`

Defined in: [index.ts:1371](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1371)

The info string's first word, lowercased; empty for a bare fence.

***

### text

> **text**: `string`

Defined in: [index.ts:1373](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1373)

The code between the fences, `\n` line endings, no trailing newline.

***

### theme

> **theme**: `"light"` \| `"dark"`

Defined in: [index.ts:1375](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1375)

Which Veneer theme is showing, so a diagram can pick its colors.
