# Interface: PluginColorContribution

Defined in: [index.ts:1728](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1728)

A color token a plugin adds (FR-57). `id` is lowercase-hyphen; the variable is
`--vnp-<pluginId>-<id>`. `light` and `dark` are its defaults: in dark mode, a theme that doesn't
mention the token gets `dark`, and a theme that sets it overrides these. Use it in a raw-DOM view
(`var(--vnp-my-plugin-bar)`); the plugin never handles a theme switch.

## Properties

### id

> **id**: `string`

Defined in: [index.ts:1729](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1729)

***

### light

> **light**: `string`

Defined in: [index.ts:1730](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1730)

***

### dark

> **dark**: `string`

Defined in: [index.ts:1731](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1731)
