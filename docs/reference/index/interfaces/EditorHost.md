# Interface: EditorHost

Defined in: [index.ts:2027](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2027)

The kernel's only route to the editor (AD-18). The editor plugin registers a factory; the
kernel calls it once with the mount and talks to the result through these methods only.
Later stories add coordinates.

## Methods

### getFind()

> **getFind**(): [`EditorFindSnapshot`](EditorFindSnapshot.md)

Defined in: [index.ts:2028](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2028)

#### Returns

[`EditorFindSnapshot`](EditorFindSnapshot.md)

***

### onFindChanged()

> **onFindChanged**(`listener`): [`Disposable`](Disposable.md)

Defined in: [index.ts:2029](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2029)

#### Parameters

##### listener

(`snapshot`) => `void`

#### Returns

[`Disposable`](Disposable.md)

***

### setFindQuery()

> **setFindQuery**(`query`): `void`

Defined in: [index.ts:2031](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2031)

Selects the first non-overlapping match at/after the caret, wrapping; origin `find`.

#### Parameters

##### query

`string`

#### Returns

`void`

***

### findNext()

> **findNext**(`backwards?`): `void`

Defined in: [index.ts:2032](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2032)

#### Parameters

##### backwards?

`boolean`

#### Returns

`void`

***

### clearFind()

> **clearFind**(): `void`

Defined in: [index.ts:2034](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2034)

Removes highlights without changing text, selection, or undo history.

#### Returns

`void`

***

### replaceFind()

> **replaceFind**(`text`): `void`

Defined in: [index.ts:2036](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2036)

One isolated undo step; refuses read-only writes. Current replacement skips inserted text.

#### Parameters

##### text

`string`

#### Returns

`void`

***

### replaceAllFind()

> **replaceAllFind**(`text`): `void`

Defined in: [index.ts:2037](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2037)

#### Parameters

##### text

`string`

#### Returns

`void`

***

### setDocument()

> **setDocument**(`text`): `void`

Defined in: [index.ts:2039](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2039)

Replaces the whole document with `text` (`\n` line endings) and resets undo history.

#### Parameters

##### text

`string`

#### Returns

`void`

***

### getText()

> **getText**(): `string`

Defined in: [index.ts:2040](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2040)

#### Returns

`string`

***

### getSelection()

> **getSelection**(): [`EditorSelection`](EditorSelection.md)

Defined in: [index.ts:2041](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2041)

#### Returns

[`EditorSelection`](EditorSelection.md)

***

### select()

> **select**(`from`, `to`): `void`

Defined in: [index.ts:2047](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2047)

Selects `from`..`to` (clamped to the text) with origin `find`, so the selection pill never
rises, and scrolls it into view, revealing hidden source it touches like a find match
(Story 2.10). Text and undo history are untouched.

#### Parameters

##### from

`number`

##### to

`number`

#### Returns

`void`

***

### onSelectionChanged()

> **onSelectionChanged**(`listener`): [`Disposable`](Disposable.md)

Defined in: [index.ts:2048](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2048)

#### Parameters

##### listener

(`selection`) => `void`

#### Returns

[`Disposable`](Disposable.md)

***

### coordsAtPos()

> **coordsAtPos**(`pos`): \{ `left`: `number`; `top`: `number`; `bottom`: `number`; \} \| `null`

Defined in: [index.ts:2054](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2054)

Viewport pixel coordinates of the character edge at `pos` (clamped to the text): `left`, and
the line's `top` and `bottom`. Null when the position is not rendered or the view is hidden.
The kernel places the selection pill with it (FR-14, UX-DR11).

#### Parameters

##### pos

`number`

#### Returns

\{ `left`: `number`; `top`: `number`; `bottom`: `number`; \} \| `null`

***

### setHighlight()

> **setHighlight**(`from`, `to`): `void`

Defined in: [index.ts:2060](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2060)

Marks `from`..`to` (clamped) with the selection tint whether or not the editor has focus,
so a selection stays visible while the selection card holds focus (UX-DR12). The mark
follows edits; text, selection, and undo history are untouched.

#### Parameters

##### from

`number`

##### to

`number`

#### Returns

`void`

***

### clearHighlight()

> **clearHighlight**(): `void`

Defined in: [index.ts:2062](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2062)

Removes the mark `setHighlight` made.

#### Returns

`void`

***

### onTyping()

> **onTyping**(`listener`): [`Disposable`](Disposable.md)

Defined in: [index.ts:2064](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2064)

Fires when the writer changes the text (typing, deleting, pasting).

#### Parameters

##### listener

() => `void`

#### Returns

[`Disposable`](Disposable.md)

***

### onChanged()

> **onChanged**(`listener`): [`Disposable`](Disposable.md)

