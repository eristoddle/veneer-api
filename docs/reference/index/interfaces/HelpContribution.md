# Interface: HelpContribution

Defined in: [index.ts:4290](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4290)

`contributes.help` (Story 31.1, AD-5): the plugin's Help chapter. `file` is a markdown file
inside the plugin folder (no leading `/`, no `..`, ending in `.md`); `title` defaults to the
plugin's `name`. The kernel reads the file only when the writer opens the chapter, so no
plugin code runs to show it. In the chapter, a link `[New note](command:my-plugin:new-note)`
runs that command (and closes Help); only `command:` and `https:` links are live. Example:
`"help": { "file": "HELP.md", "title": "My plugin" }`.

## Properties

### file

> **file**: `string`

Defined in: [index.ts:4291](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4291)

***

### title?

> `optional` **title?**: `string`

Defined in: [index.ts:4292](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4292)
