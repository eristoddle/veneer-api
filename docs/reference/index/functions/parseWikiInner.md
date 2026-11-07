# Function: parseWikiInner()

> **parseWikiInner**(`inner`): [`WikiParts`](../interfaces/WikiParts.md)

Defined in: [index.ts:390](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L390)

Reads the text between `[[` and `]]` into its target, heading, and alias. Pure.

## Parameters

### inner

`string`

## Returns

[`WikiParts`](../interfaces/WikiParts.md)

## Example

```ts
const { target, heading, alias } = parseWikiInner('chapters/one#Opening|the start')
console.log(target, heading, alias) // 'chapters/one' 'Opening' 'the start'
```
