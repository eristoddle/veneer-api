# Interface: ToolContribution

Defined in: [index.ts:2003](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2003)

A selection-box tool (FR-23, AD-5, AD-10). `id` is `<pluginId>:<name>`. Everything here comes
from the manifest; a handler attaches by ID with `api.tools.handle`.

## Properties

### id

> **id**: `string`

Defined in: [index.ts:2004](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2004)

***

### name

> **name**: `string`

Defined in: [index.ts:2005](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2005)

***

### description

> **description**: `string`

Defined in: [index.ts:2006](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2006)

***

### appliesTo

> **appliesTo**: (`"word"` \| `"phrase"` \| `"sentence"` \| `"paragraph"` \| `"any"`)[]

Defined in: [index.ts:2008](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2008)

The selection kinds it works on; never empty.

***

### worksWithoutSelection

> **worksWithoutSelection**: `boolean`

Defined in: [index.ts:2010](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2010)

Offered when nothing is selected (Cmd+J at the caret). Default false.

***

### needsProvider

> **needsProvider**: `boolean`

Defined in: [index.ts:2012](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2012)

Needs a configured model provider. Default false.

***

### context

> **context**: (`"paragraph"` \| `"document"` \| `"selection"` \| `"section"` \| `"title"` \| `"frontmatter"`)[]

Defined in: [index.ts:2014](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2014)

The context the kernel assembles for the handler; never empty. Default `['selection']`.

***

### readOnly

> **readOnly**: `boolean`

Defined in: [index.ts:2016](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2016)

Never changes the text by itself; results are for reading. Default false.
