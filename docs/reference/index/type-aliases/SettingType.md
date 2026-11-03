# Type Alias: SettingType

> **SettingType** = `"boolean"` \| `"string"` \| `"number"` \| `"enum"` \| `"folder"`

Defined in: [index.ts:962](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L962)

The control the kernel draws for a setting (FR-44, AD-4): `boolean` a switch, `string` and
`number` a text field (written on blur or Enter), `enum` a menu of `options`, `folder` the
path plus a "Choose…" button that opens the native folder picker.
