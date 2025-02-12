# Migrating from [`n-ui-foundations`](https://github.com/financial-times/n-ui-foundations) to [`dotcom-ui-base-styles`](https://github.com/Financial-Times/dotcom-page-kit/tree/main/packages/dotcom-ui-base-styles)

[`n-ui-foundations`](https://github.com/financial-times/n-ui-foundations) was a package containing default styles for FT.com apps and components. It's been replaced by [`dotcom-ui-base-styles`](https://github.com/Financial-Times/dotcom-page-kit/tree/main/packages/dotcom-ui-base-styles), which is part of Page Kit.

## Migrating the Javascript utilities

`n-ui-foundations`'s Javascript utilities are deprecated and haven't been moved to `dotcom-ui-base-styles`. There are three utilities still in use in FT.com repos, which have web-native replacements:

<table>
<tr><th><code>n-ui-foundations</code> utility</th><th>replacement</th></tr>
<tr>
<td><code>$</code></td><td>

`document.querySelector`/`element.querySelector`

</td></tr><tr>
<td><code>$$</code></td><td>

`document.querySelectorAll`/`element.querySelectorAll`
  
</td></tr><tr>
<td><code>broadcast</code></td><td>

```javascript
target.dispatchEvent(
  new CustomEvent(
    EVENT_NAME,
    { bubbles: true, cancelable: true, detail: EVENT_DATA }
  )
)
```

_**nb**: `broadcast` sets `bubbles` and `cancelable` to `true`, but that might not be required, depending on your use case._

</td></tr></table>

## Migrating Sass

### For apps

1. Your app likely already depends on `dotcom-ui-base-styles`. If it doesn't have a direct dependency on it, install it with `npm install @financial-times/dotcom-ui-base-styles`.
2. Replace any Sass `@import` for `n-ui-foundations/main` with `@financial-times/dotcom-ui-base-styles/styles`.
3. Replace any calls to the `n-ui-foundations` Sass mixins with the `dotcom-ui-base-styles` equivalents. The mixins are still available under the old `nUi`-prefixed names, but Sass will print a deprecation warning if you're using them. These are the renamed mixins:
    - `nUiFoundations` → `dotcomUiBaseStyles`
    - `nUiGrid` → `dotcomGrid`
    - `nUiTypography` → `dotcomUiTypography`
    - `nUiUtil` → `dotcomUiUtil`

### For components

Originally, `n-ui-foundations` was intended to make sure the versions of [Origami](https://origami.ft.com/) components used by FT.com components and apps were consistent, ensuring we didn't have duplicate CSS or inconsistent design. Since Origami 2, this requirement is handled by npm peer dependencies. This means `dotcom-ui-base-styles` **no longer needs to support components**. 

1. Remove any imports in your component's Sass for `n-ui-foundations`.
2. Work out which Origami components from `n-ui-foundations` are used by your component. `n-ui-foundations` installs these components:
    - [`o-buttons`](https://github.com/Financial-Times/origami/tree/main/components/o-buttons)
    - [`o-colors`](https://github.com/Financial-Times/origami/tree/main/components/o-colors)
    - [`o-fonts`](https://github.com/Financial-Times/origami/tree/main/components/o-fonts)
    - [`o-grid`](https://github.com/Financial-Times/origami/tree/main/components/o-grid)
    - [`o-icons`](https://github.com/Financial-Times/origami/tree/main/components/o-icons)
    - [`o-normalise`](https://github.com/Financial-Times/origami/tree/main/components/o-normalise)
    - [`o-typography`](https://github.com/Financial-Times/origami/tree/main/components/o-typography)
    - [`o-viewport`](https://github.com/Financial-Times/origami/tree/main/components/o-viewport)
    - [`o-visual-effects`](https://github.com/Financial-Times/origami/tree/main/components/o-visual-effects)
4. Install the appropriate Origami components as peer dependencies (i.e. with `--save-peer`).
5. Add Sass `@import`s for these components.

## Remove `n-ui-foundations` as a dependency

Finally, uninstall the `n-ui-foundations` npm package:

```sh
npm remove n-ui-foundations
```
