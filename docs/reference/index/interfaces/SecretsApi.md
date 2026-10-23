# Interface: SecretsApi

Defined in: [index.ts:3022](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L3022)

Secret storage for a plugin (Story 9.8, AD-11): a service token, an API key. Values live in the
system keychain under this plugin's own ID, so no other plugin can read them, and main never
logs them. Names are lowercase letters, digits, `.`, `_` and `-`, up to 64 characters, and a
value is up to 8,192 characters. Removing the plugin removes its secrets.

## Methods

### get()

> **get**(`name`): `Promise`\<`string` \| `null`\>

Defined in: [index.ts:3032](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L3032)

The secret stored under `name`, or null.

#### Parameters

##### name

`string`

#### Returns

`Promise`\<`string` \| `null`\>

#### Example

```ts
const token = await api.secrets.get('service-token')
if (token === null) console.log('Ask the writer for a token first')
```

***

### set()

> **set**(`name`, `value`): `Promise`\<`void`\>

Defined in: [index.ts:3043](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L3043)

Stores or replaces a secret. Rejects `secrets/invalid` for a bad name or value, and
`secrets/keychain-unavailable` when the keychain refuses.

#### Parameters

##### name

`string`

##### value

`string`

#### Returns

`Promise`\<`void`\>

#### Example

```ts
const tokenTheWriterTyped = 'abc123'
await api.secrets.set('service-token', tokenTheWriterTyped)
```

***

### delete()

> **delete**(`name`): `Promise`\<`void`\>

Defined in: [index.ts:3052](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L3052)

Removes a secret; one that isn't stored is ignored.

#### Parameters

##### name

`string`

#### Returns

`Promise`\<`void`\>

#### Example

```ts
await api.secrets.delete('service-token')
```
