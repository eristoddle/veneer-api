# Type Alias: SettingType

> **SettingType** = `"boolean"` \| `"string"` \| `"number"` \| `"enum"` \| `"folder"`

Defined in: [index.ts:852](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L852)

The control the kernel draws for a setting (FR-44, AD-4): `boolean` a switch, `string` and
`number` a text field (written on blur or Enter), `enum` a menu of `options`, `folder` the
path plus a "Choose…" button that opens the native folder picker.
