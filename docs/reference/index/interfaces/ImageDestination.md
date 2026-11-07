# Interface: ImageDestination

Defined in: [index.ts:3409](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L3409)

A folder a plugin picks for an image (Story 17.2). `folder` is relative, with `/` separators,
under `base`: `'project'` is the project root; `'site'` is the project's site root, and the
link is written in site-root form (`/images/2026/x.png`). Main checks that the folder stays
inside that base (AD-6); a folder outside it is refused with a notice and the image is saved
the usual way.

## Properties

### folder

> **folder**: `string`

Defined in: [index.ts:3410](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L3410)

***

### base

> **base**: `"project"` \| `"site"`

Defined in: [index.ts:3411](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L3411)
