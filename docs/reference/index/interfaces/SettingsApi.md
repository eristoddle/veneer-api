# Interface: SettingsApi

Defined in: [index.ts:1582](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1582)

Reads this plugin's own declared settings (FR-44, FR-26). The value is layered: the
declaration's default, then the open project type's default (Story 7.4), then the user value,
then the project value, the most specific winning. Plugins never write settings; the writer changes them in the settings surface.

## Methods

### get()

> **get**(`id`): `Promise`\<[`SettingValue`](../type-aliases/SettingValue.md)\>

Defined in: [index.ts:1596](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1596)

The setting's current value, read fresh. Rejects `plugin/undeclared-contribution` for an
ID this plugin's manifest doesn't declare, including another plugin's. The one exception
(0.55.0): `editor:typewriter-mode` and `editor:focus-mode`, the page's view modes, which any
plugin may read (never write; `api.commands.run` toggles them), so a plugin can turn one on
only when it is off.

#### Parameters

##### id

`string`

#### Returns

`Promise`\<[`SettingValue`](../type-aliases/SettingValue.md)\>

#### Example

```ts
const goal = await api.settings.get('my-plugin:daily-goal')
if (typeof goal === 'number') console.log(`Goal: ${goal} words`)
```

***

### onChanged()

> **onChanged**(`listener`): [`Disposable`](Disposable.md)

Defined in: [index.ts:1610](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1610)

Fires with the ID of one of this plugin's settings whose value changed: the writer changed
it, or a project switch changed which value applies.

Returns a Disposable. The kernel disposes it when the plugin unloads or is turned off; dispose it earlier to stop.

#### Parameters

##### listener

(`id`) => `void`

#### Returns

[`Disposable`](Disposable.md)

#### Example

```ts
api.settings.onChanged(async (id) => {
  if (id === 'my-plugin:daily-goal') refresh(await api.settings.get(id))
})
```
