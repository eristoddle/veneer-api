# Interface: ObsidianDailyNotes

Defined in: [index.ts:1019](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1019)

Obsidian's daily-notes settings in the open project (`.obsidian/daily-notes.json`), as
`api.workspace.obsidianDailyNotes` reads them (Story 28.4). Obsidian's own defaults fill what
the file leaves out.

## Properties

### folder

> **folder**: `string`

Defined in: [index.ts:1021](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1021)

The folder daily notes live in, project-relative, no slashes at the ends; '' for the root.

***

### format

> **format**: `string`

Defined in: [index.ts:1023](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1023)

A moment-style date format, `YYYY-MM-DD` by default; may hold `/` for sub-folders.

***

### template

> **template**: `string`

Defined in: [index.ts:1025](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1025)

A project-relative path to the template note, or '' for none.
