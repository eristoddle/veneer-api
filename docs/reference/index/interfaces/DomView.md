# Interface: DomView

Defined in: [index.ts:1140](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1140)

The raw-DOM escape hatch (AD-4). @unstable: may change or go away in any minor version.
The kernel still owns the frame, tabs, Esc, open/close, and width; `mount` fills the element
it is given (style only with `--vn-*` variables) and may return a disposable that runs when the
view is replaced or the panel unmounts. Typing in the focused panel calls `filter` with the
whole query, Up/Down call `move(-1 | 1)`, Enter calls `activate`.

## Properties

### kind

> **kind**: `"dom"`

Defined in: [index.ts:1141](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1141)

## Methods

### mount()

> **mount**(`element`): `void` \| [`Disposable`](Disposable.md)

Defined in: [index.ts:1142](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1142)

#### Parameters

##### element

`HTMLElement`

#### Returns

`void` \| [`Disposable`](Disposable.md)

***

### filter()?

> `optional` **filter**(`query`): `void`

Defined in: [index.ts:1143](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1143)

#### Parameters

##### query

`string`

#### Returns

`void`

***

### move()?

> `optional` **move**(`delta`): `void`

Defined in: [index.ts:1144](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1144)

#### Parameters

##### delta

`number`

#### Returns

`void`

***

### activate()?

> `optional` **activate**(): `void`

Defined in: [index.ts:1145](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1145)

#### Returns

`void`
