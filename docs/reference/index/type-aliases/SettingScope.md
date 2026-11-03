# Type Alias: SettingScope

> **SettingScope** = `"user"` \| `"project"` \| `"both"`

Defined in: [index.ts:968](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L968)

Where a setting can be set (FR-26): `user` in `userData/settings.json`, `project` in the open
project's `.veneer/config.json`, `both` in either, the project value winning.
