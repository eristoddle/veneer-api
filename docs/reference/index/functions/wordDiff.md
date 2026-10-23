# Function: wordDiff()

> **wordDiff**(`before`, `after`): [`WordDiffSegment`](../interfaces/WordDiffSegment.md)[]

Defined in: [index.ts:602](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L602)

A word-by-word diff of two texts, for compare views (a history plugin showing what changed
between versions). Returns segments in order: joining every `equal` and `delete` gives
`before` back exactly, and every `equal` and `insert` gives `after`.

A word is a run of non-space characters, punctuation included, so `text.` becoming
`text, indeed.` is one deletion and one insertion. Spaces between two changes on a line join
them into one change, and inside a change the deletion always comes before the insertion.
Lines are compared first and words only inside changed lines, so 100,000-word documents
finish well within a second; a changed stretch too long or too different to compare word by
word comes back as one deletion and one insertion. A pure function; it never throws.

This ports the word level of GitWrite's `get_word_level_diff`, with one difference: GitWrite
shows a changed line pair under 60% similar as whole lines, while `wordDiff` still shows the
words the two share (`final word` → `final change` keeps `final ` as equal).

## Parameters

### before

`string`

### after

`string`

## Returns

[`WordDiffSegment`](../interfaces/WordDiffSegment.md)[]

## Example

```ts
const segments = wordDiff('The old line of text.', 'The new line of text, indeed.')
const added = segments.filter((s) => s.kind === 'insert').map((s) => s.text)
console.log(added) // ['new', 'text, indeed.']
```
