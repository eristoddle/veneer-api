# Interface: ImageDestination

Defined in: [index.ts:2491](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2491)

A folder a plugin picks for an image (Story 17.2). `folder` is relative, with `/` separators,
under `base`: `'project'` is the project root; `'site'` is the project's site root, and the
link is written in site-root form (`/images/2026/x.png`). Main checks that the folder stays
inside that base (AD-6); a folder outside it is refused with a notice and the image is saved
the usual way.

## Properties

### folder

> **folder**: `string`

Defined in: [index.ts:2492](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2492)

***

### base

> **base**: `"project"` \| `"site"`

Defined in: [index.ts:2493](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2493)
