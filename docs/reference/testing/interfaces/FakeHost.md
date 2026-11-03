# Interface: FakeHost

Defined in: [testing.ts:246](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L246)

## Properties

### history

> `readonly` **history**: [`FakeHistory`](FakeHistory.md)

Defined in: [testing.ts:248](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L248)

The in-memory history `api.history` reads and writes (Story 9.13).

***

### notices

> `readonly` **notices**: `object`[]

Defined in: [testing.ts:250](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L250)

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

Defined in: [testing.ts:252](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L252)

The JSON text `api.projectData` holds for this plugin, by key (Story 9.26).

***

### netRequests

> `readonly` **netRequests**: [`NetRequest`](../../index/interfaces/NetRequest.md)[]

Defined in: [testing.ts:256](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L256)

Every `api.net.fetch` request that was allowed through, in order.

***

### secrets

> `readonly` **secrets**: `Map`\<`string`, `string`\>

Defined in: [testing.ts:258](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L258)

The secrets `api.secrets` holds for this plugin, by name (Story 9.8).

***

### exported

> `readonly` **exported**: [`ExportFile`](../../index/interfaces/ExportFile.md)[]

Defined in: [testing.ts:260](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L260)

Every file `api.export.saveAs` was given, in order; the fake "writer" always saves (Story 9.8).

***

### clipboard

> `readonly` **clipboard**: `object`

Defined in: [testing.ts:265](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L265)

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

Defined in: [testing.ts:267](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L267)

What `api.workspace.pickImages` resolves next, in order (Story 11.13); empty is a cancel.

***

### revealed

> `readonly` **revealed**: `string`[]

Defined in: [testing.ts:269](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L269)

Every path `api.workspace.revealImage` was given, in order (Story 11.13).

***

### gridAnswers

> `readonly` **gridAnswers**: (\{ `rows`: `number`; `cols`: `number`; \} \| `null`)[]

Defined in: [testing.ts:271](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L271)

What `api.workspace.pickGrid` resolves next, in order (Story 11.8); `null` or empty is a cancel.

***

### reloadCount

> `readonly` **reloadCount**: `number`

Defined in: [testing.ts:273](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L273)

How many times `api.resources.reload` ran (Story 13.5).

***

### askAnswers

> `readonly` **askAnswers**: (`string` \| `null`)[]

Defined in: [testing.ts:275](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L275)

What `api.workspace.ask` resolves next, in order (Story 13.5); `null` or empty is a cancel.

***

### asked

> `readonly` **asked**: [`AskOptions`](../../index/interfaces/AskOptions.md)[]

Defined in: [testing.ts:277](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L277)

Every `api.workspace.ask` the plugin made, in order.

***

### modelRequests

> `readonly` **modelRequests**: [`PluginCompletion`](../../index/interfaces/PluginCompletion.md)[]

Defined in: [testing.ts:279](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L279)

Every `api.providers` request that was allowed through, in order.

***

### api

> `readonly` **api**: [`PluginApi`](../../index/interfaces/PluginApi.md)

Defined in: [testing.ts:281](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L281)

The API object handed to `onload`.

***

### edits

> `readonly` **edits**: [`FakeEdit`](FakeEdit.md)[]

Defined in: [testing.ts:324](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L324)

Every edit applied to the open document, in order.

***

### modes

> `readonly` **modes**: `ReadonlyMap`\<`string`, `unknown`\>

Defined in: [testing.ts:326](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L326)

Live `api.editor.registerMode` registrations: mode ID to its extension set.

***

### blockRenderers

> `readonly` **blockRenderers**: `ReadonlyMap`\<`string`, [`BlockRenderer`](../../index/type-aliases/BlockRenderer.md)\>

Defined in: [testing.ts:328](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L328)

Live `api.editor.registerBlockRenderer` registrations: contribution ID to its handler.

***

### marks

> `readonly` **marks**: `ReadonlyMap`\<`string`, [`Mark`](../../index/interfaces/Mark.md)[]\>

Defined in: [testing.ts:333](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L333)

The marks the plugin has set with `api.editor.setMarks` (Story 9.17): set ID to its marks.
Opening another document or switching project clears them, as the kernel does.

***

### files

> `readonly` **files**: `Map`\<`string`, `string`\>

Defined in: [testing.ts:340](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L340)

