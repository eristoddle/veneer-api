# Interface: ThemeContribution

Defined in: [index.ts:2707](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2707)

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

Defined in: [index.ts:2708](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2708)

***

### name

> **name**: `string`

Defined in: [index.ts:2709](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2709)

***

### scope?

> `optional` **scope?**: `"code"`

Defined in: [index.ts:2710](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2710)

***

### fonts?

> `optional` **fonts?**: `object`

Defined in: [index.ts:2716](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2716)

The page fonts this theme brings (Epic 19, 0.48.0): body text, headings, and code. The face
the writer chose in page settings still wins. Ignored on a code-scope theme. Interface
controls are never restyled.

#### body?

> `optional` **body?**: [`ThemeFont`](ThemeFont.md)

#### heading?

> `optional` **heading?**: [`ThemeFont`](ThemeFont.md)

#### code?

> `optional` **code?**: [`ThemeFont`](ThemeFont.md)

***

### codeTheme?

> `optional` **codeTheme?**: `string`

Defined in: [index.ts:2721](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2721)

The ID of a `scope: 'code'` theme in the same package that goes with this page theme (Epic
19, 0.48.0). Used while the Code theme setting is on "Match page theme".

***

### light

> **light**: [`ThemeColors`](../type-aliases/ThemeColors.md)

Defined in: [index.ts:2722](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2722)

***

### dark

> **dark**: [`ThemeColors`](../type-aliases/ThemeColors.md)

Defined in: [index.ts:2723](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2723)
