# Function: datePatternProblem()

> **datePatternProblem**(`pattern`): `string` \| `null`

Defined in: [index.ts:884](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L884)

Why `pattern` (a path pattern holding `{{date:FORMAT}}` parts) can't be used, in a sentence
naming the token, or null when it can: a letter that is not a `formatDatePattern` token, or
`{{title}}`, which names no date. Added in 0.55.0.

## Parameters

### pattern

`string`

## Returns

`string` \| `null`

## Example

```ts
const problem = datePatternProblem('{{date:YYYY-MM-DD HH:ss}}.md')
console.log(problem) // 'The date token "ss" is not supported.'
```
