# Function: formatDatePattern()

> **formatDatePattern**(`format`, `date`): `string`

Defined in: [index.ts:833](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L833)

Writes `date` in a moment-style `format` (what Obsidian's daily notes use), in English. The
tokens are `YYYY`, `YY`, `MMMM` (November), `MMM` (Nov), `MM`, `M`, `DD`, `D`, `dddd`
(Monday), `ddd` (Mon), `HH`, and `mm`; text in `[square brackets]` is written as it is, and
every other character is literal. A pure function; it never throws. Added in 0.55.0.

## Parameters

### format

`string`

### date

`Date`

## Returns

`string`

## Example

```ts
const day = formatDatePattern('dddd, MMMM D, YYYY', new Date(2026, 10, 3))
console.log(day) // 'Tuesday, November 3, 2026'
```
