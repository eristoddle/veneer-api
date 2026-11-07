# Interface: PluginNoticeRequest

Defined in: [index.ts:4062](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4062)

What a plugin asks the kernel to show with `api.notify` (Story 9.20).

## Properties

### message

> **message**: `string`

Defined in: [index.ts:4064](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4064)

One plain sentence: up to `MAX_NOTICE_MESSAGE` characters, on one line.

***

### action?

> `optional` **action?**: `object`

Defined in: [index.ts:4066](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4066)

A button that opens one of the plugin's declared surfaces.

#### label

> **label**: `string`

Up to `MAX_NOTICE_ACTION_LABEL` characters.

#### surface

> **surface**: `string`

The ID of a surface the plugin's manifest declares.
