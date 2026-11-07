# Function: findInText()

> **findInText**(`text`, `query`, `max?`): [`SearchMatch`](../interfaces/SearchMatch.md)[]

Defined in: [index.ts:323](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L323)

Project search's matching (FR-59), the same as the editor's find: case-insensitive, literal,
non-overlapping substrings over the whole text, frontmatter included. Returns at most `max`
hits with snippets (see `SearchMatch`). `text` must already use `\n` line endings.

## Parameters

### text

`string`

### query

`string`

### max?

`number` = `MAX_SEARCH_MATCHES`

## Returns

[`SearchMatch`](../interfaces/SearchMatch.md)[]

## Example

```ts
const hits = findInText('A dark and stormy night.', 'stormy')
console.log(hits[0].snippet)
```
