# Variable: PLUGIN\_ERROR

> `const` **PLUGIN\_ERROR**: `object`

Defined in: [index.ts:5211](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L5211)

Error codes the plugin host uses.

## Type Declaration

### undeclaredContribution

> `readonly` **undeclaredContribution**: `"plugin/undeclared-contribution"` = `'plugin/undeclared-contribution'`

### duplicateHandler

> `readonly` **duplicateHandler**: `"plugin/duplicate-handler"` = `'plugin/duplicate-handler'`

### unknownCommand

> `readonly` **unknownCommand**: `"plugin/unknown-command"` = `'plugin/unknown-command'`

### noHandler

> `readonly` **noHandler**: `"plugin/no-handler"` = `'plugin/no-handler'`

### unknownPlugin

> `readonly` **unknownPlugin**: `"plugin/unknown-plugin"` = `'plugin/unknown-plugin'`

`api.plugins.manifest` named an ID no plugin or theme has. Added in 0.60.0.

### unavailable

> `readonly` **unavailable**: `"plugin/unavailable"` = `'plugin/unavailable'`

### failed

> `readonly` **failed**: `"plugin/failed"` = `'plugin/failed'`

### badView

> `readonly` **badView**: `"plugin/bad-view"` = `'plugin/bad-view'`

`api.surfaces.setView` got something that isn't a list, tree, DOM, split, form, or diff view.

### badItems

> `readonly` **badItems**: `"plugin/bad-items"` = `'plugin/bad-items'`

`api.palette.setItems` got something that isn't a list of items.

### badMarks

> `readonly` **badMarks**: `"plugin/bad-marks"` = `'plugin/bad-marks'`

`api.editor.setMarks` got malformed marks or more than `MAX_MARKS`; the message says which.

### unknownTool

> `readonly` **unknownTool**: `"plugin/unknown-tool"` = `'plugin/unknown-tool'`

`runTool` named a tool no live plugin declares.

### badResult

> `readonly` **badResult**: `"plugin/bad-result"` = `'plugin/bad-result'`

A tool handler returned something that isn't a `ToolResult`.

### badNotice

> `readonly` **badNotice**: `"plugin/bad-notice"` = `'plugin/bad-notice'`

`api.notify` got an empty or over-long message, or a malformed action (Story 9.20).
