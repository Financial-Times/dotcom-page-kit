# n-ui-foundations

Sass and JS utilities for the next front-end for use by components and apps.


## Sass

This package includes and configures several low-level Origami components required by all of the front-end of FT.com and ensures they maintain compatible versions. This includes colors, typography, grid, and normalising styles.

There are two Sass partials provided by this package which may be integrated with your codebase:

1. Components should integrate via the mixins only, it can be imported many times:

    ```scss
    @import "n-ui-foundations/mixins";
    ```

2. Apps should integrate via the main entrypoint, which will output all of the base CSS rulesets. It should be imported once:

    ```scss
    @import "n-ui-foundations/main";
    ```


### Critical & modular CSS

Applications using `n-ui` are able to split Sass output into multiple output files. This is done using an opening and closing code comment which act as delimiters for a [PostCSS script](https://www.npmjs.com/package/postcss-extract-css-block) to find and extract the rules between them.

```scss
@include nUiStylesheetStart('stylesheet-name');
.my-stylesheet-rule {
    content: 'this will be output in stylesheet-name.css';
}
@include nUiStylesheetEnd('stylesheet-name');
```

_Please note_ if your application is using Page Kit this feature is not available and these mixins should not be used.


### Caveats and customisations

#### o-grid

Human readable classes (e.g. `data-o-grid-colspan="half"`) have all been disabled to minimise the output size of `o-grid`, with the exception of `center`.

To avoid shipping unused rulesets `offset` `pull` and `push` column selectors are disabled. To use these a mixin is provided `nUiGridOffset($layout-name, $columns, $mode)`

```scss
@include nUiGridOffset('M', 3, 'pull');
```

#### logos

A mixin for getting logos (or other Origami imageset images)

```scss
@include nGetImage(
    $image-type,
    $image-name,
    $color: null,
    $container-width: 128,
    $container-height: null
)
```

#### utilities

See https://github.com/Financial-Times/n-ui-foundations/blob/HEAD/util/README.md for a full list of utility classes.


### JS

This package includes several commonly used utility functions to avoid repeating boilerplate code.

```js
import { $, $$ } from 'n-ui-foundations';
```

- `$(sel, [context])` Equivalent to `context.querySelector(sel)` (`context` defaults to `document`)
- `$$(sel, [context])` Equivalent to `Array.from(context.querySelectorAll(sel))` (`context` defaults to `document`)
- `throttle(func, wait)` Creates a throttled copy of a function, re-exported from `o-utils`
- `debounce(func, wait)` Creates a debounced copy of a function, re-exported from `o-utils`
- `uuid()` - generates a random UUID
- `ascii(str)` converts non-ascii unicode characters to ascii equivalents
- `broadcast(name, data, bubbles = true)` fires a custom event. The event is fired from `document.body` by default but if called with the context of a `HtmlElement` it will be fired from that instead.
- `perfMark(name)` - log a performance mark.
- `sampleUsers(pct, seed)` - select a % of users to target behaviour at (returns `Bool`)

### Cookie store

Useful methods for working with cookies.

```js
import { cookieStore } from 'n-ui-foundations');
```

#### `get(name)`

Get the value of the given cookie.

#### `set(name, value, [options])`

Set a cookie.  Available options are `domain`, `path`, `expires`, `secure` and `maxAge`.
Note it is "maxAge" not "max-age".  If you don't specify either expires or maxAge the cookie will expire at the end of the session.

#### `has(name)`

Returns true if the given cookie exists.

#### `remove(name)`

Delete the given cookie by setting the expiry to the past.


## Migration guides

### v5 to v6

v6 of n-ui-foundations no longer outputs a [snappy grid](https://github.com/Financial-Times/o-grid#snappy-mode) by default, as it is deprecated. This means your grid container elements will be wider when the viewport width is at a [grid breakpoint](https://github.com/Financial-Times/o-grid#layout-sizes). Where the grid CSS class `o-grid-container` or Sass mixin `oGridContainer` is used check your project at different breakpoints for visual regressions. If your project looks good no action is needed.

If your project looks broken, you may choose to switch to a `snappy` grid. This will allow us to find where the snappy grid is used and remove it in the future:
- Find and replace `o-grid-container` classes with `o-grid-container o-grid-container--snappy`.
```diff
-<div class="o-grid-container"></div>
+<div class="o-grid-container o-grid-container--snappy"></div>
```
- Find `oGridContainer` mixin uses and pass `snappy` as the first argument.
```diff
-@include oGridContainer();
+@include oGridContainer($grid-mode: 'snappy');
```

If your app uses Page Kit's `dotcom-build-sass` package and needs to maintain a `snappy` grid, then ensure you are using Page Kit >= v2.0.1 and make the following change in the app's `webpack.config.js`:
```diff
-new PageKitSassPlugin()
+new PageKitSassPlugin({ prependData: '$o-grid-mode: \'snappy\';' })
```

### v4 to v5

- No manual changes required, but font changes will occur:
  - Added: Financier Medium.
  - Removed: Metric Medium.

### v3 to v4

- All color use cases have been removed as many of these are already defined by `o-` components and should be used instead.
- The `.n-ui-text-*` rules have been removed, use `o-typography` instead.
- The `getColor()` and `getColorFor()` Sass functions have been removed, use the equivalent functions provided by `o-colors` instead.
