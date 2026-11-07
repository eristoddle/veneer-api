# Interface: ProvidersApi

Defined in: [index.ts:4468](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4468)

The writer's models (FR-34, AD-11). Requests go to the default provider through the kernel;
a plugin gets text or a `VeneerError` and never a key, a URL, or the provider list. Only a
plugin whose manifest declares a tool with `needsProvider` or `canAskModel` may call it
(`plugin/undeclared-contribution` otherwise). Failures reject with `offline`, `auth`,
`rate-limit`, `server`, `timeout`, or `canceled`, and a sentence naming the provider.

## Methods

### complete()

> **complete**(`request`, `signal?`): `Promise`\<`string`\>

Defined in: [index.ts:4478](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4478)

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

Defined in: [index.ts:4490](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4490)

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

***

### image()

> **image**(`request`, `signal?`): `Promise`\<[`PluginImages`](PluginImages.md)\>

Defined in: [index.ts:4510](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4510)

Makes pictures with the writer's Images provider (Settings > Providers > Images; the key
never leaves the app). Rejects `provider/none` when no image provider is set up, `ai/off`
while AI features are off, and the usual provider codes; the same manifest rule as `complete`
applies. Save an image with `api.vault.saveAttachment`.

#### Parameters

##### request

[`PluginImageRequest`](PluginImageRequest.md)

##### signal?

`AbortSignal`

#### Returns

`Promise`\<[`PluginImages`](PluginImages.md)\>

#### Example

```ts
const { images, mime } = await api.providers.image({
  prompt: 'A lighthouse at dusk, watercolor, no text',
  count: 2,
  shape: 'landscape'
})
console.log(`${images.length} ${mime} images`)
```
