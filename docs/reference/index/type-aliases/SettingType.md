# Type Alias: SettingType

> **SettingType** = `"boolean"` \| `"string"` \| `"number"` \| `"enum"` \| `"folder"`

Defined in: [index.ts:852](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L852)

The control the kernel draws for a setting (FR-44, AD-4): `boolean` a switch, `string` and
`number` a text field (written on blur or Enter), `enum` a menu of `options`, `folder` the
path plus a "Choose…" button that opens the native folder picker.
