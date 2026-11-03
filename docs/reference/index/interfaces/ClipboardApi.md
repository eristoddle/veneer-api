# Interface: ClipboardApi

Defined in: [index.ts:3427](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3427)

The system clipboard (Story 11.2, AD-6). Main reads and writes it; a plugin never touches the
clipboard itself.

## Methods

### readText()

> **readText**(): `Promise`\<`string`\>

Defined in: [index.ts:3437](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3437)

The clipboard's plain text, or an empty string when it holds none.

#### Returns

`Promise`\<`string`\>

#### Example

```ts
const text = await api.clipboard.readText()
if (/^https?:///.test(text.trim())) console.log('The clipboard holds a link')
```

***

### write()

> **write**(`content`): `Promise`\<`void`\>

Defined in: [index.ts:3447](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3447)

Replaces the clipboard with plain text, or with HTML that has the plain text as its fallback.
Rejects `clipboard/invalid` for a non-string or an oversized value.

#### Parameters

##### content

[`ClipboardContent`](ClipboardContent.md)

#### Returns

`Promise`\<`void`\>

#### Example

```ts
await api.clipboard.write({ text: 'Chapter one', html: '<h1>Chapter one</h1>' })
```

***

### writeImage()

> **writeImage**(`path`): `Promise`\<`void`\>

Defined in: [index.ts:3457](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3457)

Replaces the clipboard with an image from the open project, by API path (`images/cover.png`).
Rejects `clipboard/bad-image` for anything that is not an image inside the project.

#### Parameters

##### path

`string`

#### Returns

`Promise`\<`void`\>

#### Example

```ts
await api.clipboard.writeImage('images/cover.png')
```

***

### writePath()

> **writePath**(`path`, `form`): `Promise`\<`void`\>

Defined in: [index.ts:3470](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3470)

Replaces the clipboard with the path of a file or folder in the open project, by API path
(`chapters/one.md`). `'full'` is the whole path on disk; `'project'` is the API path itself,
relative to the project root with forward slashes. A plugin never sees the folder's real
path (AD-6): main resolves it. Rejects `clipboard/invalid` for a path outside the project,
and for `'project'` when a loose file is open (it has no project root).

#### Parameters

##### path

`string`

##### form

[`ClipboardPathForm`](../type-aliases/ClipboardPathForm.md)

#### Returns

`Promise`\<`void`\>

#### Example

```ts
await api.clipboard.writePath('chapters/one.md', 'project')
```
