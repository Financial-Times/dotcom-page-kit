# Colors

## Usage

### Sass

This module is bundled by default and cannot be configured.

See [o-colors](https://github.com/Financial-Times/o-colors) documentation for usage information.

We also expose two shortcut functions:

```scss
/// Get a color by name
@function getColor($args...) {
	@return oColorsGetPaletteColor($args...);
}

/// Get a color by use case
@function getColorFor($args...) {
	@return oColorsGetColorFor($args...);
}
```
