# Interface: FormField

Defined in: [index.ts:1961](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1961)

One typed field of a `FormView`.

## Properties

### id

> **id**: `string`

Defined in: [index.ts:1963](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1963)

Unique within the form; reaches `onFormChange` and the submit values.

***

### type

> **type**: [`FormFieldType`](../type-aliases/FormFieldType.md)

Defined in: [index.ts:1964](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1964)

***

### label

> **label**: `string`

Defined in: [index.ts:1965](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1965)

***

### hint?

> `optional` **hint?**: `string`

Defined in: [index.ts:1967](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1967)

A line under the field in the caption type.

***

### hintAction?

> `optional` **hintAction?**: `string`

Defined in: [index.ts:1972](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1972)

Makes the hint a link: clicking it reaches `api.surfaces.onAction` with this action ID (Story
13.3). Ignored without a `hint`.

***

### value

> **value**: [`FormValue`](../type-aliases/FormValue.md)

Defined in: [index.ts:1973](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1973)

***

### error?

> `optional` **error?**: `string`

Defined in: [index.ts:1975](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1975)

Shown under the field in the emphasis color; the plugin sets and clears it.

***

### options?

> `optional` **options?**: `object`[]

Defined in: [index.ts:1977](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1977)

The choices of a `choice` field.

#### value

> **value**: `string`

#### label

> **label**: `string`

***

### placeholder?

> `optional` **placeholder?**: `string`

Defined in: [index.ts:1978](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1978)
