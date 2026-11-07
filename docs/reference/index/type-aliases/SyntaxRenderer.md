# Type Alias: SyntaxRenderer

> **SyntaxRenderer** = (`match`, `signal`) => [`SyntaxView`](SyntaxView.md) \| `Promise`\<[`SyntaxView`](SyntaxView.md)\>

Defined in: [index.ts:1508](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1508)

A handler that draws a rendered syntax match. A throw or a timeout leaves the styled text.

## Parameters

### match

[`SyntaxMatch`](../interfaces/SyntaxMatch.md)

### signal

`AbortSignal`

## Returns

[`SyntaxView`](SyntaxView.md) \| `Promise`\<[`SyntaxView`](SyntaxView.md)\>
