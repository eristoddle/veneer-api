# Type Alias: FormValue

> **FormValue** = `string` \| `number` \| `boolean` \| `string`[] \| `null`

Defined in: [index.ts:1958](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1958)

A form field's value: a string for `text`, `longtext`, `date`, and `choice` (a date is
`YYYY-MM-DD`); a number or null for `number`; a string array for `tags`; a boolean for `toggle`;
an API path or null for `document`.
