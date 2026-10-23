# Interface: VaultQuery

Defined in: [index.ts:254](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L254)

What `api.vault.query` asks of the project index (Story 9.27). Every given condition must hold.

## Properties

### frontmatter?

> `optional` **frontmatter?**: `Record`\<`string`, [`VaultQueryValue`](../type-aliases/VaultQueryValue.md)\>

Defined in: [index.ts:256](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L256)

Each key must equal the document's frontmatter value, or be in it when that value is a list.

***

### tag?

> `optional` **tag?**: `string`

Defined in: [index.ts:258](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L258)

A tag the document has, from frontmatter `tags` or an inline `#tag`; case-insensitive.

***

### linksTo?

> `optional` **linksTo?**: `string`

Defined in: [index.ts:260](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L260)

Keeps documents whose relative links include exactly this API path (a folder path matches nothing; `backlinks` also matches links into a folder).

***

### linkedFrom?

> `optional` **linkedFrom?**: `string`

Defined in: [index.ts:262](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L262)

Keeps documents that this API path links to.

***

### limit?

> `optional` **limit?**: `number`

Defined in: [index.ts:264](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L264)

At most this many results; default 200, capped at `MAX_QUERY_RESULTS`.
