# Interface: DomView

Defined in: [index.ts:1285](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1285)

The raw-DOM escape hatch (AD-4). @unstable: may change or go away in any minor version.
The kernel still owns the frame, tabs, Esc, open/close, and width; `mount` fills the element
it is given (style only with `--vn-*` variables) and may return a disposable that runs when the
view is replaced or the panel unmounts. Typing in the focused panel calls `filter` with the
whole query, Up/Down call `move(-1 | 1)`, Enter calls `activate`.

## Properties

### kind

> **kind**: `"dom"`

Defined in: [index.ts:1286](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1286)

## Methods

### mount()

> **mount**(`element`): `void` \| [`Disposable`](Disposable.md)

Defined in: [index.ts:1287](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1287)

#### Parameters

##### element

`HTMLElement`

#### Returns

`void` \| [`Disposable`](Disposable.md)

***

### filter()?

> `optional` **filter**(`query`): `void`

Defined in: [index.ts:1288](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1288)

#### Parameters

##### query

`string`

#### Returns

`void`

***

### move()?

> `optional` **move**(`delta`): `void`

Defined in: [index.ts:1289](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1289)

#### Parameters

##### delta

`number`

#### Returns

`void`

***

### activate()?

> `optional` **activate**(): `void`

Defined in: [index.ts:1290](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1290)

#### Returns

`void`
