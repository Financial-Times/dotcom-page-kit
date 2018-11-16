# @financial-times/anvil-plugin-code-splitting

This plugin enables bundle splitting in accordance with the strategy outlined at https://hackernoon.com/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758

## Installation

```
npm install --save-dev @financial-times/anvil-plugin-code-splitting @financial-times/anvil-plugin-babel
```

## Usage

anvil.config.json

```json
{
  "plugins": [
    "@financial-times/anvil-plugin-babel"
    "@financial-times/anvil-plugin-code-splitting"
  ]
}
```

NOTE: This plugin extends `@financial-times/anvil-plugin-babel` and so it must be declared first
