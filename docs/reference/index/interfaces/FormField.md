# Interface: FormField

Defined in: [index.ts:1317](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1317)

One typed field of a `FormView`.

## Properties

### id

> **id**: `string`

Defined in: [index.ts:1319](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1319)

Unique within the form; reaches `onFormChange` and the submit values.

***

### type

> **type**: [`FormFieldType`](../type-aliases/FormFieldType.md)

Defined in: [index.ts:1320](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1320)

***

### label

> **label**: `string`

Defined in: [index.ts:1321](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1321)

***

### hint?

> `optional` **hint?**: `string`

Defined in: [index.ts:1323](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1323)

A line under the field in the caption type.

***

### hintAction?

> `optional` **hintAction?**: `string`

Defined in: [index.ts:1328](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1328)

Makes the hint a link: clicking it reaches `api.surfaces.onAction` with this action ID (Story
13.3). Ignored without a `hint`.

***

### value

> **value**: [`FormValue`](../type-aliases/FormValue.md)

Defined in: [index.ts:1329](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1329)

***

### error?

> `optional` **error?**: `string`

Defined in: [index.ts:1331](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1331)

Shown under the field in the emphasis color; the plugin sets and clears it.

***

### options?

> `optional` **options?**: `object`[]

Defined in: [index.ts:1333](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1333)

The choices of a `choice` field.

#### value

> **value**: `string`

#### label

> **label**: `string`

***

### placeholder?

> `optional` **placeholder?**: `string`

Defined in: [index.ts:1334](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1334)
