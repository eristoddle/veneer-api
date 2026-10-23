# Type Alias: SettingScope

> **SettingScope** = `"user"` \| `"project"` \| `"both"`

Defined in: [index.ts:858](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L858)

Where a setting can be set (FR-26): `user` in `userData/settings.json`, `project` in the open
project's `.veneer/config.json`, `both` in either, the project value winning.
