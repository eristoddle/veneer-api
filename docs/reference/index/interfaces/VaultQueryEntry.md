# Interface: VaultQueryEntry

Defined in: [index.ts:268](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L268)

One document the index answered with.

## Properties

### path

> **path**: `string`

Defined in: [index.ts:270](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L270)

The document's API path.

***

### frontmatter

> **frontmatter**: `Record`\<`string`, `unknown`\>

Defined in: [index.ts:272](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L272)

Its YAML frontmatter as an object; empty without one.

***

### tags

> **tags**: `string`[]

Defined in: [index.ts:274](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L274)

Its tags, without the `#`.

***

### links

> **links**: `string`[]

Defined in: [index.ts:276](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L276)

The API paths its relative links and images point to, each once.
