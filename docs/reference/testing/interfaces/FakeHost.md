# Interface: FakeHost

Defined in: [testing.ts:227](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L227)

## Properties

### history

> `readonly` **history**: [`FakeHistory`](FakeHistory.md)

Defined in: [testing.ts:229](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L229)

The in-memory history `api.history` reads and writes (Story 9.13).

***

### notices

> `readonly` **notices**: `object`[]

Defined in: [testing.ts:231](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L231)

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

Defined in: [testing.ts:233](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L233)

The JSON text `api.projectData` holds for this plugin, by key (Story 9.26).

***

### netRequests

> `readonly` **netRequests**: [`NetRequest`](../../index/interfaces/NetRequest.md)[]

Defined in: [testing.ts:237](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L237)

Every `api.net.fetch` request that was allowed through, in order.

***

### secrets

> `readonly` **secrets**: `Map`\<`string`, `string`\>

Defined in: [testing.ts:239](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L239)

The secrets `api.secrets` holds for this plugin, by name (Story 9.8).

***

### exported

> `readonly` **exported**: [`ExportFile`](../../index/interfaces/ExportFile.md)[]

Defined in: [testing.ts:241](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L241)

Every file `api.export.saveAs` was given, in order; the fake "writer" always saves (Story 9.8).

***

### modelRequests

> `readonly` **modelRequests**: [`PluginCompletion`](../../index/interfaces/PluginCompletion.md)[]

Defined in: [testing.ts:243](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L243)

Every `api.providers` request that was allowed through, in order.

***

### api

> `readonly` **api**: [`PluginApi`](../../index/interfaces/PluginApi.md)

Defined in: [testing.ts:245](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L245)

The API object handed to `onload`.

***

### edits

> `readonly` **edits**: [`FakeEdit`](FakeEdit.md)[]

Defined in: [testing.ts:288](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L288)

Every edit applied to the open document, in order.

***

### modes

> `readonly` **modes**: `ReadonlyMap`\<`string`, `unknown`\>

Defined in: [testing.ts:290](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L290)

Live `api.editor.registerMode` registrations: mode ID to its extension set.

***

### blockRenderers

> `readonly` **blockRenderers**: `ReadonlyMap`\<`string`, [`BlockRenderer`](../../index/type-aliases/BlockRenderer.md)\>

Defined in: [testing.ts:292](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L292)

Live `api.editor.registerBlockRenderer` registrations: contribution ID to its handler.

***

### marks

> `readonly` **marks**: `ReadonlyMap`\<`string`, [`Mark`](../../index/interfaces/Mark.md)[]\>

Defined in: [testing.ts:297](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L297)

The marks the plugin has set with `api.editor.setMarks` (Story 9.17): set ID to its marks.
Opening another document or switching project clears them, as the kernel does.

***

### files

> `readonly` **files**: `Map`\<`string`, `string`\>

Defined in: [testing.ts:304](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L304)

Closed files by API path; `vault.process` reads and writes here.

***

### images

> `readonly` **images**: [`FakeSavedImage`](FakeSavedImage.md)[]

Defined in: [testing.ts:308](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L308)

Every `vault.saveImage` call, in order.

***

### views

> `readonly` **views**: `ReadonlyMap`\<`string`, [`SurfaceView`](../../index/type-aliases/SurfaceView.md)\>

Defined in: [testing.ts:322](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L322)

The last view `api.surfaces.setView` gave each declared surface, by surface ID.

***

### opens

> `readonly` **opens**: `string`[]

Defined in: [testing.ts:333](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L333)

Every path `workspace.open` opened, in order.

***

### paletteItems

> `readonly` **paletteItems**: `ReadonlyMap`\<`string`, [`PaletteItem`](../../index/interfaces/PaletteItem.md)[]\>

Defined in: [testing.ts:347](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L347)

The last items `api.palette.setItems` gave each declared provider, by provider ID.

***

### folders

> `readonly` **folders**: `Set`\<`string`\>

Defined in: [testing.ts:353](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L353)

Empty folders `createFolder` made (folders holding a file show through `files`).

***

### created

> `readonly` **created**: `string`[]

Defined in: [testing.ts:355](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L355)

Every path `vault.create` and `createFolder` made, in order.

***

### renames

> `readonly` **renames**: `object`[]

Defined in: [testing.ts:357](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L357)

Every rename or move, in order.

#### from

> **from**: `string`

#### to

> **to**: `string`

#### kind

> **kind**: `"file"` \| `"folder"`

***

### trashed

> `readonly` **trashed**: `string`[]

Defined in: [testing.ts:359](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L359)

Every path `vault.trash` trashed, in order.

***

### begunRowActions

> `readonly` **begunRowActions**: `object`[]

Defined in: [testing.ts:366](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L366)

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

Defined in: [testing.ts:368](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L368)

Every query `vault.search` searched (an empty one never searches), in order.

***

### selections

> `readonly` **selections**: `object`[]

Defined in: [testing.ts:375](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L375)

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

