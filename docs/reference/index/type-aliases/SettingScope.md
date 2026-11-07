# Type Alias: SettingScope

> **SettingScope** = `"user"` \| `"project"` \| `"both"`

Defined in: [index.ts:1542](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1542)

Where a setting can be set (FR-26): `user` in `userData/settings.json`, `project` in the open
project's `.veneer/config.json`, `both` in either, the project value winning.
