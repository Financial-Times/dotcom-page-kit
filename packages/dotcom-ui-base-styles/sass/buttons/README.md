# Buttons

## Usage

### Sass

This module is bundled and configured by default.

See [o-buttons](https://github.com/Financial-Times/o-buttons) documentation for usage information.

### JS

This module is _not_ bundled by default.

```js
const buttons = require('n-ui/buttons');
```

`toggleState(btn, alreadyToggled)` toggle the state of a button using `aria-pressed`, and the content of the button using the following attributes:

- 'aria-label', 'title', 'data-alternate-label' - these are used to toggle state of aria-label/title. To avoid confusion title should be equal to aria-label in the button's initial state
- 'data-alternate-text' - used to toggle the text of the button

On completion fires an event `nButtons.stateChange` for which `ev.detail = {state: Boolean}`