Closed files by API path; `vault.process` reads and writes here.

***

### images

> `readonly` **images**: [`FakeSavedImage`](FakeSavedImage.md)[]

Defined in: [testing.ts:344](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L344)

Every `vault.saveImage` call, in order.

***

### textReplacements

> `readonly` **textReplacements**: [`TextReplacement`](../../index/interfaces/TextReplacement.md)[]

Defined in: [testing.ts:346](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L346)

What `api.workspace.textReplacements` resolves (Story 17.8); push pairs to seed it.

***

### attachments

> `readonly` **attachments**: [`FakeSavedAttachment`](FakeSavedAttachment.md)[]

Defined in: [testing.ts:350](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L350)

Every `vault.saveAttachment` call, in order; `setImageFailure` and `holdImages` apply too.

***

### views

> `readonly` **views**: `ReadonlyMap`\<`string`, [`SurfaceView`](../../index/type-aliases/SurfaceView.md)\>

Defined in: [testing.ts:364](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L364)

The last view `api.surfaces.setView` gave each declared surface, by surface ID.

***

### opens

> `readonly` **opens**: `string`[]

Defined in: [testing.ts:375](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L375)

Every path `workspace.open` opened, in order.

***

### paletteItems

> `readonly` **paletteItems**: `ReadonlyMap`\<`string`, [`PaletteItem`](../../index/interfaces/PaletteItem.md)[]\>

Defined in: [testing.ts:389](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L389)

The last items `api.palette.setItems` gave each declared provider, by provider ID.

***

### folders

> `readonly` **folders**: `Set`\<`string`\>

Defined in: [testing.ts:395](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L395)

Empty folders `createFolder` made (folders holding a file show through `files`).

***

### created

> `readonly` **created**: `string`[]

Defined in: [testing.ts:397](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L397)

Every path `vault.create` and `createFolder` made, in order.

***

### renames

> `readonly` **renames**: `object`[]

Defined in: [testing.ts:399](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L399)

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

Defined in: [testing.ts:401](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L401)

Every `vault.copy`, in order.

#### from

> **from**: `string`

#### to

> **to**: `string`

***

### trashed

> `readonly` **trashed**: `string`[]

Defined in: [testing.ts:403](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L403)

Every path `vault.trash` trashed, in order.

***

### begunRowActions

> `readonly` **begunRowActions**: `object`[]

Defined in: [testing.ts:410](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L410)

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

Defined in: [testing.ts:412](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L412)

Every query `vault.search` searched (an empty one never searches), in order.

***

### selections

> `readonly` **selections**: `object`[]

Defined in: [testing.ts:419](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L419)

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

Defined in: [testing.ts:446](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L446)

Every `surfaces.show` call, by surface ID, in order.

***

### shownFocus

> `readonly` **shownFocus**: (`string` \| `undefined`)[]

Defined in: [testing.ts:448](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L448)

The `focus` option of every `surfaces.show` call, one entry per call (Story 9.23).

***

### closed

> `readonly` **closed**: `string`[]

Defined in: [testing.ts:450](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L450)

Every `surfaces.close` call, in order (Story 9.22).

## Methods

### projectDataChanged()

> **projectDataChanged**(`key`): `Promise`\<`void`\>

Defined in: [testing.ts:254](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L254)

Simulates a pull or checkout changing `key` on disk: emits `project-data:changed` to the plugin.

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`void`\>

***

### load()

> **load**(): `Promise`\<`void`\>

Defined in: [testing.ts:283](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L283)

Calls `onload(api)`.

#### Returns

`Promise`\<`void`\>

***

### run()

> **run**(`commandId`, ...`args`): `Promise`\<`unknown`\>

Defined in: [testing.ts:285](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L285)

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

Defined in: [testing.ts:287](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L287)

Delivers an event to every listener the plugin subscribed for its `type`.

#### Parameters

##### event

[`VeneerEvent`](../../index/interfaces/VeneerEvent.md)

#### Returns

`Promise`\<`void`\>

***

### switchProject()

> **switchProject**(`project`, `next?`): `Promise`\<`void`\>

Defined in: [testing.ts:293](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L293)

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

Defined in: [testing.ts:298](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L298)

Calls `onunload()` and disposes everything the plugin registered.

#### Returns

`Promise`\<`void`\>

***

### liveDisposables()

