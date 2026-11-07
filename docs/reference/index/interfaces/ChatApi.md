# Interface: ChatApi

Defined in: [index.ts:4188](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4188)

The project chat (Epic 33). Added in 0.59.0.

## Methods

### open()

> **open**(`options?`): `Promise`\<`void`\>

Defined in: [index.ts:4199](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4199)

Opens the chat panel. With a `skill` it starts a new session with that skill loaded, after
the writer has dealt with a live one (Done, Discard, or cancel: a cancel rejects
`plugin/failed`). Rejects `plugin/unavailable` while AI features are off. Added in 0.59.0.

#### Parameters

##### options?

[`ChatOpenOptions`](ChatOpenOptions.md)

#### Returns

`Promise`\<`void`\>

#### Example

```ts
await api.chat.open({ skill: 'my-plugin:interview', prompt: 'Start with my main character.' })
```

***

### onSessionEnded()

> **onSessionEnded**(`handler`): [`Disposable`](Disposable.md)

Defined in: [index.ts:4210](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4210)

Calls `handler` when a session ends with Done or Discard. It carries no text from the
conversation. The subscription ends when you dispose it or the plugin unloads. Added in 0.59.0.

#### Parameters

##### handler

(`event`) => `void`

#### Returns

[`Disposable`](Disposable.md)

#### Example

```ts
const subscription = api.chat.onSessionEnded((event) => console.log(event.saved))
subscription.dispose()
```
