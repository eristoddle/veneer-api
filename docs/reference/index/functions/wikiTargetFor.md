# Function: wikiTargetFor()

> **wikiTargetFor**(`path`, `docPath`, `resolve`, `keepExtension?`): `string`

Defined in: [index.ts:469](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L469)

What to write inside `[[ ]]` to link `path` from `docPath`: the bare name when it resolves
back to that file, else the path. `.md` is left off unless `keepExtension`. Pure.

## Parameters

### path

`string`

### docPath

`string` \| `null`

### resolve

[`WikiResolver`](../type-aliases/WikiResolver.md)

### keepExtension?

`boolean` = `false`

## Returns

`string`

## Example

```ts
const resolve = createWikiResolver(['notes/a.md', 'b.md', 'notes/b.md'])
console.log(wikiTargetFor('notes/a.md', 'x.md', resolve)) // 'a' (only one file is named a)
console.log(wikiTargetFor('notes/b.md', 'x.md', resolve)) // 'notes/b' ('b' alone would find b.md)
```
