# Function: adviseFrontmatter()

> **adviseFrontmatter**(`frontmatter`, `fields`): [`FrontmatterAdvice`](../interfaces/FrontmatterAdvice.md)[]

Defined in: [index.ts:1640](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1640)

Compares a document's frontmatter text (what sits between the `---` lines, or null for none)
to a project type's fields (FR-37, AD-13). It only advises: it returns sentences and never
throws, blocks a save, or changes a document. A required field that is absent, or a field
present with the wrong kind of value, is reported; an optional absent field is not. It reads
plain `key: value` lines and `- item` lists, which is what a type's fields describe.

## Parameters

### frontmatter

`string` \| `null`

### fields

readonly [`FrontmatterField`](../interfaces/FrontmatterField.md)[]

## Returns

[`FrontmatterAdvice`](../interfaces/FrontmatterAdvice.md)[]

## Example

```ts
const advice = adviseFrontmatter('chapter: three', [
  { key: 'pov', type: 'text', required: true },
  { key: 'chapter', type: 'number' }
])
console.log(advice.map((a) => a.message))
```