> **liveDisposables**(): `number`

Defined in: [testing.ts:300](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L300)

How many registrations and subscriptions are still live.

#### Returns

`number`

***

### mountEditor()

> **mountEditor**(`parent`): [`EditorHost`](../../index/interfaces/EditorHost.md)

Defined in: [testing.ts:308](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L308)

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

Defined in: [testing.ts:310](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L310)

The open document's text, or null.

#### Returns

`string` \| `null`

***

### setText()

> **setText**(`text`): `void`

Defined in: [testing.ts:312](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L312)

Replaces the open document's text (null: no document). Not recorded as an edit.

#### Parameters

##### text

`string` \| `null`

#### Returns

`void`

***

### changeText()

> **changeText**(`text`): `void`

Defined in: [testing.ts:317](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L317)

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

Defined in: [testing.ts:322](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L322)

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

Defined in: [testing.ts:338](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L338)

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

Defined in: [testing.ts:342](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L342)

Flips the remote allowance and fires `resources.onChanged` listeners.

#### Parameters

##### on

`boolean`

#### Returns

`void`

***

### askImageDestination()

> **askImageDestination**(`request`): `Promise`\<[`ImageDestination`](../../index/interfaces/ImageDestination.md) \| `undefined`\>

Defined in: [testing.ts:348](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L348)

Asks the plugin's `vault.onImageDestination` handler, as the kernel would (Story 17.2).

#### Parameters

##### request

[`ImageDestinationRequest`](../../index/interfaces/ImageDestinationRequest.md)

#### Returns

`Promise`\<[`ImageDestination`](../../index/interfaces/ImageDestination.md) \| `undefined`\>

***

### setImageFailure()

> **setImageFailure**(`code`): `void`

Defined in: [testing.ts:352](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L352)

Makes later `vault.saveImage` calls reject with `code`, or succeed again with null.

#### Parameters

##### code

`string` \| `null`

#### Returns

`void`

***

### holdImages()

> **holdImages**(): () => `void`

Defined in: [testing.ts:357](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L357)

Holds every later `vault.saveImage` until the returned release is called, so a test can
edit the document while a save is in flight.

#### Returns

() => `void`

***

### setSetting()

> **setSetting**(`id`, `value`): `void`

Defined in: [testing.ts:362](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L362)

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

Defined in: [testing.ts:369](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L369)

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

Defined in: [testing.ts:371](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L371)

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

Defined in: [testing.ts:373](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L373)

Calls every live `onRefresh` handler for `surfaceId`, as the kernel does before a redraw.

#### Parameters

##### surfaceId

`string`

#### Returns

`Promise`\<`void`\>

***

### runTool()

> **runTool**(`id`, `input?`, `signal?`, `report?`): `Promise`\<[`ToolResult`](../../index/type-aliases/ToolResult.md)\>

Defined in: [testing.ts:382](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L382)

Runs a declared tool's handler the way the kernel does (Story 4.1): `input` is the context
(`selection` defaults to null) and `signal` a live one unless given. Rejects
`plugin/undeclared-contribution` for an undeclared ID, `plugin/no-handler` with none
attached, and `plugin/bad-result` for a malformed Result.

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

Defined in: [testing.ts:391](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L391)

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

Defined in: [testing.ts:393](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L393)

Calls every live `palette.onRefresh` handler for the provider, as entering files mode does.

#### Parameters

##### providerId

`string`

#### Returns

`Promise`\<`void`\>

***

### rowAction()

> **rowAction**(`surfaceId`, `actionId`, `rowId`, `value?`): `Promise`\<`unknown`\>

Defined in: [testing.ts:408](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L408)

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

Defined in: [testing.ts:417](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L417)

Holds every later `vault.search` until the returned release is called. A search started
while another is held supersedes it: the held one rejects `vault/superseded` on release.

#### Returns

() => `void`

***

### input()

> **input**(`surfaceId`, `value`): `Promise`\<`void`\>

Defined in: [testing.ts:424](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L424)

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

Defined in: [testing.ts:429](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L429)

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

### formChange()

> **formChange**(`surfaceId`, `fieldId`, `value`): `Promise`\<`void`\>

Defined in: [testing.ts:434](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L434)

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

Defined in: [testing.ts:439](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L439)

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

Defined in: [testing.ts:444](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L444)

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
