# Type Alias: ToolResult

> **ToolResult** = \{ `kind`: `"replace"`; `options`: `string`[]; \} \| \{ `kind`: `"insert"`; `text`: `string`; \} \| \{ `kind`: `"info"`; `items`: [`ToolInfoItem`](../interfaces/ToolInfoItem.md)[]; \} \| \{ `kind`: `"open"`; `url`: `string`; \}

Defined in: [index.ts:2037](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2037)

A tool's answer (AD-10). Only the kernel applies it, and only when the writer picks.

## Union Members

### Type Literal

\{ `kind`: `"replace"`; `options`: `string`[]; \}

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
