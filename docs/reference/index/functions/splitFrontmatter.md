# Function: splitFrontmatter()

> **splitFrontmatter**(`text`): [`FrontmatterSplit`](../interfaces/FrontmatterSplit.md)

Defined in: [index.ts:361](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L361)

Splits a document's frontmatter from its body exactly where the editor hides it: a first line
of `---`, closed by a `---` or `...` line within `FRONTMATTER_MAX_LINES` lines. Anything else
is all body. Pure; it never changes a byte, so joining the parts gives the text back. `text`
should use `\n` line endings, as `vault.read` and the editor give it.

## Parameters

### text

`string`

## Returns

[`FrontmatterSplit`](../interfaces/FrontmatterSplit.md)

## Example

```ts
const { yaml, body } = splitFrontmatter('---\ntitle: One\n---\n# Chapter One\n')
console.log(yaml) // 'title: One\n'
console.log(body) // '# Chapter One\n'
```
