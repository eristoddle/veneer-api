# Interface: BlockRendererContribution

Defined in: [index.ts:879](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L879)

A fenced-block renderer contribution (Story 9.4, AD-19): a plugin that draws fenced code
blocks of some languages. `id` is the full contribution ID, `<pluginId>:<name>`. `languages`
lists info-string languages (lowercase, as written after the opening fence, e.g. `mermaid`),
or is `["*"]` for every fenced block. A block goes to the most specific declaration: a
language named by one renderer beats `"*"`; among equals the first registered wins. The plugin
attaches the handler with `api.editor.registerBlockRenderer`; declare an activation event
(such as `app:started`) so it is loaded before blocks need it.

## Properties

### id

> **id**: `string`

Defined in: [index.ts:880](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L880)

***

### languages

> **languages**: `string`[]

Defined in: [index.ts:881](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L881)
