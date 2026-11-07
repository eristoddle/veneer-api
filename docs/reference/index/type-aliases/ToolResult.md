# Type Alias: ToolResult

> **ToolResult** = \{ `kind`: `"replace"`; `options`: `string`[]; `groups?`: [`ResultGroup`](../interfaces/ResultGroup.md)[]; `more?`: [`ResultMore`](../interfaces/ResultMore.md); \} \| \{ `kind`: `"insert"`; `text`: `string`; \} \| \{ `kind`: `"info"`; `items`: [`ToolInfoItem`](../interfaces/ToolInfoItem.md)[]; \} \| \{ `kind`: `"open"`; `url`: `string`; \}

Defined in: [index.ts:2921](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2921)

A tool's answer (AD-10). Only the kernel applies it, and only when the writer picks.

## Union Members

### Type Literal

\{ `kind`: `"replace"`; `options`: `string`[]; `groups?`: [`ResultGroup`](../interfaces/ResultGroup.md)[]; `more?`: [`ResultMore`](../interfaces/ResultMore.md); \}

Options to pick from; picking one replaces the selection as one undo step. `groups` splits
the same options under labels: when given, `options` must be every group's options in order
(that flat list is what the kernel numbers and applies). `more` adds a last row, drawn only
while AI features are on, that calls the handler again with `ToolInput.more` set and adds the
groups it returns to the card. For example:
`{ kind: 'replace', options: ['glad', 'sunny'], groups: [{ label: 'happy: pleased', options: ['glad'] }, { label: 'happy: bright', options: ['sunny'] }], more: { label: 'More from AI' } }`.

***

### Type Literal

\{ `kind`: `"insert"`; `text`: `string`; \}

***

### Type Literal

\{ `kind`: `"info"`; `items`: [`ToolInfoItem`](../interfaces/ToolInfoItem.md)[]; \}

***

### Type Literal

\{ `kind`: `"open"`; `url`: `string`; \}

Opens a web page in the writer's browser and closes the selection box (Story 13.2). Only
`http:` and `https:` URLs open; any other is shown as a tool error. The document and undo
history are untouched. It is a Result, not a call, so a plugin can open a page only as the
answer to something the writer picked. For example:
`{ kind: 'open', url: 'https://example.com/search?q=word' }`.
