# Interface: WikiParts

Defined in: [index.ts:375](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L375)

The pieces of a wikilink (`[[note#Heading|shown text]]`) as `parseWikiInner` reads them.
`target` is the note name or path as written, trimmed (empty for a same-document
`[[#Heading]]`); `heading` and `alias` are null when absent.

## Properties

### target

> **target**: `string`

Defined in: [index.ts:376](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L376)

***

### heading

> **heading**: `string` \| `null`

Defined in: [index.ts:377](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L377)

***

### alias

> **alias**: `string` \| `null`

Defined in: [index.ts:378](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L378)
