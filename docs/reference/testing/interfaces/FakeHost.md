# Interface: FakeHost

Defined in: [testing.ts:280](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L280)

## Properties

### history

> `readonly` **history**: [`FakeHistory`](FakeHistory.md)

Defined in: [testing.ts:282](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L282)

The in-memory history `api.history` reads and writes (Story 9.13).

***

### notices

> `readonly` **notices**: `object`[]

Defined in: [testing.ts:284](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L284)

The notices `api.notify` let through (at most `NOTICE_LIMIT_PER_MINUTE` a minute), in order (Story 9.20).

#### message

> **message**: `string`

#### action?

> `optional` **action?**: `object`

##### action.label

> **label**: `string`

##### action.surface

> **surface**: `string`

***

### projectData

> `readonly` **projectData**: `Map`\<`string`, `string`\>

Defined in: [testing.ts:286](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L286)

The JSON text `api.projectData` holds for this plugin, by key (Story 9.26).

***

### netRequests

> `readonly` **netRequests**: [`NetRequest`](../../index/interfaces/NetRequest.md)[]

Defined in: [testing.ts:290](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L290)

Every `api.net.fetch` request that was allowed through, in order.

***

### secrets

> `readonly` **secrets**: `Map`\<`string`, `string`\>

Defined in: [testing.ts:292](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L292)

The secrets `api.secrets` holds for this plugin, by name (Story 9.8).

***

### exported

> `readonly` **exported**: [`ExportFile`](../../index/interfaces/ExportFile.md)[]

Defined in: [testing.ts:294](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L294)

Every file `api.export.saveAs` was given, in order; the fake "writer" always saves (Story 9.8).

***

### clipboard

> `readonly` **clipboard**: `object`

Defined in: [testing.ts:299](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L299)

What `api.clipboard` holds (Story 11.2): set `text` or `html` to seed a read; a write or
`writeImage` replaces it. `image` is the project path last given to `writeImage`.

#### text

> **text**: `string`

#### html

> **html**: `string` \| `null`

#### image

> **image**: `string` \| `null`

***

### pickedImages

> `readonly` **pickedImages**: [`PickedImage`](../../index/interfaces/PickedImage.md)[][]

Defined in: [testing.ts:301](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L301)

What `api.workspace.pickImages` resolves next, in order (Story 11.13); empty is a cancel.

***

### revealed

> `readonly` **revealed**: `string`[]

Defined in: [testing.ts:303](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L303)

Every path `api.workspace.revealImage` was given, in order (Story 11.13).

***

### revealedEntries

> `readonly` **revealedEntries**: `string`[]

Defined in: [testing.ts:305](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L305)

Every path `api.workspace.reveal` was given, in order (Story 18.1).

***

### openedFolders

> `readonly` **openedFolders**: `object`[]

Defined in: [testing.ts:307](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L307)

Every folder `api.workspace.openFolder` opened, in order (Story 18.1).

#### path

> **path**: `string`

#### newWindow

> **newWindow**: `boolean`

***

### openedInNewWindow

> `readonly` **openedInNewWindow**: `string`[]

Defined in: [testing.ts:309](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L309)

Every document `api.workspace.open(path, { newWindow: true })` opened (Story 18.1).

***

### lazyPages

> `readonly` **lazyPages**: `object`[]

Defined in: [testing.ts:311](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L311)

Pages `createFromTemplate` opened with `lazy: true`: shown, nothing written (0.55.0).

#### path

> **path**: `string`

#### text

> **text**: `string`

***

### sounds

> `readonly` **sounds**: `object`[]

Defined in: [testing.ts:313](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L313)

Every `api.sound.play` and `api.sound.loop` in order; a loop is `loop: true` (0.55.0).

#### id

> **id**: `string`

#### volume

> **volume**: `number`

#### loop

> **loop**: `boolean`

#### stopped

> **stopped**: `boolean`

***

### pageLook

> `readonly` **pageLook**: [`PageLook`](../../index/interfaces/PageLook.md) \| `null`

Defined in: [testing.ts:315](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L315)

The plugin's current page look, or null (0.55.0).

***

### commandsRun

> `readonly` **commandsRun**: `string`[]

Defined in: [testing.ts:319](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L319)

The IDs of other commands `api.commands.run` was asked to run, in order (0.55.0).

***

### gridAnswers

