# Interface: PluginColorContribution

Defined in: [index.ts:1882](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1882)

A color token a plugin adds (FR-57). `id` is lowercase-hyphen; the variable is
`--vnp-<pluginId>-<id>`. `light` and `dark` are its defaults: in dark mode, a theme that doesn't
mention the token gets `dark`, and a theme that sets it overrides these. Use it in a raw-DOM view
(`var(--vnp-my-plugin-bar)`); the plugin never handles a theme switch.

## Properties

### id

> **id**: `string`

Defined in: [index.ts:1883](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1883)

***

### light

> **light**: `string`

Defined in: [index.ts:1884](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1884)

***

### dark

> **dark**: `string`

Defined in: [index.ts:1885](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1885)
