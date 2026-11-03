# Type Alias: ThemeColors

> **ThemeColors** = `Partial`\<`Record`\<[`ColorToken`](ColorToken.md), `string`\>\> & `object`

Defined in: [index.ts:1872](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1872)

One mode of a theme: the tokens it changes, each a CSS color (`#RRGGBB` or `rgba(...)`). A theme
may also set a plugin's own token by its variable name, `--vnp-<pluginId>-<token>` (Story 8.4).
