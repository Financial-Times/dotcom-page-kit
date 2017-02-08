# Grid

## Usage

### Sass

This module is bundled and configured by default.

More or less [o-grid](http://registry.origami.ft.com/components/o-grid) with a few modifications.

#### Offset columns

To avoid shipping unused rulesets `offset` `pull` and `push` column selectors are disabled. To use these a mixin is provided `nUiGridOffset($layout-name, $columns, $mode)`

```scss
@include nUiGridOffset('M', 3, 'pull');
```

#### Human readable selectors

Pending a pull request to o-grid, these will be disabled. Please use the numeric selectors I.eE. `data-o-grid-colspan="6"` and not `data-o-grid-colspan="half"`. The one exception is the `hide` keyword.