Defined in: [testing.ts:402](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L402)

Every `surfaces.show` call, by surface ID, in order.

***

### shownFocus

> `readonly` **shownFocus**: (`string` \| `undefined`)[]

Defined in: [testing.ts:404](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L404)

The `focus` option of every `surfaces.show` call, one entry per call (Story 9.23).

***

### closed

> `readonly` **closed**: `string`[]

Defined in: [testing.ts:406](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L406)

Every `surfaces.close` call, in order (Story 9.22).

## Methods

### projectDataChanged()

> **projectDataChanged**(`key`): `Promise`\<`void`\>

Defined in: [testing.ts:235](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L235)

Simulates a pull or checkout changing `key` on disk: emits `project-data:changed` to the plugin.

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`void`\>

***

### load()

> **load**(): `Promise`\<`void`\>

Defined in: [testing.ts:247](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L247)

Calls `onload(api)`.

#### Returns

`Promise`\<`void`\>

***

### run()

> **run**(`commandId`, ...`args`): `Promise`\<`unknown`\>

Defined in: [testing.ts:249](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L249)

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

Defined in: [testing.ts:251](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L251)

Delivers an event to every listener the plugin subscribed for its `type`.

#### Parameters

##### event

[`VeneerEvent`](../../index/interfaces/VeneerEvent.md)

#### Returns

`Promise`\<`void`\>

***

### switchProject()

> **switchProject**(`project`, `next?`): `Promise`\<`void`\>

Defined in: [testing.ts:257](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L257)

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

Defined in: [testing.ts:262](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L262)

Calls `onunload()` and disposes everything the plugin registered.

#### Returns

`Promise`\<`void`\>

***

### liveDisposables()

> **liveDisposables**(): `number`

Defined in: [testing.ts:264](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L264)

How many registrations and subscriptions are still live.

#### Returns

`number`

***

### mountEditor()

> **mountEditor**(`parent`): [`EditorHost`](../../index/interfaces/EditorHost.md)

Defined in: [testing.ts:272](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L272)

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

Defined in: [testing.ts:274](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L274)

The open document's text, or null.

#### Returns

`string` \| `null`

***

### setText()

> **setText**(`text`): `void`

Defined in: [testing.ts:276](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L276)

Replaces the open document's text (null: no document). Not recorded as an edit.

#### Parameters

##### text

`string` \| `null`

#### Returns

`void`

***

### changeText()

> **changeText**(`text`): `void`

Defined in: [testing.ts:281](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L281)

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

Defined in: [testing.ts:286](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L286)

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

Defined in: [testing.ts:302](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L302)

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

Defined in: [testing.ts:306](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L306)

Flips the remote allowance and fires `resources.onChanged` listeners.

#### Parameters

##### on

`boolean`

#### Returns

`void`

***

### setImageFailure()

> **setImageFailure**(`code`): `void`

Defined in: [testing.ts:310](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L310)

Makes later `vault.saveImage` calls reject with `code`, or succeed again with null.

#### Parameters

##### code

`string` \| `null`

#### Returns

`void`

***

### holdImages()

> **holdImages**(): () => `void`

Defined in: [testing.ts:315](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L315)

Holds every later `vault.saveImage` until the returned release is called, so a test can
edit the document while a save is in flight.

#### Returns

() => `void`

***

### setSetting()

> **setSetting**(`id`, `value`): `void`

Defined in: [testing.ts:320](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L320)

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

Defined in: [testing.ts:327](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L327)

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

Defined in: [testing.ts:329](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L329)

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

Defined in: [testing.ts:331](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L331)

Calls every live `onRefresh` handler for `surfaceId`, as the kernel does before a redraw.

#### Parameters

##### surfaceId

`string`

#### Returns

`Promise`\<`void`\>

***

### runTool()

> **runTool**(`id`, `input?`, `signal?`, `report?`): `Promise`\<[`ToolResult`](../../index/type-aliases/ToolResult.md)\>

Defined in: [testing.ts:340](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L340)

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

Defined in: [testing.ts:349](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L349)

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

Defined in: [testing.ts:351](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L351)

Calls every live `palette.onRefresh` handler for the provider, as entering files mode does.

#### Parameters

##### providerId

`string`

#### Returns

`Promise`\<`void`\>

***

### rowAction()

> **rowAction**(`surfaceId`, `actionId`, `rowId`, `value?`): `Promise`\<`unknown`\>

Defined in: [testing.ts:364](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L364)

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

Defined in: [testing.ts:373](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L373)

Holds every later `vault.search` until the returned release is called. A search started
while another is held supersedes it: the held one rejects `vault/superseded` on release.

#### Returns

() => `void`

***

### input()

> **input**(`surfaceId`, `value`): `Promise`\<`void`\>

Defined in: [testing.ts:380](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L380)

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

Defined in: [testing.ts:385](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L385)

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

Defined in: [testing.ts:390](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L390)

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

Defined in: [testing.ts:395](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L395)

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

Defined in: [testing.ts:400](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L400)

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
