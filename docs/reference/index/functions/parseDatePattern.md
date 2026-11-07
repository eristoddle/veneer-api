# Function: parseDatePattern()

> **parseDatePattern**(`pattern`, `path`): `string` \| `null`

Defined in: [index.ts:909](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L909)

Reads the date a path stands for: the inverse of writing `pattern` (parts like
`{{date:YYYY}}/{{date:YYYY-MM-DD}}.md`) with `formatDatePattern`. Resolves an ISO date
(`2026-11-03`) when the whole path fits the pattern, names a real day (not February 30), and
every part that names the same thing agrees (the year in the folder and in the file name), or
null. Needs a year, a month, and a day among the tokens. A pure function; it never throws.
Added in 0.55.0.

## Parameters

### pattern

`string`

### path

`string`

## Returns

`string` \| `null`

## Example

```ts
const date = parseDatePattern('{{date:YYYY}}/{{date:YYYY-MM-DD}}.md', '2026/2026-11-03.md')
console.log(date) // '2026-11-03'
```
