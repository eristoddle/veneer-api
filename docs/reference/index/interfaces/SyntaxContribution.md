# Interface: SyntaxContribution

Defined in: [index.ts:1465](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1465)

A syntax contribution (Story 22.4, AD-5, AD-7): a pattern the editor draws in the page, so a
plugin can add markup (`#tags`, `%%comments%%`, `$math$`) without touching the editor. Declared
in `contributes.syntax`; the kernel runs the patterns over the lines in view, never inside code,
front matter, HTML, or comments the core draws, and only off the caret (the text under the caret
always shows as source). The text in the file never changes. A pattern that does not compile, or
is too slow on a test string, is dropped with a notice naming the plugin. Declare an activation
event (such as `app:started`) so the plugin is loaded before the page is drawn.

- `inline` matches within one line. `pattern` is a JavaScript regular expression source; the
  kernel sets the flags (`u`, with capture indices).
- `line` matches a whole line (anchor it with `^` and `$`).
- `block` spans lines: `pattern` matches the opening line and `end` the closing line (they may
  be the same line for a one-line span; a block that is never closed does not match).

`hide` lists capture groups (1 is the first) to hide off the caret. `token` colors the match
(`--vn-*`, or the plugin's own `--vnp-<pluginId>-*`). `look` picks a chip, faint, or superscript
dress. With `render: true` the plugin answers `api.editor.onRenderSyntax` with a `SyntaxView`
that replaces the match. A `callout` contribution adds a kind of callout (`> [!kind] Title`) the
core draws; it needs no `pattern`.

## Extended by

- [`SyntaxEntry`](SyntaxEntry.md)

## Properties

### id

> **id**: `string`

Defined in: [index.ts:1467](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1467)

The full contribution ID, `<pluginId>:<name>`.

***

### kind

> **kind**: `"inline"` \| `"line"` \| `"block"`

Defined in: [index.ts:1468](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1468)

***

### pattern?

> `optional` **pattern?**: `string`

Defined in: [index.ts:1470](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1470)

A JavaScript regular expression source; the opening pattern for a `block`. Not needed with `callout`.

***

### end?

> `optional` **end?**: `string`

Defined in: [index.ts:1472](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1472)

The closing pattern of a `block`.

***

### hide?

> `optional` **hide?**: `number`[]

Defined in: [index.ts:1474](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1474)

Capture groups to hide off the caret line.

***

### token?

> `optional` **token?**: `string`

Defined in: [index.ts:1476](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1476)

A `--vn-*` or `--vnp-<pluginId>-*` color token for the match.

***

### look?

> `optional` **look?**: [`SyntaxLook`](../type-aliases/SyntaxLook.md)

Defined in: [index.ts:1477](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1477)

***

### render?

> `optional` **render?**: `boolean`

Defined in: [index.ts:1479](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1479)

True when the plugin draws the match through `api.editor.onRenderSyntax`.

***

### callout?

> `optional` **callout?**: `object`

Defined in: [index.ts:1481](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1481)

A callout kind the core draws: its lower-case name, its label, and a `--vn-kind-*` tint token.

#### kind

> **kind**: `string`

#### label

> **label**: `string`

#### tint

> **tint**: `string`