> `readonly` **gridAnswers**: (\{ `rows`: `number`; `cols`: `number`; \} \| `null`)[]

Defined in: [testing.ts:321](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L321)

What `api.workspace.pickGrid` resolves next, in order (Story 11.8); `null` or empty is a cancel.

***

### reloadCount

> `readonly` **reloadCount**: `number`

Defined in: [testing.ts:323](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L323)

How many times `api.resources.reload` ran (Story 13.5).

***

### askAnswers

> `readonly` **askAnswers**: (`string` \| `null`)[]

Defined in: [testing.ts:325](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L325)

What `api.workspace.ask` resolves next, in order (Story 13.5); `null` or empty is a cancel.

***

### asked

> `readonly` **asked**: [`AskOptions`](../../index/interfaces/AskOptions.md)[]

Defined in: [testing.ts:327](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L327)

Every `api.workspace.ask` the plugin made, in order.

***

### modelRequests

> `readonly` **modelRequests**: [`PluginCompletion`](../../index/interfaces/PluginCompletion.md)[]

Defined in: [testing.ts:329](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L329)

Every `api.providers` request that was allowed through, in order.

***

### imageRequests

> `readonly` **imageRequests**: [`PluginImageRequest`](../../index/interfaces/PluginImageRequest.md)[]

Defined in: [testing.ts:331](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L331)

Every `api.providers.image` request that was allowed through, in order.

***

### chatOpened

> `readonly` **chatOpened**: [`ChatOpenOptions`](../../index/interfaces/ChatOpenOptions.md)[]

Defined in: [testing.ts:333](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L333)

Every `api.chat.open` that was allowed through, in order (0.59.0).

***

### api

> `readonly` **api**: [`PluginApi`](../../index/interfaces/PluginApi.md)

Defined in: [testing.ts:337](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L337)

The API object handed to `onload`.

***

### edits

> `readonly` **edits**: [`FakeEdit`](FakeEdit.md)[]

Defined in: [testing.ts:380](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L380)

Every edit applied to the open document, in order.

***

### modes

> `readonly` **modes**: `ReadonlyMap`\<`string`, `unknown`\>

Defined in: [testing.ts:382](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L382)

Live `api.editor.registerMode` registrations: mode ID to its extension set.

***

### blockRenderers

> `readonly` **blockRenderers**: `ReadonlyMap`\<`string`, [`BlockRenderer`](../../index/type-aliases/BlockRenderer.md)\>

Defined in: [testing.ts:384](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L384)

Live `api.editor.registerBlockRenderer` registrations: contribution ID to its handler.

***

### syntaxRenderers

> `readonly` **syntaxRenderers**: `ReadonlyMap`\<`string`, [`SyntaxRenderer`](../../index/type-aliases/SyntaxRenderer.md)\>

Defined in: [testing.ts:386](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L386)

Live `api.editor.onRenderSyntax` registrations: contribution ID to its handler (Story 22.4).

***

### syntaxClicks

> `readonly` **syntaxClicks**: `ReadonlyMap`\<`string`, [`SyntaxClickHandler`](../../index/type-aliases/SyntaxClickHandler.md)\>

Defined in: [testing.ts:388](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L388)

Live `api.editor.onSyntaxClick` registrations: contribution ID to its handler.

***

### marks

> `readonly` **marks**: `ReadonlyMap`\<`string`, [`Mark`](../../index/interfaces/Mark.md)[]\>

Defined in: [testing.ts:393](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L393)

The marks the plugin has set with `api.editor.setMarks` (Story 9.17): set ID to its marks.
Opening another document or switching project clears them, as the kernel does.

***

### files

> `readonly` **files**: `Map`\<`string`, `string`\>

Defined in: [testing.ts:400](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L400)

Closed files by API path; `vault.process` reads and writes here.

***

### images

> `readonly` **images**: [`FakeSavedImage`](FakeSavedImage.md)[]

Defined in: [testing.ts:404](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L404)

Every `vault.saveImage` call, in order.

***

### textReplacements

> `readonly` **textReplacements**: [`TextReplacement`](../../index/interfaces/TextReplacement.md)[]

Defined in: [testing.ts:406](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L406)

What `api.workspace.textReplacements` resolves (Story 17.8); push pairs to seed it.

***

### attachments

