# Interface: PaletteProviderContribution

Defined in: [index.ts:1622](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1622)

A palette provider contribution (FR-9, UX-DR15, AD-5): items listed when the writer deletes
the `>` (files mode). `id` is `<pluginId>:<name>`; `title` names it.

## Properties

### id

> **id**: `string`

Defined in: [index.ts:1623](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1623)

***

### title

> **title**: `string`

Defined in: [index.ts:1624](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1624)

***

### usesAI?

> `optional` **usesAI?**: `boolean`

Defined in: [index.ts:1626](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1626)

True when this feature needs an AI model; hidden while AI features are off.
