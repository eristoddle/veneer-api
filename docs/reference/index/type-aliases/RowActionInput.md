# Type Alias: RowActionInput

> **RowActionInput** = `"name"` \| `"new-name"` \| `"folder"` \| `"confirm"`

Defined in: [index.ts:972](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L972)

How the kernel asks for a row action's value (AD-4): plugins never draw an input or a
confirmation.
- `name`: the row's label becomes a text field holding it, the part before an image's
  extension selected; Enter or a click away commits, Esc cancels. The value is the new name.
- `new-name`: an empty field in a new row inside the target folder: the folder row it was
  started on, else the started row's folder, else the root. The value is the name typed.
- `folder`: the palette card lists the root (`''`) and every folder row except the row
  itself, its descendants, and its parent; the value is the picked folder row's ID.
- `confirm`: the row reads `prompt`, with "↵ <verb> · esc cancel" beside it; Enter confirms
  and there is no value.
An empty or unchanged name, Esc, or a click away from a confirmation does nothing; a name
with a `/` is refused with a notice.
