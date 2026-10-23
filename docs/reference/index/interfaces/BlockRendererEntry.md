# Interface: BlockRendererEntry

Defined in: [index.ts:836](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L836)

One available renderer as the kernel hands it to the editor (`EditorHost.setBlockRenderers`).

## Properties

### id

> **id**: `string`

Defined in: [index.ts:837](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L837)

***

### languages

> **languages**: `string`[]

Defined in: [index.ts:838](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L838)

***

### render

> **render**: [`BlockRenderer`](../type-aliases/BlockRenderer.md)

Defined in: [index.ts:839](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L839)

## Methods

### report()

> **report**(`err`): `void`

Defined in: [index.ts:841](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L841)

Called at most once per renderer per session with a failure; the kernel raises the notice.

#### Parameters

##### err

`unknown`

#### Returns

`void`
