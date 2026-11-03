# Interface: TopBarButtonContribution

Defined in: [index.ts:1152](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1152)

A top-bar button a plugin offers (FR-53, AD-15, UX-DR7). `id` is `<pluginId>:<name>`; `title`
names it in its tooltip and in the "Show in top bar" checklist; `icon` is a Lucide name drawn
like a surface's. Exactly one target, declared in the same manifest: `surface` opens that
surface's side with it selected (or closes the side when it already shows there); `command`
runs that command. The button stays hidden until the writer turns it on, and the plugin is
never told whether it is shown.

## Properties

### id

> **id**: `string`

Defined in: [index.ts:1153](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1153)

***

### title

> **title**: `string`

Defined in: [index.ts:1154](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1154)

***

### icon

> **icon**: `string`

Defined in: [index.ts:1155](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1155)

***

### surface?

> `optional` **surface?**: `string`

Defined in: [index.ts:1156](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1156)

***

### command?

> `optional` **command?**: `string`

Defined in: [index.ts:1157](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1157)

***

### usesAI?

> `optional` **usesAI?**: `boolean`

Defined in: [index.ts:1159](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1159)

True when this feature needs an AI model; hidden while AI features are off.
