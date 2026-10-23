# Interface: ToolContribution

Defined in: [index.ts:1835](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1835)

A selection-box tool (FR-23, AD-5, AD-10). `id` is `<pluginId>:<name>`. Everything here comes
from the manifest; a handler attaches by ID with `api.tools.handle`.

## Properties

### id

> **id**: `string`

Defined in: [index.ts:1836](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1836)

***

### name

> **name**: `string`

Defined in: [index.ts:1837](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1837)

***

### description

> **description**: `string`

Defined in: [index.ts:1838](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1838)

***

### appliesTo

> **appliesTo**: (`"word"` \| `"phrase"` \| `"sentence"` \| `"paragraph"` \| `"any"`)[]

Defined in: [index.ts:1840](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1840)

The selection kinds it works on; never empty.

***

### worksWithoutSelection

> **worksWithoutSelection**: `boolean`

Defined in: [index.ts:1842](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1842)

Offered when nothing is selected (Cmd+J at the caret). Default false.

***

### needsProvider

> **needsProvider**: `boolean`

Defined in: [index.ts:1844](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1844)

Needs a configured model provider. Default false.

***

### context

> **context**: (`"paragraph"` \| `"document"` \| `"selection"` \| `"section"` \| `"title"` \| `"frontmatter"`)[]

Defined in: [index.ts:1846](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1846)

The context the kernel assembles for the handler; never empty. Default `['selection']`.

***

### readOnly

> **readOnly**: `boolean`

Defined in: [index.ts:1848](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1848)

Never changes the text by itself; results are for reading. Default false.
