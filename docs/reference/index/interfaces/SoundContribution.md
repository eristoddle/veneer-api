# Interface: SoundContribution

Defined in: [index.ts:4798](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4798)

A sound file a plugin bundles (`contributes.sounds`, Story 28.2).

## Properties

### id

> **id**: `string`

Defined in: [index.ts:4800](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4800)

`<pluginId>:<name>`; what `api.sound.play` takes.

***

### file

> **file**: `string`

Defined in: [index.ts:4802](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4802)

A `.ogg`, `.mp3`, or `.wav` file inside the plugin's folder.
