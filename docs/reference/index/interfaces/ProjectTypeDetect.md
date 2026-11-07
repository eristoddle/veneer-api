# Interface: ProjectTypeDetect

Defined in: [index.ts:2417](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2417)

Rules for a type to suggest itself for an untyped folder (Epic 20). Either part matching is a match.

## Properties

### exists?

> `optional` **exists?**: `string`[]

Defined in: [index.ts:2419](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2419)

Project-relative paths; any one present matches.

***

### names?

> `optional` **names?**: `object`

Defined in: [index.ts:2424](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2424)

File names at the top of the project. `pattern` is `{{date:FORMAT}}` or a glob using only
`*`; `share` (default 0.6) of the markdown files must match, and at least 3 must exist.

#### pattern

> **pattern**: `string`

#### share?

> `optional` **share?**: `number`
