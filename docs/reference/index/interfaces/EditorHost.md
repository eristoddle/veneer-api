# Interface: EditorHost

Defined in: [index.ts:2204](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2204)

The kernel's only route to the editor (AD-18). The editor plugin registers a factory; the
kernel calls it once with the mount and talks to the result through these methods only.
Later stories add coordinates.

## Methods

### getFind()

> **getFind**(): [`EditorFindSnapshot`](EditorFindSnapshot.md)

Defined in: [index.ts:2205](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2205)

#### Returns

[`EditorFindSnapshot`](EditorFindSnapshot.md)

***

### onFindChanged()

> **onFindChanged**(`listener`): [`Disposable`](Disposable.md)

Defined in: [index.ts:2206](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2206)

#### Parameters

##### listener

(`snapshot`) => `void`

#### Returns

[`Disposable`](Disposable.md)

***

### setFindQuery()

> **setFindQuery**(`query`): `void`

Defined in: [index.ts:2208](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2208)

Selects the first non-overlapping match at/after the caret, wrapping; origin `find`.

#### Parameters

##### query

`string`

#### Returns

`void`

***

### findNext()

> **findNext**(`backwards?`): `void`

Defined in: [index.ts:2209](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2209)

#### Parameters

##### backwards?

`boolean`

#### Returns

`void`

***

### clearFind()

> **clearFind**(): `void`

Defined in: [index.ts:2211](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2211)

Removes highlights without changing text, selection, or undo history.

#### Returns

`void`

***

### replaceFind()

> **replaceFind**(`text`): `void`

Defined in: [index.ts:2213](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2213)

One isolated undo step; refuses read-only writes. Current replacement skips inserted text.

#### Parameters

##### text

`string`

#### Returns

`void`

***

### replaceAllFind()

> **replaceAllFind**(`text`): `void`

Defined in: [index.ts:2214](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2214)

#### Parameters

##### text

`string`

#### Returns

`void`

***

### setDocument()

> **setDocument**(`text`): `void`

Defined in: [index.ts:2216](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2216)

Replaces the whole document with `text` (`\n` line endings) and resets undo history.

#### Parameters

##### text

`string`

#### Returns

`void`

***

### getText()

> **getText**(): `string`

Defined in: [index.ts:2217](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2217)

#### Returns

`string`

***

### getSelection()

> **getSelection**(): [`EditorSelection`](EditorSelection.md)

Defined in: [index.ts:2218](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2218)

#### Returns

[`EditorSelection`](EditorSelection.md)

***

### select()

> **select**(`from`, `to`): `void`

Defined in: [index.ts:2224](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2224)

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

Defined in: [index.ts:2225](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2225)

#### Parameters

##### listener

(`selection`) => `void`

#### Returns

[`Disposable`](Disposable.md)

***

### coordsAtPos()

> **coordsAtPos**(`pos`): \{ `left`: `number`; `top`: `number`; `bottom`: `number`; \} \| `null`

Defined in: [index.ts:2231](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2231)

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

Defined in: [index.ts:2237](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2237)

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

Defined in: [index.ts:2239](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2239)

Removes the mark `setHighlight` made.

#### Returns

`void`

***

### onTyping()

> **onTyping**(`listener`): [`Disposable`](Disposable.md)

Defined in: [index.ts:2241](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2241)

Fires when the writer changes the text (typing, deleting, pasting).

#### Parameters

##### listener

() => `void`

#### Returns

[`Disposable`](Disposable.md)

***

### onChanged()

> **onChanged**(`listener`): [`Disposable`](Disposable.md)

Defined in: [index.ts:2246](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2246)

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

Defined in: [index.ts:2251](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2251)

The destination of the link under the caret (`[text](dest)`, `[text][ref]` resolved through
its definition, an autolink, or a bare URL), as written, or null. Story 9.1.

#### Returns

`string` \| `null`

***

### onLinkFollowed()

> **onLinkFollowed**(`listener`): [`Disposable`](Disposable.md)

Defined in: [index.ts:2256](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2256)

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

Defined in: [index.ts:2263](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2263)

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

Defined in: [index.ts:2265](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2265)

Turns read-only on or off: the editor still shows the text but takes no edits.

#### Parameters

##### on

`boolean`

#### Returns

`void`

***

### setMode()

> **setMode**(`extension`): `void`

Defined in: [index.ts:2275](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2275)

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

Defined in: [index.ts:2282](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2282)

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

Defined in: [index.ts:2290](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2290)

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

Defined in: [index.ts:2292](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2292)

Removes every mark of `owner`'s sets.

#### Parameters

##### owner

`string`

#### Returns

`void`

***

### onMarkClick()

> **onMarkClick**(`listener`): [`Disposable`](Disposable.md)

Defined in: [index.ts:2294](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2294)

Fires when the writer plainly clicks a mark: the caret still moves.

#### Parameters

##### listener

(`owner`, `setId`, `markId`) => `void`

#### Returns

[`Disposable`](Disposable.md)

***

### focus()

> **focus**(): `void`

Defined in: [index.ts:2295](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2295)

#### Returns

`void`

***

### destroy()

> **destroy**(): `void`

Defined in: [index.ts:2297](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2297)

Tears the editor down and removes it from the mount.

#### Returns

`void`
