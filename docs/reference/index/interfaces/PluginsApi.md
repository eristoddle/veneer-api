# Interface: PluginsApi

Defined in: [index.ts:4162](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4162)

What is installed, read-only (Epic 35). Added in 0.60.0.

## Methods

### list()

> **list**(): `Promise`\<[`PluginSummary`](PluginSummary.md)[]\>

Defined in: [index.ts:4173](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4173)

Lists every plugin and theme the app knows about, core and built-in ones included, with
counts of what each contributes. It holds no code and no files. Added in 0.60.0.

#### Returns

`Promise`\<[`PluginSummary`](PluginSummary.md)[]\>

#### Example

```ts
const plugins = await api.plugins.list()
const taken = plugins.some((plugin) => plugin.id === 'my-plugin')
```

***

### manifest()

> **manifest**(`id`): `Promise`\<[`PluginManifest`](PluginManifest.md)\>

Defined in: [index.ts:4184](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4184)

The validated manifest of one plugin or theme, for copying a real pattern or checking what
commands exist. Rejects `plugin/unknown-plugin` for an ID nothing has. Added in 0.60.0.

#### Parameters

##### id

`string`

#### Returns

`Promise`\<[`PluginManifest`](PluginManifest.md)\>

#### Example

```ts
const manifest = await api.plugins.manifest('word-count')
console.log(manifest.contributes.commands?.length)
```
