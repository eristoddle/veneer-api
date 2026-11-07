# Interface: ToolInput

Defined in: [index.ts:2885](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2885)

What a tool handler receives; the fields it declared in `context` are present.

## Properties

### selection

> **selection**: \{ `text`: `string`; `from`: `number`; `to`: `number`; \} \| `null`

Defined in: [index.ts:2887](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2887)

The selected text and its range, or null with nothing selected.

***

### more?

> `optional` **more?**: `boolean`

Defined in: [index.ts:2892](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2892)

True when the writer picked the `more` row of this tool's earlier `replace` Result: answer
with only the extra options (as one or more `groups`), not the first ones again.

***

### paragraph?

> `optional` **paragraph?**: `string`

Defined in: [index.ts:2893](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2893)

***

### section?

> `optional` **section?**: `string`

Defined in: [index.ts:2894](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2894)

***

### title?

> `optional` **title?**: `string`

Defined in: [index.ts:2895](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2895)

***

### frontmatter?

> `optional` **frontmatter?**: `string`

Defined in: [index.ts:2896](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2896)

***

### document?

> `optional` **document?**: `string`

Defined in: [index.ts:2897](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2897)
