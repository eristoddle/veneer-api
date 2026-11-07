# Interface: ChatSessionEndedEvent

Defined in: [index.ts:4119](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4119)

What `api.chat.onSessionEnded` hears (Epic 33). Added in 0.59.0.

## Properties

### saved

> **saved**: `boolean`

Defined in: [index.ts:4126](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4126)

Whether the writer saved the transcript. A discarded session reports false. Added in 0.59.0.

#### Example

```ts
api.chat.onSessionEnded((event) => console.log(event.saved ? 'Saved' : 'Not saved'))
```

***

### path?

> `optional` **path?**: `string`

Defined in: [index.ts:4135](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4135)

The saved document's API path, when `saved` is true. Added in 0.59.0.

#### Example

```ts
api.chat.onSessionEnded((event) => {
  if (event.path !== undefined) console.log(`Transcript at ${event.path}`)
})
```
