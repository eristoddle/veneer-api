# Settings

Declare a setting in the manifest and the kernel draws its control in Settings, under your plugin's name. You never draw a setting.

```json
{
  "contributes": {
    "settings": [
      {
        "id": "my-plugin:tone",
        "type": "enum",
        "default": "soft",
        "label": "Tone",
        "description": "How strong the rewrite should be.",
        "scope": "both",
        "options": [
          { "value": "soft", "label": "Soft" },
          { "value": "sharp", "label": "Sharp" }
        ]
      }
    ]
  }
}
```

| `type` | Control | Value |
|---|---|---|
| `boolean` | a switch | `true` / `false` |
| `string` | a text field (written on blur or Enter) | text |
| `number` | a text field | a number |
| `enum` | a menu of `options` | one option's `value` |
| `folder` | the path and a "Choose…" button | a path |

`label` and `description` are plain one-line text. `category` (optional, up to 40 characters) groups settings into pages: all settings with the same category share one page listed under your plugin's name in the Settings sidebar, and settings with no category stay on the plugin's own page. A plugin with only a few settings can leave it out. `scope` is `"user"` (the writer's own setting), `"project"` (only per project), or `"both"`.

## Reading

```ts
const tone = await api.settings.get('my-plugin:tone')
api.settings.onChanged(async (id) => {
  if (id === 'my-plugin:tone') applyTone(await api.settings.get(id))
})
```

`api.settings.get` returns the **layered** value for the open project. `get` is typed as `SettingValue` (`boolean | number | string`) whatever the setting's type, so narrow it, for example `String(await api.settings.get('my-plugin:tone'))` for an enum. For an `enum`, a stored value that is not one of your `options` (a stale value from an older version of your plugin, say) is ignored and you get the layer beneath it, ending at your `default`, so you always get a listed option. You can read only the settings your own manifest declares; asking for another plugin's ID rejects with `plugin/undeclared-contribution`. Only a stored value that fits the declaration counts: one of the wrong type is ignored.

## Layering

The value you get is the first of these that is set:

1. the **project's** setting (`.veneer/config.json` in the project),
2. the writer's **user** setting,
3. the open project type's **default** (see [project types](project-types.md)),
4. your declaration's `default`.

A project type only supplies defaults: anything the writer set wins. Settings writes are the kernel's: you declare and read, and never write a setting yourself.
