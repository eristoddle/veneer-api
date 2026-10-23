# Interface: ProvidersApi

Defined in: [index.ts:2796](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L2796)

The writer's models (FR-34, AD-11). Requests go to the default provider through the kernel;
a plugin gets text or a `VeneerError` and never a key, a URL, or the provider list. Only a
plugin whose manifest declares a tool with `needsProvider` may call it
(`plugin/undeclared-contribution` otherwise). Failures reject with `offline`, `auth`,
`rate-limit`, `server`, `timeout`, or `canceled`, and a sentence naming the provider.

## Methods

### complete()

> **complete**(`request`, `signal?`): `Promise`\<`string`\>

Defined in: [index.ts:2806](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L2806)

The whole reply.

#### Parameters

##### request

[`PluginCompletion`](PluginCompletion.md)

##### signal?

`AbortSignal`

#### Returns

`Promise`\<`string`\>

#### Example

```ts
const reply = await api.providers.complete({
  messages: [{ role: 'user', content: 'Give me a synonym for "quick".' }]
})
```

***

### stream()

> **stream**(`request`, `onText`, `signal?`): `Promise`\<`void`\>

Defined in: [index.ts:2818](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L2818)

Calls `onText` with each piece as it arrives, in order, then resolves.

#### Parameters

##### request

[`PluginCompletion`](PluginCompletion.md)

##### onText

(`text`) => `void`

##### signal?

`AbortSignal`

#### Returns

`Promise`\<`void`\>

#### Example

```ts
let text = ''
await api.providers.stream(
  { messages: [{ role: 'user', content: 'Rewrite: The cat sat.' }] },
  (piece) => { text += piece }
)
```
