# Variable: PROJECT\_DATA\_ERROR

> `const` **PROJECT\_DATA\_ERROR**: `object`

Defined in: [index.ts:3241](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3241)

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
