# Type Alias: ThemeColors

> **ThemeColors** = `Partial`\<`Record`\<[`ColorToken`](ColorToken.md), `string`\>\> & `object`

Defined in: [index.ts:2680](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2680)

One mode of a theme: the tokens it changes, each a CSS color (`#RRGGBB` or `rgba(...)`). A theme
may also set a plugin's own token by its variable name, `--vnp-<pluginId>-<token>` (Story 8.4).
