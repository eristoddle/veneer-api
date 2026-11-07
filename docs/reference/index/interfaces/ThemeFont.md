# Interface: ThemeFont

Defined in: [index.ts:2737](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2737)

A font a theme names (Epic 19, 0.48.0). `family` is the CSS family name; `files` are font files
inside the package (`.woff2`, `.woff`, `.ttf`, or `.otf`) the kernel loads under a name private
to the theme.

## Example

```ts
const font: ThemeFont = {
  family: 'Literata',
  files: [{ path: 'fonts/literata.woff2', weight: 400, style: 'normal' }]
}
```

## Properties

### family

> **family**: `string`

Defined in: [index.ts:2738](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2738)

***

### files?

> `optional` **files?**: `object`[]

Defined in: [index.ts:2739](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2739)

#### path

> **path**: `string`

#### weight?

> `optional` **weight?**: `string` \| `number`

#### style?

> `optional` **style?**: `"normal"` \| `"italic"`
