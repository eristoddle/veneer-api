# Interface: SearchMatch

Defined in: [index.ts:226](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L226)

One project-search hit (FR-59, Story 2.10). `from`/`to` are offsets into the document's text
as the editor holds it (`\n` line endings, no BOM), ready for `workspace.open`'s `select`.
`line` is one-based. `snippet` is the hit's line, shortened around the hit (with `…` where
cut) and stripped of leading whitespace; `marks` are the hit's offsets within `snippet`.

## Properties

### from

> **from**: `number`

Defined in: [index.ts:227](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L227)

***

### to

> **to**: `number`

Defined in: [index.ts:228](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L228)

***

### line

> **line**: `number`

Defined in: [index.ts:229](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L229)

***

### snippet

> **snippet**: `string`

Defined in: [index.ts:230](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L230)

***

### marks

> **marks**: \[`number`, `number`\][]

Defined in: [index.ts:231](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L231)
