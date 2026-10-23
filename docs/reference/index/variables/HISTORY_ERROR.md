# Variable: HISTORY\_ERROR

> `const` **HISTORY\_ERROR**: `object`

Defined in: [index.ts:2905](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2905)

Error codes for `api.history` (Story 9.13).

## Type Declaration

### noProject

> `readonly` **noProject**: `"history/no-project"` = `'history/no-project'`

A loose file is open: history needs a project folder.

### notRepository

> `readonly` **notRepository**: `"history/not-a-repository"` = `'history/not-a-repository'`

The project is not a repository yet; `init` first.

### notFound

> `readonly` **notFound**: `"history/not-found"` = `'history/not-found'`

An unknown commit, branch, or a file that isn't in the commit.

### invalid

> `readonly` **invalid**: `"history/invalid"` = `'history/invalid'`

A bad argument: an empty message, a path outside the project.

### uncommitted

> `readonly` **uncommitted**: `"history/uncommitted"` = `'history/uncommitted'`

Switching or merging with changes not yet in a save point.

### conflict

> `readonly` **conflict**: `"history/conflict"` = `'history/conflict'`

A merge that conflicts; nothing changed.

### exists

> `readonly` **exists**: `"history/exists"` = `'history/exists'`

A branch or tag name already in use.

### sshUnsupported

> `readonly` **sshUnsupported**: `"history/ssh-unsupported"` = `'history/ssh-unsupported'`

A remote reached over SSH, which Veneer's git cannot do; HTTPS only.

### failed

> `readonly` **failed**: `"history/failed"` = `'history/failed'`

Git failed on disk; the message says what.
