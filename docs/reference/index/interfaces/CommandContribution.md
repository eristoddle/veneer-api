# Interface: CommandContribution

Defined in: [index.ts:844](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L844)

A command contribution. `id` is the full contribution ID, `<pluginId>:<name>`.

## Properties

### id

> **id**: `string`

Defined in: [index.ts:845](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L845)

***

### title

> **title**: `string`

Defined in: [index.ts:846](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L846)

***

### usesAI?

> `optional` **usesAI?**: `boolean`

Defined in: [index.ts:848](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L848)

True when this feature needs an AI model; hidden while AI features are off.
