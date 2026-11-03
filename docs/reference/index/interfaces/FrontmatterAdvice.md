# Interface: FrontmatterAdvice

Defined in: [index.ts:1747](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1747)

One way a document's frontmatter differs from a project type's schema. Advice, never a rule.

## Properties

### key

> **key**: `string`

Defined in: [index.ts:1748](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1748)

***

### problem

> **problem**: `"missing"` \| `"wrong-type"`

Defined in: [index.ts:1749](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1749)

***

### message

> **message**: `string`

Defined in: [index.ts:1751](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1751)

A plain sentence, e.g. `Point of view is missing.`
