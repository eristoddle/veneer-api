# Type Alias: ToolResult

> **ToolResult** = \{ `kind`: `"replace"`; `options`: `string`[]; \} \| \{ `kind`: `"insert"`; `text`: `string`; \} \| \{ `kind`: `"info"`; `items`: [`ToolInfoItem`](../interfaces/ToolInfoItem.md)[]; \}

Defined in: [index.ts:1869](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1869)

A tool's answer (AD-10). Only the kernel applies it, and only when the writer picks.
