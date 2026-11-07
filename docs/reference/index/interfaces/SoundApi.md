# Interface: SoundApi

Defined in: [index.ts:4828](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4828)

Sounds a plugin bundles, played by the kernel (Story 28.2). The files come from the plugin's
own folder, never a URL. Nothing plays while the writer's "Allow sounds from plugins" is off.

## Methods

### play()

> **play**(`id`, `options?`): `void`

Defined in: [index.ts:4839](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4839)

Plays one of this plugin's declared sounds once. An undeclared ID throws
`plugin/undeclared-contribution`. Silent while the writer turned plugin sounds off; at most
`MAX_PLUGIN_SOUNDS` sounds play at once, and the oldest is cut for a new one.

#### Parameters

##### id

`string`

##### options?

[`SoundOptions`](SoundOptions.md)

#### Returns

`void`

#### Example

```ts
api.sound.play('my-plugin:bell', { volume: 0.5 })
```

***

### loop()

> **loop**(`id`, `options?`): [`Disposable`](Disposable.md)

Defined in: [index.ts:4850](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4850)

Plays a declared sound over and over until the returned Disposable is disposed, the writer
turns plugin sounds off, or the plugin is disabled or unloaded.

#### Parameters

##### id

`string`

##### options?

[`SoundOptions`](SoundOptions.md)

#### Returns

[`Disposable`](Disposable.md)

#### Example

```ts
const rain = api.sound.loop('my-plugin:rain', { volume: 0.4 })
// later: rain.dispose()
```
