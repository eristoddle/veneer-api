# Interface: ToolContribution

Defined in: [index.ts:2859](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2859)

A selection-box tool (FR-23, AD-5, AD-10). `id` is `<pluginId>:<name>`. Everything here comes
from the manifest; a handler attaches by ID with `api.tools.handle`.

## Properties

### id

> **id**: `string`

Defined in: [index.ts:2860](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2860)

***

### name

> **name**: `string`

Defined in: [index.ts:2861](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2861)

***

### description

> **description**: `string`

Defined in: [index.ts:2862](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2862)

***

### keywords?

> `optional` **keywords?**: `string`[]

Defined in: [index.ts:2864](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2864)

Extra words the palette and the `/` list match as if they were in the name (Story 18.4).

***

### appliesTo

> **appliesTo**: (`"word"` \| `"phrase"` \| `"sentence"` \| `"paragraph"` \| `"any"`)[]

Defined in: [index.ts:2866](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2866)

The selection kinds it works on; never empty.

***

### worksWithoutSelection

> **worksWithoutSelection**: `boolean`

Defined in: [index.ts:2868](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2868)

Offered when nothing is selected (Cmd+J at the caret). Default false.

***

### needsProvider

> **needsProvider**: `boolean`

Defined in: [index.ts:2870](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2870)

Needs a configured model provider. Default false.

***

### context

> **context**: (`"paragraph"` \| `"document"` \| `"selection"` \| `"section"` \| `"title"` \| `"frontmatter"`)[]

Defined in: [index.ts:2872](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2872)

The context the kernel assembles for the handler; never empty. Default `['selection']`.

***

### readOnly

> **readOnly**: `boolean`

Defined in: [index.ts:2874](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2874)

Never changes the text by itself; results are for reading. Default false.

***

### canAskModel?

> `optional` **canAskModel?**: `boolean`

Defined in: [index.ts:2881](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2881)

The tool works without a model, but its handler may ask `api.providers` for more when the
writer picks the Result's `more` row. Unlike `needsProvider`, the tool stays available while
AI features are off (the handler's model call is refused then, and the kernel only draws
the `more` row when they are on). Default false.
