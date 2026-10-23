# Interface: SettingContribution

Defined in: [index.ts:872](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L872)

A setting contribution (FR-44, AD-5). `id` is the full contribution ID, `<pluginId>:<name>`.
The kernel draws the control from this declaration alone; plugins never draw settings UI.
`default` must match `type` (an `enum` default is one of `options`; a `folder` default is a
path, or `''` for none).

## Properties

### id

> **id**: `string`

Defined in: [index.ts:873](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L873)

***

### type

> **type**: [`SettingType`](../type-aliases/SettingType.md)

Defined in: [index.ts:874](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L874)

***

### default

> **default**: [`SettingValue`](../type-aliases/SettingValue.md)

Defined in: [index.ts:875](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L875)

***

### label

> **label**: `string`

Defined in: [index.ts:876](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L876)

***

### description?

> `optional` **description?**: `string`

Defined in: [index.ts:877](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L877)

***

### category?

> `optional` **category?**: `string`

Defined in: [index.ts:883](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L883)

A page of this plugin's settings in the Settings sidebar, such as `Appearance`. Settings with
the same category (up to 40 characters) share a page, listed under the plugin's name; settings
with none stay on the plugin's own page. Optional, and a plugin with few settings can skip it.

***

### scope

> **scope**: [`SettingScope`](../type-aliases/SettingScope.md)

Defined in: [index.ts:884](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L884)

***

### options?

> `optional` **options?**: [`SettingOption`](SettingOption.md)[]

Defined in: [index.ts:886](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L886)

Required for `enum`, and only allowed there.
