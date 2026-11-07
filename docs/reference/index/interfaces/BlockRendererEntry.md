# Interface: BlockRendererEntry

Defined in: [index.ts:1430](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1430)

One available renderer as the kernel hands it to the editor (`EditorHost.setBlockRenderers`).

## Properties

### id

> **id**: `string`

Defined in: [index.ts:1431](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1431)

***

### languages

> **languages**: `string`[]

Defined in: [index.ts:1432](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1432)

***

### render

> **render**: [`BlockRenderer`](../type-aliases/BlockRenderer.md)

Defined in: [index.ts:1433](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1433)

## Methods

### report()

> **report**(`err`): `void`

Defined in: [index.ts:1435](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1435)

Called at most once per renderer per session with a failure; the kernel raises the notice.

#### Parameters

##### err

`unknown`

#### Returns

`void`
