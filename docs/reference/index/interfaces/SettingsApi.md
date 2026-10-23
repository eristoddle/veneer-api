# Interface: SettingsApi

Defined in: [index.ts:894](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L894)

Reads this plugin's own declared settings (FR-44, FR-26). The value is layered: the
declaration's default, then the open project type's default (Story 7.4), then the user value,
then the project value, the most specific winning. Plugins never write settings; the writer changes them in the settings surface.

## Methods

### get()

> **get**(`id`): `Promise`\<[`SettingValue`](../type-aliases/SettingValue.md)\>

Defined in: [index.ts:905](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L905)

The setting's current value, read fresh. Rejects `plugin/undeclared-contribution` for an
ID this plugin's manifest doesn't declare, including another plugin's.

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

Defined in: [index.ts:919](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L919)

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
