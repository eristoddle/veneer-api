# Tools and results

A **tool** is what the writer picks in the selection box after highlighting text: type `/`, choose a tool, get options. A tool never edits the page itself. It returns a **Result**, and only the kernel applies it, as one undo step, when the writer picks.

## Declaring a tool

```json
{
  "contributes": {
    "tools": [
      {
        "id": "my-plugin:shout",
        "name": "Shout",
        "description": "Make the selection upper case.",
        "appliesTo": ["word", "sentence", "paragraph"],
        "context": ["selection"],
        "readOnly": false,
        "needsProvider": false,
        "worksWithoutSelection": false
      }
    ]
  }
}
```

- `appliesTo`: selection kinds the tool works on: `word`, `phrase`, `sentence`, `paragraph`, or `any`. The box lists only tools that apply. How Veneer decides what a selection is: no whitespace in it is a **word**; a newline in it, or more than one sentence, is a **paragraph**; exactly one sentence ending in `.`, `!` or `?` (a closing quote or bracket may follow) is a **sentence**; anything else is a **phrase**. So a multi-paragraph selection is a paragraph, and a tool that applies to `sentence` is not offered on it.
- `context`: what the kernel assembles for your handler: any of `selection`, `paragraph`, `section`, `title`, `frontmatter`, `document`. Ask for the least you need; a bigger context is also what a remote model would be sent.
- `needsProvider`: true if you call `api.providers`. The first send to a remote provider shows the writer a disclosure.
- `worksWithoutSelection`: also offered with just a caret.
- `readOnly`: the tool only reads; see below.

**Required and optional.** `id`, `name`, `description`, and `appliesTo` are required. The rest may be left out of the manifest and default as shown: `context` is `["selection"]`, and `worksWithoutSelection`, `needsProvider`, and `readOnly` are `false`. `name` and `description` are one line of at most 200 characters each; the box searches both when the writer types after `/`.

## The handler

```ts
api.tools.handle('my-plugin:shout', async (input, signal, report) => {
  const text = input.selection?.text ?? ''
  return { kind: 'replace', options: [text.toUpperCase()] }
})
```

`input` has the context you declared. `signal` aborts when the writer closes the box or runs another tool. `report(options)` shows options as they arrive while you are still working (a model streaming several versions, say); the last call's list is the one you return.

## Results

- `{ kind: 'replace', options: string[] }`: replacement texts. The writer picks one (arrow keys or a click) and it replaces the selection. At least one option. An option is **plain text**: there is no separate label or preview, the box shows the option itself, numbered in the order you give, and inserts it exactly as written. Multi-line text is fine. Make each option recognizable on sight, and put your best one first.
- `{ kind: 'insert', text }`: text to insert at the caret or after the selection.
- `{ kind: 'info', items: [{ text, insertable? }] }`: something to read, such as synonyms, a count, or "Nothing to list here." The box shows the items as rows of text. An `insertable` item can be picked to insert it; the others are only read. A tool that applies to a selection may always answer `info` instead of options.

Returning anything else rejects with `plugin/bad-result` and fails the plugin.

## Tools with side effects

A tool that is not `readOnly` and writes another file (`api.vault.create`, `createFolder`, `rename`, `trash`, `saveImage`, or `process` on a file other than the open one) is **confirmed by the writer the first time**: the box names the effect ("Back up from My Plugin wants to create backup.md. Allow it?"). Declining ends the run with nothing written, and it is not counted as a failure. After Allow, that tool runs without asking again.

A tool marked `readOnly: true` is never asked and is refused outright if it tries to write a file.

Writes made outside a tool run (a command, an event handler) are not confirmed.

## Tools are commands too

Every tool is also a palette command and can take a key, with no extra work. Running it raises the selection box on the current selection.
