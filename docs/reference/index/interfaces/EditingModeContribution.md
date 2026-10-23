# Interface: EditingModeContribution

Defined in: [index.ts:746](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L746)

An editing mode contribution (FR-12, AD-7): a way of drawing the same file text, such as live
preview. `id` is the full contribution ID, `<pluginId>:<name>`; `title` is what the View menu
shows. The plugin attaches the mode's extension set with `api.editor.registerMode`.

## Properties

### id

> **id**: `string`

Defined in: [index.ts:747](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L747)

***

### title

> **title**: `string`

Defined in: [index.ts:748](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L748)
