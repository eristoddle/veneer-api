# Interface: CreateFromTemplateOptions

Defined in: [index.ts:1029](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1029)

Options for `api.workspace.createFromTemplate`.

## Properties

### title?

> `optional` **title?**: `string`

Defined in: [index.ts:1031](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1031)

Fills `{{title}}`; without it the writer is asked when the template needs one.

***

### date?

> `optional` **date?**: `string`

Defined in: [index.ts:1036](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1036)

An ISO date (`2026-11-03`) for the pattern's and body's `{{date:FORMAT}}` parts; today when
left out. Added in 0.55.0.

***

### lazy?

> `optional` **lazy?**: `boolean`

Defined in: [index.ts:1043](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1043)

When no file is at the path, opens a page holding the rendered text and writes nothing: the
file is made on the writer's first change (a typed key, a paste, a Properties edit, a result
applied from the selection box). Closing the page untouched leaves no file, no Files entry,
and no `vault:created` event. Added in 0.55.0.

***

### pattern?

> `optional` **pattern?**: `string`

Defined in: [index.ts:1049](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1049)

Replaces the template's name pattern for this one call, with the same `{{date:FORMAT}}`
parts and `/` for folders (a plugin that follows the writer's own layout). Must end in
`.md`; rejects `workspace/bad-pattern` otherwise. Added in 0.55.0.

***

### body?

> `optional` **body?**: `string`

Defined in: [index.ts:1054](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1054)

Replaces the template's body for this one call (up to 100 KB). `{{date:FORMAT}}` and
`{{title}}` in it are still filled. Added in 0.55.0.
