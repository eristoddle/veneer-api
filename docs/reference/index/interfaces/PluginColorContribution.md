# Interface: PluginColorContribution

Defined in: [index.ts:2690](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2690)

A color token a plugin adds (FR-57). `id` is lowercase-hyphen; the variable is
`--vnp-<pluginId>-<id>`. `light` and `dark` are its defaults: in dark mode, a theme that doesn't
mention the token gets `dark`, and a theme that sets it overrides these. Use it in a raw-DOM view
(`var(--vnp-my-plugin-bar)`); the plugin never handles a theme switch.

## Properties

### id

> **id**: `string`

Defined in: [index.ts:2691](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2691)

***

### light

> **light**: `string`

Defined in: [index.ts:2692](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2692)

***

### dark

> **dark**: `string`

Defined in: [index.ts:2693](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2693)
