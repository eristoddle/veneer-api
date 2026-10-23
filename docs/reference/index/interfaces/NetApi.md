# Interface: NetApi

Defined in: [index.ts:2892](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2892)

The network (FR-51, AD-6). Plugins never reach the network themselves: the renderer is
sandboxed, and this is main's proxied fetch. A tool marked `readOnly` is refused
(`plugin/read-only-tool`). Any other tool makes the writer confirm the first time
("<Tool> from <Plugin> wants to connect to example.com. Allow it?"); declining rejects
`plugin/declined` and nothing is sent. From a command or an event handler the same first-time
question is asked in a notice ("<Plugin> wants to connect to example.com. Allow it?"), once per
plugin and address; declining rejects `plugin/declined`. Addresses on this computer or its local
network are refused (`net/blocked`), and so is a redirect to one, unless the writer has allowed
that address for this plugin in Settings > Plugins. Bodies may be text, bytes, or a multipart
form, and an answer may be read as bytes (see `NetRequest`). Failures reject with `offline`,
`timeout`, `canceled`, `net/blocked`, `net/invalid`, or `net/too-large`, and a plain sentence.

## Methods

### fetch()

> **fetch**(`request`, `signal?`): `Promise`\<[`NetResponse`](NetResponse.md)\>

Defined in: [index.ts:2901](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2901)

One request, answered in full.

#### Parameters

##### request

[`NetRequest`](NetRequest.md)

##### signal?

`AbortSignal`

#### Returns

`Promise`\<[`NetResponse`](NetResponse.md)\>

#### Example

```ts
const response = await api.net.fetch({ url: 'https://example.com/api/words?q=quick' })
const words = response.ok ? (JSON.parse(response.text) as string[]) : []
```
