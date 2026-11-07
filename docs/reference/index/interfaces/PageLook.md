# Interface: PageLook

Defined in: [index.ts:4854](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4854)

A look for the page set with `api.workspace.setPageLook` (Story 28.3).

## Properties

### font?

> `optional` **font?**: `string`

Defined in: [index.ts:4856](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4856)

A family from this plugin's `contributes.fonts`; applies to the page's body text only.

***

### tint?

> `optional` **tint?**: `string`

Defined in: [index.ts:4858](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4858)

A color blended over the page at a fixed 12%, so text contrast stays the theme's.

***

### transitionMs?

> `optional` **transitionMs?**: `number`

Defined in: [index.ts:4860](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4860)

How long the tint takes to change, in milliseconds (0 to 20000, default 0).
