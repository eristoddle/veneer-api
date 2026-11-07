# Interface: FrontmatterAdvice

Defined in: [index.ts:2544](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2544)

One way a document's frontmatter differs from a project type's schema. Advice, never a rule.

## Properties

### key

> **key**: `string`

Defined in: [index.ts:2545](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2545)

***

### problem

> **problem**: `"missing"` \| `"wrong-type"`

Defined in: [index.ts:2546](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2546)

***

### message

> **message**: `string`

Defined in: [index.ts:2548](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2548)

A plain sentence, e.g. `Point of view is missing.`
