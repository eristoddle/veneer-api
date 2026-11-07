# Interface: ProjectTypeContribution

Defined in: [index.ts:2433](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2433)

A kind of project a plugin offers (FR-36, AD-13). The ID is `<pluginId>/<typeId>`. A project has
exactly one type; the schema covers frontmatter fields and default settings only, and only
advises. `extends` names another type (of this or any plugin): the child inherits its
frontmatter fields and default settings, and satisfies a `requiredProjectType` of the parent.

## Properties

### id

> **id**: `string`

Defined in: [index.ts:2434](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2434)

***

### name

> **name**: `string`

Defined in: [index.ts:2435](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2435)

***

### description?

> `optional` **description?**: `string`

Defined in: [index.ts:2436](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2436)

***

### extends?

> `optional` **extends?**: `string`

Defined in: [index.ts:2437](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2437)

***

### frontmatter?

> `optional` **frontmatter?**: [`FrontmatterField`](FrontmatterField.md)[]

Defined in: [index.ts:2438](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2438)

***

### settings?

> `optional` **settings?**: `Record`\<`string`, [`SettingValue`](../type-aliases/SettingValue.md)\>

Defined in: [index.ts:2440](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2440)

Default values for declared settings, by setting ID, while a project has this type.

***

### homePanel?

> `optional` **homePanel?**: `string`

Defined in: [index.ts:2448](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2448)

The surface ID of the panel that is this type's home (Epic 20): when a project of the type
opens, the left sidebar shows it in place of Files (Files stays one click away in the
switcher). Any plugin's surface, as long as it is a project panel (`scope: "project"`) or sits
on the left; anything else is ignored. A child type inherits it unless it names its own. The
writer can set a project's home back to Files in Settings.

***

### templates?

> `optional` **templates?**: [`DocumentTemplate`](DocumentTemplate.md)[]

Defined in: [index.ts:2450](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2450)

Documents this type can make from New Document (Epic 20).

***

### folders?

> `optional` **folders?**: `string`[]

Defined in: [index.ts:2455](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2455)

Project-relative folders the type expects (at most 20, no `..`). When the type is assigned,
the writer is asked once whether to create the missing ones; nothing else checks them.

***

### detect?

> `optional` **detect?**: [`ProjectTypeDetect`](ProjectTypeDetect.md)

Defined in: [index.ts:2457](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2457)

How the type recognizes a folder it fits.

***

### cards?

> `optional` **cards?**: [`ProjectTypeCards`](ProjectTypeCards.md)

Defined in: [index.ts:2462](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2462)

How Files cards are filled for this type, and which folders show as cards (Story 29.4). A
child type inherits this and overrides it per key. The writer can swap any slot.

***

### chatTranscripts?

> `optional` **chatTranscripts?**: [`ProjectTypeChatTranscripts`](ProjectTypeChatTranscripts.md)

Defined in: [index.ts:2472](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2472)

Lets a saved chat become one of this type's documents (the diary type: today's entry). Save
then offers "Save as today's entry" first, filled through `template`. A child type inherits
it. Added in 0.59.0.

#### Example

```ts
// manifest.json, in a project type: { "id": "notes/daily", "name": "Daily", "templates": [{ "id": "chat", "name": "Chat", "pattern": "{{date:YYYY-MM-DD}}.md", "body": "# {{date:LL}}\n\n## Chat\n\n" }], "chatTranscripts": { "template": "chat" } }
const transcripts: ProjectTypeChatTranscripts = { template: 'chat' }
```
