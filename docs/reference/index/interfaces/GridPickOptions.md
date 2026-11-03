# Interface: GridPickOptions

Defined in: [index.ts:817](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L817)

Where and how `api.workspace.pickGrid` opens (Story 11.8).

## Properties

### anchor?

> `optional` **anchor?**: `object`

Defined in: [index.ts:822](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L822)

Window coordinates, in CSS pixels (such as an editor's caret position), the picker opens
beside. Without it the picker opens near the top centre of the page.

#### x

> **x**: `number`

#### y

> **y**: `number`

***

### rows?

> `optional` **rows?**: `number`

Defined in: [index.ts:824](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L824)

Cells the grid starts with, 1 to 10 each; the default is 6 by 6. It grows toward 10 by 10.

***

### cols?

> `optional` **cols?**: `number`

Defined in: [index.ts:825](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L825)
