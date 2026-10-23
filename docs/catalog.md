# The variable catalog

The `--vn-*` variables are the stable contract for Veneer's appearance (see [unstable](guides/unstable.md) for what is not). The catalog has its own semantic version, kept apart from the API's. It is the version in the first comment of `catalog.css`, the last entry of `tests/support/catalog-releases.json`, and the one named below; a test fails if any of them disagree with the variables the catalog really defines.

**Current catalog version: 0.4.0**

## What the catalog holds

- `--vn-*`: Veneer's own tokens: the 18 color tokens and the 11 syntax colors (each with a light value in `:root` and a dark value in `:root[data-theme='dark']`), radii, spacing, elevation, the focus ring, and the type scale.
- `--vnp-<pluginId>-<token>`: a plugin's own color tokens (`contributes.colors`), added when the plugin is on and each with a light and a dark default. They are not part of Veneer's catalog and never change its version: a plugin's names can't collide with Veneer's or with another plugin's, because the plugin ID is in the name.

## When the version changes

Adding, renaming, or removing a `--vn-*` token changes the catalog's version, and the change is recorded below:

- **Adding** a token is a minor change (0.x.0 while the catalog is below 1.0).
- **Renaming or removing** a token is a **breaking** change: it gets its own entry with a `Migration:` line saying what a plugin or a custom stylesheet should use instead.
- A token's *value* changing (a color adjusted) is a patch change and is not listed here.

## Versions

### 0.4.0

Adds the kind tints (Story 9.21): `--vn-kind-note`, `-flag`, `-change`, `-person`, `-place`, `-thing`, `-event`, and `-neutral`, each with a light and a dark value. A plugin tags an item with a kind name and the host picks the tint; a plugin never passes a color, and an unknown kind draws as `neutral`. The tints are quiet washes with no saturated color; text on them stays `--vn-text`.

- Added: the eight `--vn-kind-*` tokens.
- Breaking changes: none.

### 0.3.0

Adds the syntax colors (Story 9.5, AD-19): `--vn-syntax-keyword`, `-string`, `-comment`, `-number`, `-function`, `-type`, `-variable`, `-operator`, `-punctuation`, `-tag`, and `-attribute`, each with a light value in `:root` and a dark value in `:root[data-theme='dark']`. A theme may set them, and so may a code theme (a theme with `"scope": "code"`).

- Added: the eleven `--vn-syntax-*` tokens.
- Breaking changes: none.

### 0.2.0

First version recorded here. The catalog at this point has the light values, the dark pair (Story 8.2), the page and theme tokens, and the `--vnp-` convention for plugin tokens (Story 8.4).

- Added: the dark value of every color token (`:root[data-theme='dark']`).
- Breaking changes: none.

Earlier work added tokens one story at a time without a recorded version; 0.2.0 is the baseline from which changes are tracked.

## Tokens in 0.2.0

- `--vn-accent`
- `--vn-accent-hover`
- `--vn-accent-tint`
- `--vn-card-pad-x`
- `--vn-card-pad-y`
- `--vn-control-gap`
- `--vn-divider`
- `--vn-elevation-2`
- `--vn-elevation-3`
- `--vn-focus-ring`
- `--vn-kbd-font-family`
- `--vn-kbd-font-size`
- `--vn-kind-change`
- `--vn-kind-event`
- `--vn-kind-flag`
- `--vn-kind-neutral`
- `--vn-kind-note`
- `--vn-kind-person`
- `--vn-kind-place`
- `--vn-kind-thing`
- `--vn-measure`
- `--vn-page`
- `--vn-page-body-font-family`
- `--vn-page-body-font-size`
- `--vn-page-body-font-weight`
- `--vn-page-body-line-height`
- `--vn-page-code-font-family`
- `--vn-page-code-font-size`
- `--vn-page-h1-font-family`
- `--vn-page-h1-font-size`
- `--vn-page-h1-font-weight`
- `--vn-page-h1-letter-spacing`
- `--vn-page-h1-line-height`
- `--vn-page-h2-font-family`
- `--vn-page-h2-font-size`
- `--vn-page-h2-font-weight`
- `--vn-page-h2-line-height`
- `--vn-page-pad-bottom`
- `--vn-page-pad-top`
- `--vn-page-pad-x`
- `--vn-palette-offset-top`
- `--vn-palette-width`
- `--vn-panel-width`
- `--vn-panel-width-max`
- `--vn-panel-width-min`
- `--vn-result-text-font-family`
- `--vn-result-text-font-size`
- `--vn-result-text-font-weight`
- `--vn-result-text-line-height`
- `--vn-rounded-full`
- `--vn-rounded-lg`
- `--vn-rounded-md`
- `--vn-rounded-sm`
- `--vn-rounded-xl`
- `--vn-row-pad-x`
- `--vn-row-pad-y`
- `--vn-rule`
- `--vn-selection-gap`
- `--vn-shadow-ink`
- `--vn-shadow-ink-deep`
- `--vn-surface-code`
- `--vn-surface-control`
- `--vn-surface-overlay`
- `--vn-surface-panel`
- `--vn-syntax-attribute`
- `--vn-syntax-comment`
- `--vn-syntax-function`
- `--vn-syntax-keyword`
- `--vn-syntax-number`
- `--vn-syntax-operator`
- `--vn-syntax-punctuation`
- `--vn-syntax-string`
- `--vn-syntax-tag`
- `--vn-syntax-type`
- `--vn-syntax-variable`
- `--vn-text`
- `--vn-text-faint`
- `--vn-text-muted`
- `--vn-text-placeholder`
- `--vn-text-plugin-label`
- `--vn-text-subtle`
- `--vn-top-bar-height`
- `--vn-top-bar-pad-x`
- `--vn-ui-body-font-family`
- `--vn-ui-body-font-size`
- `--vn-ui-body-font-weight`
- `--vn-ui-body-line-height`
- `--vn-ui-caption-font-family`
- `--vn-ui-caption-font-size`
- `--vn-ui-caption-font-weight`
- `--vn-ui-caption-line-height`
- `--vn-ui-label-font-family`
- `--vn-ui-label-font-size`
- `--vn-ui-label-font-weight`
- `--vn-ui-label-line-height`
- `--vn-ui-micro-font-family`
- `--vn-ui-micro-font-size`
- `--vn-ui-micro-font-weight`
- `--vn-unit`