Defined in: [index.ts:2069](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2069)

Fires after every document change from any source: typing, undo, paste, a plugin edit.
Not fired by `setDocument`. The kernel's autosave hangs off this (AD-8).

#### Parameters

##### listener

() => `void`

#### Returns

[`Disposable`](Disposable.md)

***

### linkAtCaret()

> **linkAtCaret**(): `string` \| `null`

Defined in: [index.ts:2074](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2074)

The destination of the link under the caret (`[text](dest)`, `[text][ref]` resolved through
its definition, an autolink, or a bare URL), as written, or null. Story 9.1.

#### Returns

`string` \| `null`

***

### onLinkFollowed()

> **onLinkFollowed**(`listener`): [`Disposable`](Disposable.md)

Defined in: [index.ts:2079](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2079)

Fires with a link's destination when the writer Cmd/Ctrl-clicks it. A plain click only places
the cursor and never fires this. The kernel decides what following means (Story 9.1).

#### Parameters

##### listener

(`destination`) => `void`

#### Returns

[`Disposable`](Disposable.md)

***

### applyResult()

> **applyResult**(`changes`, `source`): `void`

Defined in: [index.ts:2086](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2086)

Applies `changes` (see `TextChange`; checked with `checkTextChanges`) as one transaction
and exactly one undo step that never merges with the writer's typing before or after it,
tagged with `source` (e.g. `plugin:<id>`) (AD-8, AD-18). Fires `onChanged`, not
`onTyping`. Throws `editor/bad-change` for out-of-range, unsorted, or overlapping changes.

#### Parameters

##### changes

[`TextChange`](TextChange.md)[]

##### source

`string`

#### Returns

`void`

***

### setReadOnly()

> **setReadOnly**(`on`): `void`

Defined in: [index.ts:2088](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2088)

Turns read-only on or off: the editor still shows the text but takes no edits.

#### Parameters

##### on

`boolean`

#### Returns

`void`

***

### setMode()

> **setMode**(`extension`): `void`

Defined in: [index.ts:2098](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2098)

Draws the document with an editing mode's extension set (see `EditingModeExtension`),
replacing the previous mode's (FR-12, AD-7). Only how the text is drawn changes: no new
state, no document change, so undo history survives and `onChanged` doesn't fire.
`setDocument` keeps the current mode. Throws, leaving the previous mode in place, only for
errors raised synchronously by the reconfigure (an invalid extension value, a throwing
`StateField.create`); CM6 catches and only logs errors in view plugins and decoration
providers. The kernel calls it; plugins use `api.editor.registerMode`.

#### Parameters

##### extension

`unknown`

#### Returns

`void`

***

### setBlockRenderers()

> **setBlockRenderers**(`entries`): `void`

Defined in: [index.ts:2105](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2105)

Replaces the available fenced-block renderers (Story 9.4, AD-19). The editor asks the one
that best matches each top-level fenced block (see `BlockRendererContribution`) and draws its
result without changing the text or the undo history. The kernel calls it when a renderer
registers or goes away, and when a host mounts.

#### Parameters

##### entries

[`BlockRendererEntry`](BlockRendererEntry.md)[]

#### Returns

`void`

***

### setMarks()

> **setMarks**(`owner`, `setId`, `marks`): `void`

Defined in: [index.ts:2113](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2113)

Draws a plugin's marks over the real text (Story 9.17): a tint and an underline per kind, no
borders. `owner` is the plugin ID and `setId` the plugin's name for the set; setting a set
replaces its previous marks, and an empty list clears it. Ranges are clamped to the text, the
marks follow edits, and the text, selection, and undo history are untouched. `setDocument`
drops every mark.

#### Parameters

##### owner

`string`

##### setId

`string`

##### marks

[`Mark`](Mark.md)[]

#### Returns

`void`

***

### clearMarks()

> **clearMarks**(`owner`): `void`

Defined in: [index.ts:2115](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2115)

Removes every mark of `owner`'s sets.

#### Parameters

##### owner

`string`

#### Returns

`void`

***

### onMarkClick()

> **onMarkClick**(`listener`): [`Disposable`](Disposable.md)

Defined in: [index.ts:2117](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2117)

Fires when the writer plainly clicks a mark: the caret still moves.

#### Parameters

##### listener

(`owner`, `setId`, `markId`) => `void`

#### Returns

[`Disposable`](Disposable.md)

***

### focus()

> **focus**(): `void`

Defined in: [index.ts:2118](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2118)

#### Returns

`void`

***

### destroy()

> **destroy**(): `void`

Defined in: [index.ts:2120](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2120)

Tears the editor down and removes it from the mount.

#### Returns

`void`
