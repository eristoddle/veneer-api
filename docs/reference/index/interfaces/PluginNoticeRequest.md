# Interface: PluginNoticeRequest

Defined in: [index.ts:2766](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L2766)

What a plugin asks the kernel to show with `api.notify` (Story 9.20).

## Properties

### message

> **message**: `string`

Defined in: [index.ts:2768](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L2768)

One plain sentence: up to `MAX_NOTICE_MESSAGE` characters, on one line.

***

### action?

> `optional` **action?**: `object`

Defined in: [index.ts:2770](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L2770)

A button that opens one of the plugin's declared surfaces.

#### label

> **label**: `string`

Up to `MAX_NOTICE_ACTION_LABEL` characters.

#### surface

> **surface**: `string`

The ID of a surface the plugin's manifest declares.
