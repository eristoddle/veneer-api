# Interface: EditingModeContribution

Defined in: [index.ts:856](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L856)

An editing mode contribution (FR-12, AD-7): a way of drawing the same file text, such as live
preview. `id` is the full contribution ID, `<pluginId>:<name>`; `title` is what the View menu
shows. The plugin attaches the mode's extension set with `api.editor.registerMode`.

## Properties

### id

> **id**: `string`

Defined in: [index.ts:857](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L857)

***

### title

> **title**: `string`

Defined in: [index.ts:858](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L858)
