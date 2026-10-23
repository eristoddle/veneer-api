# Type Alias: SettingScope

> **SettingScope** = `"user"` \| `"project"` \| `"both"`

Defined in: [index.ts:858](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L858)

Where a setting can be set (FR-26): `user` in `userData/settings.json`, `project` in the open
project's `.veneer/config.json`, `both` in either, the project value winning.
