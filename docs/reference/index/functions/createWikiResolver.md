# Function: createWikiResolver()

> **createWikiResolver**(`paths`): [`WikiResolver`](../type-aliases/WikiResolver.md)

Defined in: [index.ts:422](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L422)

A wikilink resolver over `paths` (the project's file paths, as `api.vault.list` gives them),
with Obsidian's rule simplified: a target with a `/` is a project-relative path (`.md` added
when missing); a bare name matches a file of that name anywhere, preferring the document's own
folder, then the shortest path, then alphabetical. Case-insensitive. Pure.

## Parameters

### paths

readonly `string`[]

## Returns

[`WikiResolver`](../type-aliases/WikiResolver.md)

## Example

```ts
const resolve = createWikiResolver(['notes/a.md', 'b.md', 'notes/b.md'])
console.log(resolve('notes/a.md', 'b')) // 'notes/b.md' (same folder wins)
console.log(resolve('x.md', 'b')) // 'b.md' (shortest path)
console.log(resolve('x.md', 'missing')) // null
```
