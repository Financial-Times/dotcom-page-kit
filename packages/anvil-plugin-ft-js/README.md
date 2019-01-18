# @financial-times/anvil-plugin-ft-js

## Installation

```
npm install --save-dev @financial-times/anvil-plugin-ft-js
```

## Usage

anvil.config.json

```json
{
  "plugins": [
    "@financial-times/anvil-plugin-ft-js"
  ]
}
```

## Settings

- **jsxPragma**: (Defaults to `h`) See https://babeljs.io/docs/en/babel-preset-react#pragma
- **jsxPragmaFrag**: (Defaults to `Fragment`) See https://babeljs.io/docs/en/babel-preset-react#pragmafrag
- **envTargets**: (defaults to `> 1%, ie 11`) See https://babeljs.io/docs/en/babel-preset-env#targets and https://browserl.ist/
