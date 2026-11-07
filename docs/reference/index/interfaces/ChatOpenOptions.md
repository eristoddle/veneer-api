# Interface: ChatOpenOptions

Defined in: [index.ts:4097](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4097)

Options for `api.chat.open` (Epic 33). Added in 0.59.0.

## Properties

### skill?

> `optional` **skill?**: `string`

Defined in: [index.ts:4107](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4107)

The skill to load into a new session: one this plugin bundles (`<pluginId>:<name>`) or one of
the writer's own (`skill.user:<name>`, `skill.project:<name>`). Another plugin's skill is
refused with `chat/skill-not-allowed`. A skill that is not interactive still loads; the chat
is where it runs. Added in 0.59.0.

#### Example

```ts
await api.chat.open({ skill: 'my-plugin:interview' })
```

***

### prompt?

> `optional` **prompt?**: `string`

Defined in: [index.ts:4115](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4115)

Text placed in the message box for the writer to read and send; nothing is sent until they
do. At most 2000 characters. Added in 0.59.0.

#### Example

```ts
await api.chat.open({ prompt: 'Help me outline this chapter.' })
```