> `readonly` **attachments**: [`FakeSavedAttachment`](FakeSavedAttachment.md)[]

Defined in: [testing.ts:410](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L410)

Every `vault.saveAttachment` call, in order; `setImageFailure` and `holdImages` apply too.

***

### views

> `readonly` **views**: `ReadonlyMap`\<`string`, [`SurfaceView`](../../index/type-aliases/SurfaceView.md)\>

Defined in: [testing.ts:424](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L424)

The last view `api.surfaces.setView` gave each declared surface, by surface ID.

***

### opens

> `readonly` **opens**: `string`[]

Defined in: [testing.ts:435](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L435)

Every path `workspace.open` opened, in order.

***

### modelToolDetails

> `readonly` **modelToolDetails**: `Map`\<`string`, `string`\>

Defined in: [testing.ts:449](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L449)

What the plugin last said with `api.ai.describeModelTool`, by tool ID (Story 27.2).

***

### openedExternal

> `readonly` **openedExternal**: `string`[]

Defined in: [testing.ts:451](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L451)

Every address `api.workspace.openExternal` was given, in order (Story 27.3).

***

### paletteItems

> `readonly` **paletteItems**: `ReadonlyMap`\<`string`, [`PaletteItem`](../../index/interfaces/PaletteItem.md)[]\>

Defined in: [testing.ts:459](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L459)

The last items `api.palette.setItems` gave each declared provider, by provider ID.

***

### folders

> `readonly` **folders**: `Set`\<`string`\>

Defined in: [testing.ts:465](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L465)

Empty folders `createFolder` made (folders holding a file show through `files`).

***

### created

> `readonly` **created**: `string`[]

Defined in: [testing.ts:467](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L467)

Every path `vault.create` and `createFolder` made, in order.

***

### renames

> `readonly` **renames**: `object`[]

Defined in: [testing.ts:469](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L469)

Every rename or move, in order.

#### from

> **from**: `string`

#### to

> **to**: `string`

#### kind

> **kind**: `"file"` \| `"folder"`

***

### copies

> `readonly` **copies**: `object`[]

Defined in: [testing.ts:471](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L471)

Every `vault.copy`, in order.

#### from

> **from**: `string`

#### to

> **to**: `string`

***

### trashed

> `readonly` **trashed**: `string`[]

Defined in: [testing.ts:473](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L473)

Every path `vault.trash` trashed, in order.

***

### begunRowActions

> `readonly` **begunRowActions**: `object`[]

Defined in: [testing.ts:480](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L480)

Every `surfaces.beginRowAction` call, in order.

#### surfaceId

> **surfaceId**: `string`

#### actionId

> **actionId**: `string`

#### rowId

> **rowId**: `string`

***

### searches

> `readonly` **searches**: `string`[]

Defined in: [testing.ts:482](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L482)

Every query `vault.search` searched (an empty one never searches), in order.

***

### searchFolders

> `readonly` **searchFolders**: `string`[]

Defined in: [testing.ts:484](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L484)

The `folder` of every `api.vault.search` call, in order; '' is the whole project (Story 18.2).

***

### selections

> `readonly` **selections**: `object`[]

Defined in: [testing.ts:491](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L491)

Every `workspace.open` that carried `select`, in order.

#### path

> **path**: `string`

#### from

> **from**: `number`

#### to

> **to**: `number`

***

### shown

> `readonly` **shown**: `string`[]

Defined in: [testing.ts:523](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L523)

Every `surfaces.show` call, by surface ID, in order.

***

### shownFocus

> `readonly` **shownFocus**: (`string` \| `undefined`)[]

Defined in: [testing.ts:525](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L525)

The `focus` option of every `surfaces.show` call, one entry per call (Story 9.23).

***

### closed

> `readonly` **closed**: `string`[]

Defined in: [testing.ts:527](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L527)

Every `surfaces.close` call, in order (Story 9.22).

## Methods

### projectDataChanged()

> **projectDataChanged**(`key`): `Promise`\<`void`\>

Defined in: [testing.ts:288](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L288)

Simulates a pull or checkout changing `key` on disk: emits `project-data:changed` to the plugin.

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`void`\>

***

### typing()

> **typing**(`kind`): `void`

Defined in: [testing.ts:317](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L317)

Simulates the writer's keystroke for `api.editor.onTyping` listeners (0.55.0).

#### Parameters

