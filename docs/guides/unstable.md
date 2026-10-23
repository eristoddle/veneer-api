# Unstable parts

Everything documented in this reference follows semantic versioning (see the [README](../README.md)). These parts do not: they may change or disappear in **any minor version** of the API, with no migration note.

## The raw-DOM escape hatch

A surface normally hands the kernel a list or tree to draw. If you need something else, a surface may give the kernel a DOM view:

```ts
api.surfaces.setView('my-plugin:chart', {
  kind: 'dom',
  mount(element) {
    element.textContent = 'Hello'
    return { dispose: () => element.replaceChildren() }
  }
})
```

The kernel still owns the frame, the tabs, Esc, opening and closing, and the width. You fill the element it gives you, style it only with `--vn-*` variables (see [color tokens](color-tokens.md)), and clean up in the disposable you return. Typing in the focused panel calls your optional `filter(query)`; Up and Down call `move(-1 | 1)`; Enter calls `activate()`. This is **unstable**: prefer a list or tree view.

## The CSS override layer

A writer may override Veneer's appearance with their own CSS. Selectors that target host classes or structure are **unstable**: they can break in any release. The `--vn-*` variable catalog is the stable contract for appearance, not the markup it is applied to. A plugin must not depend on, or add to, host markup or classes.

The file is `custom.css` in Veneer's data folder; Settings > Custom CSS > Open custom.css creates it with this warning at the top and shows it in Finder, and Veneer re-reads it each time its window is focused. It comes last, so it applies over the theme. Setting a variable on `:root:root` outranks Veneer's light and dark values and a plugin theme's; a rule that targets a class or the markup may break at any release.

## What stays stable

The manifest format, `@veneer/api`'s documented methods and types, the event names, and the `--vn-*` and `--vnp-*` token names follow semver. A change to any of them is a version bump and, if it breaks, an entry under Breaking changes in the README with a migration note.

Anything not in this reference is internal and may change at any time.
