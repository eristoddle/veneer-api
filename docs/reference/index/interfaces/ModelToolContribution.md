# Interface: ModelToolContribution

Defined in: [index.ts:4301](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4301)

One `contributes.modelTools` entry (Story 27.2, AD-5). `id` is `<pluginId>:<name>`; `name` is
what the permission question shows ("Let the model use <plugin>: <name>?"); `description`
tells the model when to use it; `parameters` is a small JSON schema (an object with string and
number properties).

## Properties

### id

> **id**: `string`

Defined in: [index.ts:4302](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4302)

***

### name

> **name**: `string`

Defined in: [index.ts:4303](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4303)

***

### description

> **description**: `string`

Defined in: [index.ts:4304](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4304)

***

### parameters

> **parameters**: `object`

Defined in: [index.ts:4305](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4305)

#### type

> **type**: `"object"`

#### properties

> **properties**: `Record`\<`string`, \{ `type`: `"string"` \| `"number"`; `description?`: `string`; \}\>

#### required?

> `optional` **required?**: `string`[]
