# Interface: FrontmatterAdvice

Defined in: [index.ts:1593](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1593)

One way a document's frontmatter differs from a project type's schema. Advice, never a rule.

## Properties

### key

> **key**: `string`

Defined in: [index.ts:1594](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1594)

***

### problem

> **problem**: `"missing"` \| `"wrong-type"`

Defined in: [index.ts:1595](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1595)

***

### message

> **message**: `string`

Defined in: [index.ts:1597](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1597)

A plain sentence, e.g. `Point of view is missing.`
