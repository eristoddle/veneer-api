# Interface: SyntaxMatch

Defined in: [index.ts:1485](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1485)

What a syntax handler is given: the matched text and its capture groups (`''` for an unmatched group).

## Properties

### text

> **text**: `string`

Defined in: [index.ts:1487](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1487)

The whole match, as written.

***

### groups

> **groups**: `string`[]

Defined in: [index.ts:1489](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1489)

The capture groups, in order.

***

### theme

> **theme**: `"light"` \| `"dark"`

Defined in: [index.ts:1491](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1491)

Which Veneer theme is showing.
