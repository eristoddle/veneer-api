# Type Alias: ThemeColors

> **ThemeColors** = `Partial`\<`Record`\<[`ColorToken`](ColorToken.md), `string`\>\> & `object`

Defined in: [index.ts:1718](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1718)

One mode of a theme: the tokens it changes, each a CSS color (`#RRGGBB` or `rgba(...)`). A theme
may also set a plugin's own token by its variable name, `--vnp-<pluginId>-<token>` (Story 8.4).
