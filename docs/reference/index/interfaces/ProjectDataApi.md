# Interface: ProjectDataApi

Defined in: [index.ts:4648](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4648)

Structured data that belongs to the open project (Story 9.26): a graph's node positions, a
timeline's lane order, a book's chapter order. Each key is a JSON file at
`.veneer/data/<pluginId>/<key>.json` in the project, written atomically, so it syncs and goes
into history with the manuscript. A plugin reaches only its own keys, and removing a plugin
keeps its data (it belongs to the book). Keep it for data, not for text the writer reads. A
loose file has no project: every call rejects `projectData/no-project`.

## Methods

### read()

> **read**(`key`): `Promise`\<`unknown`\>

Defined in: [index.ts:4659](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4659)

The value under `key`, or null when none is stored. Rejects `projectData/invalid` when the
file on disk is not valid JSON, and `projectData/bad-key` for a key that is not allowed.

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`unknown`\>

#### Example

```ts
const positions = (await api.projectData.read('graph-positions')) ?? {}
console.log(Object.keys(positions as object).length, 'nodes placed')
```

***

### write()

> **write**(`key`, `value`): `Promise`\<`void`\>

Defined in: [index.ts:4671](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4671)

Stores `value` (anything `JSON.stringify` accepts) under `key`, replacing the old one.
Keys are lowercase letters, digits, `.`, `_` and `-`, up to 64 characters, starting with a
letter or digit. A value is at most 1 MB serialized, and a plugin's data at most 20 MB per
project, else `projectData/too-large`.

#### Parameters

##### key

`string`

##### value

`unknown`

#### Returns

`Promise`\<`void`\>

#### Example

```ts
await api.projectData.write('graph-positions', { 'chapters/one.md': { x: 120, y: 48 } })
```

***

### delete()

> **delete**(`key`): `Promise`\<`void`\>

Defined in: [index.ts:4680](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4680)

Removes `key`; one that isn't stored is ignored.

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`void`\>

#### Example

```ts
await api.projectData.delete('graph-positions')
```

***

### keys()

> **keys**(): `Promise`\<`string`[]\>

Defined in: [index.ts:4689](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4689)

Every key this plugin has stored in the project, sorted.

#### Returns

`Promise`\<`string`[]\>

#### Example

```ts
for (const key of await api.projectData.keys()) console.log(key)
```
