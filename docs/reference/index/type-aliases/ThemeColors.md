# Type Alias: ThemeColors

> **ThemeColors** = `Partial`\<`Record`\<[`ColorToken`](ColorToken.md), `string`\>\> & `object`

Defined in: [index.ts:1718](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1718)

One mode of a theme: the tokens it changes, each a CSS color (`#RRGGBB` or `rgba(...)`). A theme
may also set a plugin's own token by its variable name, `--vnp-<pluginId>-<token>` (Story 8.4).
