# Type Alias: FormValue

> **FormValue** = `string` \| `number` \| `boolean` \| `string`[] \| `null`

Defined in: [index.ts:1169](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1169)

A form field's value: a string for `text`, `longtext`, `date`, and `choice` (a date is
`YYYY-MM-DD`); a number or null for `number`; a string array for `tags`; a boolean for `toggle`;
an API path or null for `document`.
