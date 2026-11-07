# Interface: DomView

Defined in: [index.ts:1929](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1929)

The raw-DOM escape hatch (AD-4). @unstable: may change or go away in any minor version.
The kernel still owns the frame, tabs, Esc, open/close, and width; `mount` fills the element
it is given (style only with `--vn-*` variables) and may return a disposable that runs when the
view is replaced or the panel unmounts. Typing in the focused panel calls `filter` with the
whole query, Up/Down call `move(-1 | 1)`, Enter calls `activate`.

## Properties

### kind

> **kind**: `"dom"`

Defined in: [index.ts:1930](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1930)

## Methods

### mount()

> **mount**(`element`): `void` \| [`Disposable`](Disposable.md)

Defined in: [index.ts:1931](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1931)

#### Parameters

##### element

`HTMLElement`

#### Returns

`void` \| [`Disposable`](Disposable.md)

***

### filter()?

> `optional` **filter**(`query`): `void`

Defined in: [index.ts:1932](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1932)

#### Parameters

##### query

`string`

#### Returns

`void`

***

### move()?

> `optional` **move**(`delta`): `void`

Defined in: [index.ts:1933](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1933)

#### Parameters

##### delta

`number`

#### Returns

`void`

***

### activate()?

> `optional` **activate**(): `void`

Defined in: [index.ts:1934](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1934)

#### Returns

`void`
