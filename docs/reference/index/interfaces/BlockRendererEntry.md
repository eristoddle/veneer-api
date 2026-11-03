# Interface: BlockRendererEntry

Defined in: [index.ts:946](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L946)

One available renderer as the kernel hands it to the editor (`EditorHost.setBlockRenderers`).

## Properties

### id

> **id**: `string`

Defined in: [index.ts:947](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L947)

***

### languages

> **languages**: `string`[]

Defined in: [index.ts:948](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L948)

***

### render

> **render**: [`BlockRenderer`](../type-aliases/BlockRenderer.md)

Defined in: [index.ts:949](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L949)

## Methods

### report()

> **report**(`err`): `void`

Defined in: [index.ts:951](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L951)

Called at most once per renderer per session with a failure; the kernel raises the notice.

#### Parameters

##### err

`unknown`

#### Returns

`void`
