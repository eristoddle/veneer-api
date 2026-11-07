# Variable: PROJECT\_DATA\_ERROR

> `const` **PROJECT\_DATA\_ERROR**: `object`

Defined in: [index.ts:4615](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4615)

Error codes for `api.projectData` (Story 9.26).

## Type Declaration

### noProject

> `readonly` **noProject**: `"projectData/no-project"` = `'projectData/no-project'`

A loose file is open: project data needs a project folder.

### invalid

> `readonly` **invalid**: `"projectData/invalid"` = `'projectData/invalid'`

The file on disk is not valid JSON; it is left as it is.

### tooLarge

> `readonly` **tooLarge**: `"projectData/too-large"` = `'projectData/too-large'`

A value over 1 MB, or a plugin's data over 20 MB in the project.

### badKey

> `readonly` **badKey**: `"projectData/bad-key"` = `'projectData/bad-key'`

A key that is not allowed.
