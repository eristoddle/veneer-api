# Type Alias: FormValue

> **FormValue** = `string` \| `number` \| `boolean` \| `string`[] \| `null`

Defined in: [index.ts:1314](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1314)

A form field's value: a string for `text`, `longtext`, `date`, and `choice` (a date is
`YYYY-MM-DD`); a number or null for `number`; a string array for `tags`; a boolean for `toggle`;
an API path or null for `document`.
