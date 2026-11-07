# Type Alias: SettingType

> **SettingType** = `"boolean"` \| `"string"` \| `"number"` \| `"enum"` \| `"folder"`

Defined in: [index.ts:1536](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1536)

The control the kernel draws for a setting (FR-44, AD-4): `boolean` a switch, `string` and
`number` a text field (written on blur or Enter), `enum` a menu of `options`, `folder` the
path plus a "Choose…" button that opens the native folder picker.
