# Interface: VaultQueryEntry

Defined in: [index.ts:290](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L290)

One document the index answered with.

## Properties

### path

> **path**: `string`

Defined in: [index.ts:292](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L292)

The document's API path.

***

### frontmatter

> **frontmatter**: `Record`\<`string`, `unknown`\>

Defined in: [index.ts:294](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L294)

Its YAML frontmatter as an object; empty without one.

***

### tags

> **tags**: `string`[]

Defined in: [index.ts:296](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L296)

Its tags, without the `#`.

***

### links

> **links**: `string`[]

Defined in: [index.ts:298](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L298)

The API paths its relative links and images point to, each once.
