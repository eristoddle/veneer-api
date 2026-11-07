# Variable: WORKSPACE\_ERROR

> `const` **WORKSPACE\_ERROR**: `object`

Defined in: [index.ts:5556](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L5556)

Error codes from `api.workspace.createFromTemplate` (Epic 20).

## Type Declaration

### cancelled

> `readonly` **cancelled**: `"workspace/cancelled"` = `'workspace/cancelled'`

The writer cancelled the title question.

### noTemplate

> `readonly` **noTemplate**: `"workspace/no-template"` = `'workspace/no-template'`

The open project's type has no template with that ID.

### badDate

> `readonly` **badDate**: `"workspace/bad-date"` = `'workspace/bad-date'`

`createFromTemplate` got a `date` that is not an ISO date naming a real day (0.55.0).

### badLook

> `readonly` **badLook**: `"workspace/bad-look"` = `'workspace/bad-look'`

`setPageLook` named a font the plugin does not declare, or a color that is not one (0.55.0).

### badPattern

> `readonly` **badPattern**: `"workspace/bad-pattern"` = `'workspace/bad-pattern'`

`createFromTemplate` got a `pattern` that is not a safe `.md` name pattern (0.55.0).
