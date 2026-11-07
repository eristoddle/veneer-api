# Type Alias: SyntaxView

> **SyntaxView** = \{ `kind`: `"text"`; `text`: `string`; `title?`: `string`; `look?`: [`SyntaxLook`](SyntaxLook.md); \} \| \{ `kind`: `"html"`; `html`: `string`; `title?`: `string`; \} \| \{ `kind`: `"svg"`; `svg`: `string`; `title?`: `string`; \} \| \{ `kind`: `"image"`; `path`: `string`; `width?`: `number`; `title?`: `string`; \} \| `null`

Defined in: [index.ts:1500](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1500)

What `api.editor.onRenderSyntax` returns, drawn by the kernel (AD-4, AD-16): `text` plain text,
`html` and `svg` through the kernel's sanitizers, `image` a document image by project-relative
path (optionally at `width` pixels). `title` is a hover tip; `look` dresses a text view.
`null` leaves the match as styled text.
