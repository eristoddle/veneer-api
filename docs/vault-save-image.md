# `api.vault.saveImage`

Saves image bytes for the open document and returns the pieces of the markdown link to insert (FR-62, AD-14). The core editor plugin uses it for pasted and dropped images; any plugin may.

```ts
saveImage(bytes: Uint8Array, name?: string): Promise<SavedImage>

interface SavedImage {
  link: string // relative to the document, `/` separators, percent-encoded
  alt: string  // the saved file's stem, with `\`, `[`, `]` escaped
}
```

Insert it as `![${alt}](${link})`.

## Where the file goes

- Into the open document's own folder. There is no app-wide image folder.
- For a document in a project, `.veneer/config.json` may set `imageFolder`, relative to the project root: `{ "schemaVersion": 1, "imageFolder": "assets" }`. The folder is created if missing. A folder that is absolute or leads outside the project (including through a symlink) is refused with `vault/bad-image-folder`. Loose files ignore it.
- On the untitled page, the kernel first does the page's first save (creating `Untitled.md` in the default folder), then saves the image beside it.

## Names

- Without `name` (a paste): `image-YYYYMMDD-HHMMSS.<ext>`, local time.
- With `name` (a drop): the file's own name, made filesystem-safe. Its extension stays if it matches the content (`.JPG`, `.jpeg`), otherwise the sniffed one replaces it.
- A name that is taken is numbered `-2`, `-3`, and so on. An existing file is never overwritten.

## Types and limits

The type is sniffed from the bytes, never the name: PNG, JPEG, GIF, WebP, or SVG. Anything else rejects with `vault/not-image`. More than `MAX_IMAGE_BYTES` (25 MB) rejects with `vault/too-large`. Images are written as given, never resized or converted.

## Errors

On any failure the kernel raises one plain notice ("Couldn't add the image: …") and the promise rejects with a `VeneerError` carrying `pluginId`: `vault/not-image`, `vault/too-large`, `vault/bad-image-folder`, `vault/write-failed`, `vault/read-only`, `vault/unknown-document` (the document was switched or closed while the image was saving), `editor/unavailable` (no document), or `plugin/unavailable`. Plugins don't need to raise their own notice (they can't, AD-4).

## Drawing local images

`api.resources.imageSource(src)` maps a relative source (`isRelativeSource`) to a kernel-owned URL, `veneer-doc://img?p=<encoded source>&g=<generation>`. `g` changes each time a document opens, so two documents' `cat.png` never share a cached image; treat the URL as opaque. Main resolves it against the open document's folder, refuses anything outside the project or loose folder, anything without an image extension, and anything whose bytes aren't an image. Absolute paths and `file:` sources return null and stay as text. An SVG is drawn only as an `<img>`, so any script inside it never runs.
