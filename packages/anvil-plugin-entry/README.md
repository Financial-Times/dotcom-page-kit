# @financial-times/anvil-plugin-entry

This plugin allows you to be able to specify the entry points of our app

## Installation

```
npm install --save-dev @financial-times/anvil-plugin-entry
```

## Usage

anvil.config.json

```json
{
  "plugins": [
    "@financial-times/anvil-plugin-entry"
  ],
  "settings": {
    "entry": {
      "one": "src/one.js",
      "two": "src/two.js"
    }
  }
}
```

Note that `anvil-plugin-entry` should be specified last in order for it to have the last say on what the entry points should be.
Note also that the `settings.entry` property can have as a value, anything that would be acceptable as a value for the `entry` property of a webpack config. 
See https://webpack.js.org/concepts/entry-points for the accepted value types.
