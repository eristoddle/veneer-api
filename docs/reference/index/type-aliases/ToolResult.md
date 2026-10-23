# Type Alias: ToolResult

> **ToolResult** = \{ `kind`: `"replace"`; `options`: `string`[]; \} \| \{ `kind`: `"insert"`; `text`: `string`; \} \| \{ `kind`: `"info"`; `items`: [`ToolInfoItem`](../interfaces/ToolInfoItem.md)[]; \}

Defined in: [index.ts:1869](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1869)

A tool's answer (AD-10). Only the kernel applies it, and only when the writer picks.
