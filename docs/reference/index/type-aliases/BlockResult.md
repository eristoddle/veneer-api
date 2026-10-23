# Type Alias: BlockResult

> **BlockResult** = \{ `kind`: `"tokens"`; `tokens`: [`BlockTokenSpan`](../interfaces/BlockTokenSpan.md)[]; \} \| \{ `kind`: `"html"`; `html`: `string`; \} \| \{ `kind`: `"svg"`; `svg`: `string`; \} \| `null`

Defined in: [index.ts:816](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L816)

What a renderer returns for a block (AD-19, AD-4): `tokens` colors the block's real text, which
stays editable; `html` replaces the block with a picture while the cursor is outside it, and
the kernel sanitizes it (AD-16) so a plugin never touches the page's DOM; `svg` does the same
for a drawing, through `api.resources.sanitizeSvg`, which keeps the styling an SVG needs (its
`<style>` and `style`, ids) and drops anything that could load or run; `null` leaves the block
plain. Invalid spans are dropped.
