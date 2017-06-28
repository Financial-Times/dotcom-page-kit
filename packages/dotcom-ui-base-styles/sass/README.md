# n-ui-foundations
Sass and js utilities for the next front-end for use by components (apps should use n-ui, which includes n-ui-foundations)

For templates and app bootstrapping see https://github.com/Financial-Times/n-ui

## Sass
```
@import "n-ui-foundations/main"
```
This will output styles for `o-grid`, `o-typography`, `n-util` and `n-ui-normalize`. It will also import mixins for `o-colors`, `o-icons` and `o-visual-effects`. It can be `@imported` multiple times in components or apps with no risk of duplication

### Critical & modular CSS
Use
- `nUiStylesheetStart('stylesheet-name')`
- `nUiStylesheetEnd('stylesheet-name')`
- `nUiStylesheet('stylesheet-name') {}`

These insert comments that, when built with `n-ui`'s build tools, will split your stylesheet into multiple sub stylesheets. Can be used for critical css (e.g. use `head` as the stylesheet name for the same effect as `n-ui@3`'s `nUiCritical()` mixin)

### Caveats and customisations

#### o-colors

Many additional use cases are defined in https://github.com/Financial-Times/n-ui-foundations/blob/master/colors/_set-use-cases.scss.

Two shorthand aliases for `o-colors` functions are also provided:
- `getColor` - shorthand for `oColorsGetPaletteColor`
- `getColorFor` - shorthand for `oColorsGetColorFor`

#### o-grid

Human readable classes (e.g. `data-o-grid-colspan="half"`) are all disabled, with the exception of `hide`

To avoid shipping unused rulesets `offset` `pull` and `push` column selectors are disabled. To use these a mixin is provided `nUiGridOffset($layout-name, $columns, $mode)`

```scss
@include nUiGridOffset('M', 3, 'pull');
```

#### logos
A mixin for getting logos (or other origami imageset images)
```
nGetImage(
	$image-type,
	$image-name,
	$color: null,
	$container-width: 128,
	$container-height: null,
	$apply-base-styles: true,
	$apply-width-height: true
)
```
#### util
See https://github.com/Financial-Times/n-ui-foundations/blob/master/util/README.md for a full list of utility classes

#### typography
Loads fonts (using o-typography's progressive fonts).

Includes one mixin `nLinksTopic($inversed: null)` for generating styles for topics

### JS

```js
require('n-ui-foundations');
```

- `$(sel, [context])` Equivalent to `context.querySelector(sel)` (`context` defaults to `document`)
- `$$(sel, [context])` Equivalent to `Array.from(context.querySelectorAll(sel))` (`context` defaults to `document`)
- `throttle(func, wait)` Creates a throttled copy of a function
- `debounce(func, wait)` Creates a debounced copy of a function
- `uuid()` - uuid generator
- `ascii(str)` converts non-ascii unicode characters to ascii equivalents
- `broadcast(name, data, bubbles = true)` fires a custom event. Event is fired on `document.body` by default but if called with the context of a `HtmlElement` will be fired on that
- `perfMark(name)` - log a performance mark
- `sampleUsers(pct, seed)` - select a % of users to target behaviour at (returns `Bool`)

### CookieStore

Contain useful methods for working with cookies.

    const cookieStore = require('n-ui-foundations').cookieStore;

#### `get(name)`
Get the value of the given cookie

#### `set(name, value, [options])`
Set a cookie.  Available options are `domain`, `path`, `expires`, `secure` and `maxAge`
Note it is "maxAge" not "max-age".  If you don't specify either expires or maxAge the cookie will expire at the end of the session

#### `has(name)`
Returns true if the given cookie exists

#### `remove(name)`
Delete the given cookie by seting the expiry to the past

## Templates
Nope. None of them
