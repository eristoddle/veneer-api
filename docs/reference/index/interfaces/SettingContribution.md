# Interface: SettingContribution

Defined in: [index.ts:1556](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1556)

A setting contribution (FR-44, AD-5). `id` is the full contribution ID, `<pluginId>:<name>`.
The kernel draws the control from this declaration alone; plugins never draw settings UI.
`default` must match `type` (an `enum` default is one of `options`; a `folder` default is a
path, or `''` for none).

## Properties

### id

> **id**: `string`

Defined in: [index.ts:1557](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1557)

***

### type

> **type**: [`SettingType`](../type-aliases/SettingType.md)

Defined in: [index.ts:1558](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1558)

***

### default

> **default**: [`SettingValue`](../type-aliases/SettingValue.md)

Defined in: [index.ts:1559](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1559)

***

### label

> **label**: `string`

Defined in: [index.ts:1560](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1560)

***

### description?

> `optional` **description?**: `string`

Defined in: [index.ts:1561](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1561)

***

### category?

> `optional` **category?**: `string`

Defined in: [index.ts:1567](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1567)

A page of this plugin's settings in the Settings sidebar, such as `Appearance`. Settings with
the same category (up to 40 characters) share a page, listed under the plugin's name; settings
with none stay on the plugin's own page. Optional, and a plugin with few settings can skip it.

***

### scope

> **scope**: [`SettingScope`](../type-aliases/SettingScope.md)

Defined in: [index.ts:1568](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1568)

***

### options?

> `optional` **options?**: [`SettingOption`](SettingOption.md)[]

Defined in: [index.ts:1570](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1570)

Required for `enum`, and only allowed there.

***

### usesAI?

> `optional` **usesAI?**: `boolean`

Defined in: [index.ts:1572](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1572)

True when this feature needs an AI model; hidden while AI features are off.

***

### macOnly?

> `optional` **macOnly?**: `boolean`

Defined in: [index.ts:1574](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1574)

Shown only on macOS (Story 17.8): for a setting about a macOS feature.
