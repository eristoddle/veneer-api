# Interface: GridPickOptions

Defined in: [index.ts:1296](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1296)

Where and how `api.workspace.pickGrid` opens (Story 11.8).

## Properties

### anchor?

> `optional` **anchor?**: `object`

Defined in: [index.ts:1301](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1301)

Window coordinates, in CSS pixels (such as an editor's caret position), the picker opens
beside. Without it the picker opens near the top centre of the page.

#### x

> **x**: `number`

#### y

> **y**: `number`

***

### rows?

> `optional` **rows?**: `number`

Defined in: [index.ts:1303](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1303)

Cells the grid starts with, 1 to 10 each; the default is 6 by 6. It grows toward 10 by 10.

***

### cols?

> `optional` **cols?**: `number`

Defined in: [index.ts:1304](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1304)
