# Interface: HistoryApi

Defined in: [index.ts:3188](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L3188)

Save points and history for the open project (Story 9.13, AD-20), kept as plain git in the
project folder on the writer's own computer, so other git tools (GitWrite, the command line)
see the same history. Veneer does the git work itself; the writer needs no git installed.
The API uses git's terms (commit, branch); a plugin shows the writer's own words. A loose file
has no history: every call rejects `history/no-project`.

## Methods

### isRepository()

> **isRepository**(): `Promise`\<`boolean`\>

Defined in: [index.ts:3197](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L3197)

Whether the open project folder is a git repository (its own `.git`, not a parent's).

#### Returns

`Promise`\<`boolean`\>

#### Example

```ts
if (!(await api.history.isRepository())) console.log('No history yet')
```

***

### init()

> **init**(): `Promise`\<`boolean`\>

Defined in: [index.ts:3209](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L3209)

Makes the open project a repository, with a `.gitignore` that keeps out only derived
files (`.veneer/cache/`, `.DS_Store`). Resolves true when it made one, false when the
project already was one (left untouched).

#### Returns

`Promise`\<`boolean`\>

#### Example

```ts
const created = await api.history.init()
console.log(created ? 'History started' : 'History was already on')
```

***

### save()

> **save**(`message`): `Promise`\<[`HistoryCommit`](HistoryCommit.md) \| `null`\>

Defined in: [index.ts:3222](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L3222)

Saves the open document, then commits every change in the project (images and other files
too, and deletions) as the writer, with `message`. Resolves with the new commit, or null
when nothing changed. `history:saved` follows a commit. Rejects
`history/not-a-repository` before `init`.

#### Parameters

##### message

`string`

#### Returns

`Promise`\<[`HistoryCommit`](HistoryCommit.md) \| `null`\>

#### Example

```ts
const commit = await api.history.save('Finished chapter three')
if (commit !== null) console.log(`Saved ${commit.id.slice(0, 7)}`)
```

***

### log()

> **log**(`options?`): `Promise`\<[`HistoryCommit`](HistoryCommit.md)[]\>

Defined in: [index.ts:3233](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L3233)

Commits newest first, for the whole project or one file, on the current branch or another.
An empty repository lists none. An unknown branch rejects `history/not-found`.

#### Parameters

##### options?

[`HistoryLogOptions`](HistoryLogOptions.md)

#### Returns

`Promise`\<[`HistoryCommit`](HistoryCommit.md)[]\>

#### Example

```ts
const recent = await api.history.log({ path: 'chapters/one.md', limit: 20 })
for (const c of recent) console.log(c.date, c.message)
```

***

### show()

> **show**(`commit`, `path`): `Promise`\<`string`\>

Defined in: [index.ts:3246](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L3246)

A file's text as of a commit (a full ID, or a unique prefix of at least 4 characters),
with `\n` line endings. An unknown commit, or a file that isn't in it, rejects
`history/not-found`.

#### Parameters

##### commit

`string`

##### path

`string`

#### Returns

`Promise`\<`string`\>

#### Example

```ts
const [latest] = await api.history.log({ path: 'chapters/one.md', limit: 1 })
const then = await api.history.show(latest.id, 'chapters/one.md')
console.log(wordDiff(then, api.editor.getText() ?? '').length)
```

***

### branches()

> **branches**(): `Promise`\<[`HistoryBranch`](HistoryBranch.md)[]\>

Defined in: [index.ts:3256](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L3256)

Every branch, sorted by name, with the current one marked.

#### Returns

`Promise`\<[`HistoryBranch`](HistoryBranch.md)[]\>

#### Example

```ts
const current = (await api.history.branches()).find((b) => b.current)
console.log(`On ${current?.name ?? 'no branch'}`)
```

***

### createBranch()

> **createBranch**(`name`): `Promise`\<`void`\>

Defined in: [index.ts:3267](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L3267)

Makes a branch at the current commit, without switching to it. Names are letters, digits,
`.`, `_`, `-`, and `/` between parts. Rejects `history/exists` for a name in use, and
`history/invalid` for a bad name or a repository with no commit yet.

#### Parameters

##### name

`string`

#### Returns

`Promise`\<`void`\>

#### Example

```ts
await api.history.createBranch('ending-b')
```

***

### switchTo()

> **switchTo**(`name`): `Promise`\<`void`\>

Defined in: [index.ts:3279](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L3279)

Saves the open document, then changes the project's files to another branch: they change
on disk, the page reloads, and `history:switched` follows. Every change must already be in
a save point, or it rejects `history/uncommitted` naming the files and changes nothing.

#### Parameters

##### name

`string`

#### Returns

`Promise`\<`void`\>

#### Example

```ts
await api.history.save('Before trying the other ending')
await api.history.switchTo('ending-b')
```

***

### merge()

> **merge**(`name`): `Promise`\<[`HistoryCommit`](HistoryCommit.md) \| `null`\>

Defined in: [index.ts:3292](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L3292)

Saves the open document, then merges another branch into the current one: a fast-forward
or a clean three-way merge, and the files on disk follow. Resolves with the new commit, or
null when there was nothing to merge. A conflict rejects `history/conflict` naming the
files and changes nothing; uncommitted changes reject `history/uncommitted`.

#### Parameters

##### name

`string`

#### Returns

`Promise`\<[`HistoryCommit`](HistoryCommit.md) \| `null`\>

#### Example

```ts
const merged = await api.history.merge('ending-b')
console.log(merged === null ? 'Already there' : merged.message)
```

***

### tags()

> **tags**(): `Promise`\<[`HistoryTag`](HistoryTag.md)[]\>

Defined in: [index.ts:3301](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L3301)

Every tag, sorted by name, with the commit it names.

#### Returns

`Promise`\<[`HistoryTag`](HistoryTag.md)[]\>

#### Example

```ts
for (const tag of await api.history.tags()) console.log(tag.name, tag.commit.slice(0, 7))
```

***

### createTag()

> **createTag**(`name`, `commit?`, `message?`): `Promise`\<`void`\>

Defined in: [index.ts:3311](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L3311)

Names a commit (the current one by default) as a milestone, with an optional message.
Rejects `history/exists` for a name in use.

#### Parameters

##### name

`string`

##### commit?

`string`

##### message?

`string`

#### Returns

`Promise`\<`void`\>

#### Example

```ts
await api.history.createTag('first-draft', undefined, 'Sent to beta readers')
```

***

### commitOn()

> **commitOn**(`branch`, `message`, `options`): `Promise`\<[`HistoryCommit`](HistoryCommit.md)\>

Defined in: [index.ts:3329](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L3329)

Writes a commit onto another branch without switching to it or touching the files: a
message-only commit (git's `--allow-empty`), so `allowEmpty: true` is required. `log({
branch })` returns its full message, so a plugin can keep structured data in commits, as
GitWrite's annotations do.

#### Parameters

##### branch

`string`

##### message

`string`

##### options

###### allowEmpty

`boolean`

#### Returns

`Promise`\<[`HistoryCommit`](HistoryCommit.md)\>

#### Example

```ts
await api.history.createBranch('feedback')
const note = await api.history.commitOn(
  'feedback',
  'Annotation: chapters/one.md\n\ncomment: Tighten this.\n',
  { allowEmpty: true }
)
console.log(note.body)
```

***

### remotes()

> **remotes**(): `Promise`\<[`HistoryRemote`](HistoryRemote.md)[]\>

Defined in: [index.ts:3343](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L3343)

The project's remotes, with any credentials taken out of the address.

#### Returns

`Promise`\<[`HistoryRemote`](HistoryRemote.md)[]\>

#### Example

```ts
const origin = (await api.history.remotes()).find((r) => r.name === 'origin')
console.log(origin?.url ?? 'Not connected')
```

***

### setRemote()

> **setRemote**(`name`, `url`): `Promise`\<`void`\>

Defined in: [index.ts:3354](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L3354)

Adds or replaces a remote. Only `https://` (or `http://`) addresses: an SSH remote rejects
`history/ssh-unsupported`, and an address holding a user or token rejects
`history/invalid` (pass the token to `sync` instead).

#### Parameters

##### name

`string`

##### url

`string`

#### Returns

`Promise`\<`void`\>

#### Example

```ts
await api.history.setRemote('origin', 'https://github.com/writer/novel.git')
```

***

### sync()

> **sync**(`options?`): `Promise`\<[`HistorySyncResult`](HistorySyncResult.md)\>

Defined in: [index.ts:3370](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L3370)

Saves the open document, then fetches from the remote, fast-forwards or merges cleanly,
and pushes, over HTTPS through Veneer's network rules. The first sync to a host asks the
writer in a notice (shared with `api.net.fetch`); a decline sends nothing and rejects
`plugin/declined`. A conflict changes nothing and rejects `history/conflict` naming the
files; uncommitted changes reject `history/uncommitted`; an SSH remote rejects
`history/ssh-unsupported`. Only the current branch syncs.

#### Parameters

##### options?

[`HistorySyncOptions`](HistorySyncOptions.md)

#### Returns

`Promise`\<[`HistorySyncResult`](HistorySyncResult.md)\>

#### Example

```ts
const token = (await api.secrets.get('github-token')) ?? undefined
const result = await api.history.sync({ remote: 'origin', token })
console.log(result.upToDate ? 'Up to date' : `Pushed: ${result.pushed}`)
```
