# Interface: SearchMatch

Defined in: [index.ts:245](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L245)

One project-search hit (FR-59, Story 2.10). `from`/`to` are offsets into the document's text
as the editor holds it (`\n` line endings, no BOM), ready for `workspace.open`'s `select`.
`line` is one-based. `snippet` is the hit's line, shortened around the hit (with `…` where
cut) and stripped of leading whitespace; `marks` are the hit's offsets within `snippet`.

## Properties

### from

> **from**: `number`

Defined in: [index.ts:246](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L246)

***

### to

> **to**: `number`

Defined in: [index.ts:247](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L247)

***

### line

> **line**: `number`

Defined in: [index.ts:248](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L248)

***

### snippet

> **snippet**: `string`

Defined in: [index.ts:249](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L249)

***

### marks

> **marks**: \[`number`, `number`\][]

Defined in: [index.ts:250](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L250)
