# Interface: PluginNoticeRequest

Defined in: [index.ts:3056](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3056)

What a plugin asks the kernel to show with `api.notify` (Story 9.20).

## Properties

### message

> **message**: `string`

Defined in: [index.ts:3058](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3058)

One plain sentence: up to `MAX_NOTICE_MESSAGE` characters, on one line.

***

### action?

> `optional` **action?**: `object`

Defined in: [index.ts:3060](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3060)

A button that opens one of the plugin's declared surfaces.

#### label

> **label**: `string`

Up to `MAX_NOTICE_ACTION_LABEL` characters.

#### surface

> **surface**: `string`

The ID of a surface the plugin's manifest declares.
