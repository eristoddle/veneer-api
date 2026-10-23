# Function: findInText()

> **findInText**(`text`, `query`, `max?`): [`SearchMatch`](../interfaces/SearchMatch.md)[]

Defined in: [index.ts:301](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L301)

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
