# Interface: VaultQuery

Defined in: [index.ts:276](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L276)

What `api.vault.query` asks of the project index (Story 9.27). Every given condition must hold.

## Properties

### frontmatter?

> `optional` **frontmatter?**: `Record`\<`string`, [`VaultQueryValue`](../type-aliases/VaultQueryValue.md)\>

Defined in: [index.ts:278](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L278)

Each key must equal the document's frontmatter value, or be in it when that value is a list.

***

### tag?

> `optional` **tag?**: `string`

Defined in: [index.ts:280](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L280)

A tag the document has, from frontmatter `tags` or an inline `#tag`; case-insensitive.

***

### linksTo?

> `optional` **linksTo?**: `string`

Defined in: [index.ts:282](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L282)

Keeps documents whose relative links include exactly this API path (a folder path matches nothing; `backlinks` also matches links into a folder).

***

### linkedFrom?

> `optional` **linkedFrom?**: `string`

Defined in: [index.ts:284](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L284)

Keeps documents that this API path links to.

***

### limit?

> `optional` **limit?**: `number`

Defined in: [index.ts:286](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L286)

At most this many results; default 200, capped at `MAX_QUERY_RESULTS`.
