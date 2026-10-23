# Interface: FormField

Defined in: [index.ts:1172](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1172)

One typed field of a `FormView`.

## Properties

### id

> **id**: `string`

Defined in: [index.ts:1174](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1174)

Unique within the form; reaches `onFormChange` and the submit values.

***

### type

> **type**: [`FormFieldType`](../type-aliases/FormFieldType.md)

Defined in: [index.ts:1175](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1175)

***

### label

> **label**: `string`

Defined in: [index.ts:1176](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1176)

***

### hint?

> `optional` **hint?**: `string`

Defined in: [index.ts:1178](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1178)

A line under the field in the caption type.

***

### value

> **value**: [`FormValue`](../type-aliases/FormValue.md)

Defined in: [index.ts:1179](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1179)

***

### error?

> `optional` **error?**: `string`

Defined in: [index.ts:1181](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1181)

Shown under the field in the emphasis color; the plugin sets and clears it.

***

### options?

> `optional` **options?**: `object`[]

Defined in: [index.ts:1183](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1183)

The choices of a `choice` field.

#### value

> **value**: `string`

#### label

> **label**: `string`

***

### placeholder?

> `optional` **placeholder?**: `string`

Defined in: [index.ts:1184](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1184)
