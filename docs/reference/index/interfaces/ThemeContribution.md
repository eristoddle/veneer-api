# Interface: ThemeContribution

Defined in: [index.ts:1745](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1745)

A theme a plugin offers (FR-45, AD-5): a light and dark pair of color values. The ID is
`<pluginId>:<name>`. A token a mode leaves out keeps Veneer's own value for that mode, so a
theme can change just the accent. Typography and layout are page settings and never part of a
theme. The writer picks a theme and a mode in Settings; lists, settings, and results restyle
with no plugin code involved.

With `scope: 'code'` it is a code theme (Story 9.5, AD-19): it may set only the `syntax-*`
tokens and `surface-code`, is chosen in the Code theme setting rather than the Theme menu, and
lays over whichever theme is showing.

## Properties

### id

> **id**: `string`

Defined in: [index.ts:1746](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1746)

***

### name

> **name**: `string`

Defined in: [index.ts:1747](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1747)

***

### scope?

> `optional` **scope?**: `"code"`

Defined in: [index.ts:1748](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1748)

***

### light

> **light**: [`ThemeColors`](../type-aliases/ThemeColors.md)

Defined in: [index.ts:1749](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1749)

***

### dark

> **dark**: [`ThemeColors`](../type-aliases/ThemeColors.md)

Defined in: [index.ts:1750](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1750)