##### kind

[`TypingKind`](../../index/type-aliases/TypingKind.md)

#### Returns

`void`

***

### endChatSession()

> **endChatSession**(`event`): `void`

Defined in: [testing.ts:335](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L335)

Ends the chat session as the writer would: calls the `api.chat.onSessionEnded` handlers (0.59.0).

#### Parameters

##### event

[`ChatSessionEndedEvent`](../../index/interfaces/ChatSessionEndedEvent.md)

#### Returns

`void`

***

### load()

> **load**(): `Promise`\<`void`\>

Defined in: [testing.ts:339](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L339)

Calls `onload(api)`.

#### Returns

`Promise`\<`void`\>

***

### run()

> **run**(`commandId`, ...`args`): `Promise`\<`unknown`\>

Defined in: [testing.ts:341](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L341)

Runs a declared command's handler; rejects if the plugin attached none.

#### Parameters

##### commandId

`string`

##### args

...`unknown`[]

#### Returns

`Promise`\<`unknown`\>

***

### emit()

> **emit**(`event`): `Promise`\<`void`\>

Defined in: [testing.ts:343](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L343)

Delivers an event to every listener the plugin subscribed for its `type`.

#### Parameters

##### event

[`VeneerEvent`](../../index/interfaces/VeneerEvent.md)

#### Returns

`Promise`\<`void`\>

***

### switchProject()

> **switchProject**(`project`, `next?`): `Promise`\<`void`\>

Defined in: [testing.ts:349](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L349)

Switches to another project the way the kernel would: replaces the closed files with
`files` (paths relative to the new root), clears the open document unless `text` is
given with `openPath`, then emits one `project:switched` with `name` and `kind`.

#### Parameters

##### project

###### name

`string`

###### kind?

`"project"` \| `"loose"`

##### next?

###### files?

`Record`\<`string`, `string`\>

###### openPath?

`string`

###### text?

`string` \| `null`

#### Returns

`Promise`\<`void`\>

***

### unload()

> **unload**(): `Promise`\<`void`\>

Defined in: [testing.ts:354](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L354)

Calls `onunload()` and disposes everything the plugin registered.

#### Returns

`Promise`\<`void`\>

***

### liveDisposables()

> **liveDisposables**(): `number`

Defined in: [testing.ts:356](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L356)

How many registrations and subscriptions are still live.

#### Returns

`number`

***

### mountEditor()

> **mountEditor**(`parent`): [`EditorHost`](../../index/interfaces/EditorHost.md)

Defined in: [testing.ts:364](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L364)

