# Type Alias: BlockResult

> **BlockResult** = \{ `kind`: `"tokens"`; `tokens`: [`BlockTokenSpan`](../interfaces/BlockTokenSpan.md)[]; \} \| \{ `kind`: `"html"`; `html`: `string`; \} \| \{ `kind`: `"svg"`; `svg`: `string`; \} \| `null`

Defined in: [index.ts:1410](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1410)

What a renderer returns for a block (AD-19, AD-4): `tokens` colors the block's real text, which
stays editable; `html` replaces the block with a picture while the cursor is outside it, and
the kernel sanitizes it (AD-16) so a plugin never touches the page's DOM; `svg` does the same
for a drawing, through `api.resources.sanitizeSvg`, which keeps the styling an SVG needs (its
`<style>` and `style`, ids) and drops anything that could load or run; `null` leaves the block
plain. Invalid spans are dropped.
