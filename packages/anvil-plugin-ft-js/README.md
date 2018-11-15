# @financial-times/anvil-plugin-ft-js

## Installation

```
npm install --save-dev @financial-times/anvil-plugin-ft-js @financial-times/anvil-plugin-babel
```

## Usage

anvil.config.json

```json
{
  "plugins": [
    "@financial-times/anvil-plugin-babel", "@financial-times/anvil-plugin-ft-js"
  ]
}
```

Note that `anvil-plugin-ft-js` extends `anvil-plugin-babel` and so it must be specified after `anvil-plugin-babel`

## Settings

- **jsxPragma**: (Defaults to `h`) See https://babeljs.io/docs/en/babel-preset-react#pragma
- **jsxPragmaFrag**: (Defaults to `Fragment`) See https://babeljs.io/docs/en/babel-preset-react#pragmafrag 
- **envTargets**: (defaults to `> 1%, ie 11, bb 10`) See https://babeljs.io/docs/en/babel-preset-env#targets and https://browserl.ist/
