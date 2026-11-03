# Interface: SettingContribution

Defined in: [index.ts:982](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L982)

A setting contribution (FR-44, AD-5). `id` is the full contribution ID, `<pluginId>:<name>`.
The kernel draws the control from this declaration alone; plugins never draw settings UI.
`default` must match `type` (an `enum` default is one of `options`; a `folder` default is a
path, or `''` for none).

## Properties

### id

> **id**: `string`

Defined in: [index.ts:983](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L983)

***

### type

> **type**: [`SettingType`](../type-aliases/SettingType.md)

Defined in: [index.ts:984](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L984)

***

### default

> **default**: [`SettingValue`](../type-aliases/SettingValue.md)

Defined in: [index.ts:985](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L985)

***

### label

> **label**: `string`

Defined in: [index.ts:986](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L986)

***

### description?

> `optional` **description?**: `string`

Defined in: [index.ts:987](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L987)

***

### category?

> `optional` **category?**: `string`

Defined in: [index.ts:993](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L993)

A page of this plugin's settings in the Settings sidebar, such as `Appearance`. Settings with
the same category (up to 40 characters) share a page, listed under the plugin's name; settings
with none stay on the plugin's own page. Optional, and a plugin with few settings can skip it.

***

### scope

> **scope**: [`SettingScope`](../type-aliases/SettingScope.md)

Defined in: [index.ts:994](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L994)

***

### options?

> `optional` **options?**: [`SettingOption`](SettingOption.md)[]

Defined in: [index.ts:996](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L996)

Required for `enum`, and only allowed there.

***

### usesAI?

> `optional` **usesAI?**: `boolean`

Defined in: [index.ts:998](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L998)

True when this feature needs an AI model; hidden while AI features are off.

***

### macOnly?

> `optional` **macOnly?**: `boolean`

Defined in: [index.ts:1000](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1000)

Shown only on macOS (Story 17.8): for a setting about a macOS feature.
