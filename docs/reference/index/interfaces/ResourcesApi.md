# Interface: ResourcesApi

Defined in: [index.ts:2224](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2224)

How documents' HTML and images reach the page (FR-46, AD-16). The kernel decides; plugins
never load a remote resource themselves.

## Methods

### sanitizeHtml()

> **sanitizeHtml**(`html`): `DocumentFragment`

Defined in: [index.ts:2236](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2236)

Sanitizes untrusted HTML into an inert fragment: no scripts, styles, frames, forms, event
handlers, `style` attributes, or link targets. Images in it follow `imageSource`; a
blocked remote one becomes the kernel's placeholder.

#### Parameters

##### html

`string`

#### Returns

`DocumentFragment`

#### Example

```ts
const fragment = api.resources.sanitizeHtml('<p onclick="x()">Hi <script>bad()</script></p>')
mount.append(fragment)
```

***

### sanitizeSvg()

> **sanitizeSvg**(`svg`): `DocumentFragment`

Defined in: [index.ts:2250](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2250)

An SVG drawing (a diagram's output) as an inert fragment (Story 9.6, AD-16): like
`sanitizeHtml`, but it keeps what a drawing needs to look right, its `<style>` and `style`
attributes and its ids, and drops scripts, `foreignObject`, images, animation, event
handlers, links, and any CSS `url()` that isn't a `#fragment` or `@import`, so nothing in it
can run or load. The fragment is the SVG element, or empty if nothing survives.

#### Parameters

##### svg

`string`

#### Returns

`DocumentFragment`

#### Example

```ts
const fragment = api.resources.sanitizeSvg('<svg viewBox="0 0 4 4"><circle r="2" cx="2" cy="2"/></svg>')
mount.append(fragment)
```

***

### imageSource()

> **imageSource**(`src`): `string` \| `null`

Defined in: [index.ts:2264](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2264)

The `src` to give an `<img>` for a document's image source: a kernel-owned URL for an
allowed remote one or a relative one (`isRelativeSource`, read from the open document's
folder, FR-62), the source itself for `data:image/*`, and null otherwise. Null for a
remote source (`isRemoteSource`) means it is blocked: draw a quiet placeholder. Any other
null source stays as text.

#### Parameters

##### src

`string`

#### Returns

`string` \| `null`

#### Example

```ts
const src = api.resources.imageSource(markdownImageUrl)
if (src !== null) img.src = src
```

***

### onChanged()

> **onChanged**(`listener`): [`Disposable`](Disposable.md)

Defined in: [index.ts:2274](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2274)

Fires when the remote allowance changes; re-render images and HTML.
Returns a Disposable. The kernel disposes it when the plugin unloads or is turned off; dispose it earlier to stop.

#### Parameters

##### listener

() => `void`

#### Returns

[`Disposable`](Disposable.md)

#### Example

```ts
api.resources.onChanged(() => rerenderImages())
```
