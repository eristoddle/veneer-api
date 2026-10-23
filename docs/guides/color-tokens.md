# Colors and tokens

Veneer's look comes from a catalog of CSS variables. A plugin never picks its own colors, never imports Veneer's styles, and never styles host chrome. There are only two places a plugin touches appearance, and both go through variables.

## Host tokens: `--vn-*`

The kernel draws every list, tree, row, and control from the `--vn-*` catalog (accent, surface, text, and spacing tokens, and the UI and page type scale). The ones a plugin may use inside a raw-DOM view (see [unstable](unstable.md)):

- **Color:** `--vn-text`, `--vn-text-muted`, `--vn-text-subtle`, `--vn-text-faint`, `--vn-text-placeholder`, `--vn-accent`, `--vn-accent-hover`, `--vn-accent-tint`, `--vn-page`, `--vn-surface-panel`, `--vn-surface-control`, `--vn-surface-overlay`, `--vn-surface-code`, `--vn-divider`, `--vn-rule`.
- **Shape and space:** `--vn-unit` (4px), `--vn-rounded-sm`, `--vn-rounded-md`, `--vn-rounded-lg`, `--vn-rounded-xl`, `--vn-row-pad-x`, `--vn-row-pad-y`, `--vn-card-pad-x`, `--vn-card-pad-y`, `--vn-control-gap`.
- **Type:** `--vn-ui-body-*`, `--vn-ui-label-*`, `--vn-ui-caption-*`, `--vn-ui-micro-*` (each with `font-family`, `font-size`, `font-weight`, `line-height`), and the page's `--vn-page-body-*`.
- **Elevation and focus:** `--vn-elevation-2`, `--vn-elevation-3`, `--vn-focus-ring`.

Because the tokens change with the writer's theme (and the dark pair), a view that uses only tokens follows the theme for free. Use no hard-coded colors, no borders (use whitespace and soft fills), and honor Reduce Motion.

## Your own color tokens: `--vnp-<pluginId>-<token>`

A plugin that needs its own colors declares them in the manifest, each with a light and a dark default:

```json
{
  "id": "word-goals",
  "contributes": {
    "colors": [{ "id": "bar", "light": "#3B5F82", "dark": "#8DB1D6" }]
  }
}
```

That makes the variable `--vnp-word-goals-bar` available while the plugin is on. The plugin ID in the name keeps your tokens from colliding with anyone else's and with Veneer's `--vn-*` catalog. Use it in a raw-DOM view (`background: var(--vnp-word-goals-bar)`):

- In light mode it is the `light` color, and in dark mode the `dark` one. **Your plugin never handles a theme switch.**
- A theme that doesn't mention the token leaves your default alone. A theme that sets it overrides your default: a theme names it by its variable, `"--vnp-word-goals-bar": "#B5651D"`, inside its `light` or `dark` object.
- `id` is lowercase words joined by hyphens, declared once; colors are plain (`#RRGGBB`, `#RRGGBBAA`, `rgb(...)`, `rgba(...)`).
- Your tokens are not part of Veneer's catalog and never change [its version](../catalog.md).

## Themes

A plugin can offer a **theme**: a light and dark pair of color values. Declare it in the manifest; the ID is `<pluginId>:<name>`.

```json
{
  "contributes": {
    "themes": [
      {
        "id": "sunset:warm",
        "name": "Warm",
        "light": { "page": "#FFF8E7", "accent": "#B5651D" },
        "dark": { "page": "#2A1F14" }
      }
    ]
  }
}
```

- Each mode sets some of the 29 color tokens (DESIGN.md's 18 and the 11 syntax colors) (or a plugin's own token by its variable name), named without the `--vn-` prefix: `page`, `text`, `text-muted`, `text-subtle`, `text-faint`, `text-placeholder`, `text-plugin-label`, `accent`, `accent-hover`, `accent-tint`, `surface-overlay`, `surface-panel`, `surface-control`, `surface-code`, `rule`, `divider`, `shadow-ink`, `shadow-ink-deep`, and `syntax-keyword`, `syntax-string`, `syntax-comment`, `syntax-number`, `syntax-function`, `syntax-type`, `syntax-variable`, `syntax-operator`, `syntax-punctuation`, `syntax-tag`, `syntax-attribute`.
- A token a mode leaves out keeps Veneer's own value for that mode, so a theme can change just the accent. Values are plain colors: `#RGB`, `#RRGGBB`, `#RRGGBBAA`, or `rgb(...)`/`rgba(...)` of numbers. Typography, layout, gradients, `url(...)`, and named colors are refused when the plugin is installed.
- The writer picks the theme and a mode (Light or Dark) in Settings, or turns on **Follow macOS appearance** (off by default) so the pair follows the system. The app restyles at once. Lists, settings, and results restyle with no plugin code involved, because they are drawn from the same tokens.
- A theme never touches typography or layout: those are the writer's page settings and stay as set when the theme changes. Veneer's own light and dark pair is in DESIGN.md; dark keeps Harbor Blue as its only hue, has no error red, and draws no borders.

## The writer's own CSS

The writer may add `custom.css` (Settings > Custom CSS > Open custom.css) and it applies over the theme. It is **not a stable contract** (see [unstable](unstable.md)). Plugins do not read or write it.

## What you may not do

- Don't read or set a `--vn-*` variable on the document root from plugin code, and don't override a host class. (A theme is how a plugin changes colors.) Only the variable catalog is a stable contract; host classes and the CSS override layer are [unstable](unstable.md).
- Don't ship fonts, images of UI, or global CSS.