Calls the registered editor host factory with `parent` as the mount, the way the kernel
does (AD-18), then applies the default editing mode (the manifest's first, if registered)
as the kernel does on mount (FR-12). Throws if the plugin registered no host. Pass a jsdom
element in tests. The returned host includes the API's find operations and `select`; find state and
decorations belong to the registered editor factory, not the fake plugin facade.

#### Parameters

##### parent

`HTMLElement`

#### Returns

[`EditorHost`](../../index/interfaces/EditorHost.md)

***

### text()

> **text**(): `string` \| `null`

Defined in: [testing.ts:366](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L366)

The open document's text, or null.

#### Returns

`string` \| `null`

***

### setText()

> **setText**(`text`): `void`

Defined in: [testing.ts:368](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L368)

Replaces the open document's text (null: no document). Not recorded as an edit.

#### Parameters

##### text

`string` \| `null`

#### Returns

`void`

***

### changeText()

> **changeText**(`text`): `void`

Defined in: [testing.ts:373](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L373)

Replaces the open document's text (null: no document) the way the writer typing or a
document switch would, firing `editor.onChanged` listeners. Not recorded as an edit.

#### Parameters

##### text

`string` \| `null`

#### Returns

`void`

***

### setSelection()

> **setSelection**(`selection`): `void`

Defined in: [testing.ts:378](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L378)

Moves the main selection (origin `keyboard` unless given) and fires
`editor.onSelectionChanged` listeners when a document is open.

#### Parameters

##### selection

###### from

`number`

###### to

`number`

###### origin?

[`SelectionOrigin`](../../index/type-aliases/SelectionOrigin.md)

#### Returns

`void`

***

### markClick()

> **markClick**(`setId`, `markId`): `Promise`\<`void`\>

Defined in: [testing.ts:398](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L398)

Clicks a mark the way the kernel does (Story 9.17): calls every live `onMarkClick` handler
for `setId` with the mark's ID, in order.

#### Parameters

##### setId

`string`

##### markId

`string`

#### Returns

`Promise`\<`void`\>

***

### setRemoteAllowed()

> **setRemoteAllowed**(`on`): `void`

Defined in: [testing.ts:402](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L402)

Flips the remote allowance and fires `resources.onChanged` listeners.

#### Parameters

##### on

`boolean`

#### Returns

`void`

***

### askImageDestination()

> **askImageDestination**(`request`): `Promise`\<[`ImageDestination`](../../index/interfaces/ImageDestination.md) \| `undefined`\>

Defined in: [testing.ts:408](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L408)

Asks the plugin's `vault.onImageDestination` handler, as the kernel would (Story 17.2).

#### Parameters

##### request

[`ImageDestinationRequest`](../../index/interfaces/ImageDestinationRequest.md)

#### Returns

`Promise`\<[`ImageDestination`](../../index/interfaces/ImageDestination.md) \| `undefined`\>

***

### setImageFailure()

> **setImageFailure**(`code`): `void`

Defined in: [testing.ts:412](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L412)

Makes later `vault.saveImage` calls reject with `code`, or succeed again with null.

#### Parameters

##### code

`string` \| `null`

#### Returns

`void`

***

### holdImages()

> **holdImages**(): () => `void`

Defined in: [testing.ts:417](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L417)

Holds every later `vault.saveImage` until the returned release is called, so a test can
edit the document while a save is in flight.

#### Returns

() => `void`

***

### setSetting()

> **setSetting**(`id`, `value`): `void`

Defined in: [testing.ts:422](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L422)

Sets a declared setting's value (null: back to its default) and fires `settings.onChanged`
listeners when it changed, as a write in the settings surface would.

#### Parameters

##### id

`string`

##### value

[`SettingValue`](../../index/type-aliases/SettingValue.md) \| `null`

#### Returns

`void`

***

### openItem()

> **openItem**(`surfaceId`, `itemId`): `Promise`\<`void`\>

Defined in: [testing.ts:429](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L429)

Opens a row the way the kernel does when the writer picks it: calls every live `onOpen`
handler for `surfaceId` with `itemId`, in registration order.

#### Parameters

##### surfaceId

`string`

##### itemId

`string`

#### Returns

`Promise`\<`void`\>

***

### pressAction()

> **pressAction**(`surfaceId`, `actionId`): `Promise`\<`void`\>

Defined in: [testing.ts:431](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L431)

Calls every live `onAction` handler for `surfaceId` with `actionId`.

#### Parameters

##### surfaceId

`string`

##### actionId

`string`

#### Returns

`Promise`\<`void`\>

***

### refreshSurface()

> **refreshSurface**(`surfaceId`): `Promise`\<`void`\>

Defined in: [testing.ts:433](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L433)

Calls every live `onRefresh` handler for `surfaceId`, as the kernel does before a redraw.

#### Parameters

##### surfaceId

`string`

#### Returns

`Promise`\<`void`\>

***

### callModelTool()

> **callModelTool**(`id`, `args`): `Promise`\<`string`\>

Defined in: [testing.ts:447](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L447)

Calls a model tool's handler as the kernel would for the model (Story 27.2): the text it
answered, cut to `MAX_MODEL_TOOL_RESULT`; a throw becomes a short error sentence. Rejects
`plugin/undeclared-contribution` for an undeclared ID and `plugin/no-handler` with none.

#### Parameters

##### id

`string`

##### args

[`ModelToolArgs`](../../index/type-aliases/ModelToolArgs.md)

#### Returns

`Promise`\<`string`\>

***

### runTool()

> **runTool**(`id`, `input?`, `signal?`, `report?`): `Promise`\<[`ToolResult`](../../index/type-aliases/ToolResult.md)\>

Defined in: [testing.ts:452](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L452)

#### Parameters

##### id

`string`

##### input?

`Partial`\<[`ToolInput`](../../index/interfaces/ToolInput.md)\>

##### signal?

`AbortSignal`

##### report?

[`ToolReport`](../../index/type-aliases/ToolReport.md)

#### Returns

`Promise`\<[`ToolResult`](../../index/type-aliases/ToolResult.md)\>

***

### runPaletteItem()

> **runPaletteItem**(`providerId`, `itemId`): `Promise`\<`void`\>

Defined in: [testing.ts:461](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L461)

Picks an item the way the palette does: calls every live `onRun` handler for the provider.

#### Parameters

##### providerId

`string`

##### itemId

`string`

#### Returns

`Promise`\<`void`\>

***

### refreshPalette()

> **refreshPalette**(`providerId`): `Promise`\<`void`\>

Defined in: [testing.ts:463](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L463)

Calls every live `palette.onRefresh` handler for the provider, as entering files mode does.

#### Parameters

##### providerId

`string`

#### Returns

`Promise`\<`void`\>

***

### rowAction()

> **rowAction**(`surfaceId`, `actionId`, `rowId`, `value?`): `Promise`\<`unknown`\>

Defined in: [testing.ts:478](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L478)

Finishes a row action the way the kernel does: calls every live `onRowAction` handler for
the surface, in order, and resolves to the last one's result.

#### Parameters

##### surfaceId

`string`

##### actionId

`string`

##### rowId

`string`

##### value?

`string`

#### Returns

`Promise`\<`unknown`\>

***

### holdSearches()

> **holdSearches**(): () => `void`

Defined in: [testing.ts:489](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L489)

Holds every later `vault.search` until the returned release is called. A search started
while another is held supersedes it: the held one rejects `vault/superseded` on release.

#### Returns

() => `void`

***

### input()

> **input**(`surfaceId`, `value`): `Promise`\<`void`\>

Defined in: [testing.ts:496](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L496)

Types in a view's input field the way the kernel reports it: calls every live `onInput`
handler for `surfaceId` with the whole `value`, in order.

#### Parameters

##### surfaceId

`string`

##### value

`string`

#### Returns

`Promise`\<`void`\>

***

### reorder()

> **reorder**(`surfaceId`, `event`): `Promise`\<`void`\>

Defined in: [testing.ts:501](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L501)

Moves a row the way the kernel does (Story 9.24): calls every live `onReorder` handler for
`surfaceId` with `event`, in order.

#### Parameters

##### surfaceId

`string`

##### event

[`ReorderEvent`](../../index/interfaces/ReorderEvent.md)

#### Returns

`Promise`\<`void`\>

***

### itemEdit()

> **itemEdit**(`surfaceId`, `itemId`, `value`): `Promise`\<`void`\>

Defined in: [testing.ts:506](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L506)

Edits a card's synopsis the way the kernel does (Story 29.1): calls every live `onItemEdit`
handler for `surfaceId` with the item and the new text, in order.

#### Parameters

##### surfaceId

`string`

##### itemId

`string`

##### value

`string`

#### Returns

`Promise`\<`void`\>

***

### formChange()

> **formChange**(`surfaceId`, `fieldId`, `value`): `Promise`\<`void`\>

Defined in: [testing.ts:511](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L511)

Changes a form field the way the kernel does (Story 9.25): calls every live `onFormChange`
handler for `surfaceId` with the field ID and value, in order.

#### Parameters

##### surfaceId

`string`

##### fieldId

`string`

##### value

[`FormValue`](../../index/type-aliases/FormValue.md)

#### Returns

`Promise`\<`void`\>

***

### formSubmit()

> **formSubmit**(`surfaceId`, `values`): `Promise`\<`void`\>

Defined in: [testing.ts:516](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L516)

Submits a form the way the kernel does (Story 9.25): calls every live `onFormSubmit`
handler for `surfaceId` with the values by field ID, in order.

#### Parameters

##### surfaceId

`string`

##### values

`Record`\<`string`, [`FormValue`](../../index/type-aliases/FormValue.md)\>

#### Returns

`Promise`\<`void`\>

***

### diffAction()

> **diffAction**(`surfaceId`, `action`, `changeId`): `Promise`\<`void`\>

Defined in: [testing.ts:521](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L521)

Chooses Accept or Reject on a diff's change the way the kernel does (Story 9.16): calls every
live `onDiffAction` handler for `surfaceId` with the action and the change's ID, in order.

#### Parameters

##### surfaceId

`string`

##### action

[`DiffAction`](../../index/type-aliases/DiffAction.md)

##### changeId

`string`

#### Returns

`Promise`\<`void`\>
