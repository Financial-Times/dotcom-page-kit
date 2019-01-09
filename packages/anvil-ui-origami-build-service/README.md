# Anvil UI Origami Build Service Component

This package provides an `<OrigamiBuildService />` component that can be used to inject [origami build service](https://origami.ft.com/docs/developer-guide/modules/build-service/) js and css [dependencies]($https://registry.origami.ft.com/components) into the html head, when within a [storybook](https://storybook.js.org/basics/guide-react/) (or any other) context.

### Getting started

### Installation
```sh
npm install --save @financial-times/anvil-ui-origami-build-service
```

### Example usage (within storybook):
```js
import React from 'react'
import { storiesOf } from '@storybook/react'
import { OrigamiBuildService } from '@financial-times/anvil-ui-origami-build-service'

storiesOf('Origami / BuildService', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <OrigamiBuildService
      dependencies={{
        'o-normalise': '^1.6.0',
        'o-date': '^2.11.0',
        'o-typography': '^5.5.0',
        'o-teaser': '^2.3.0',
        'o-labels': '^3.0.0',
        'o-video': '^4.1.0'
      }}>
      <div className="o-typography-heading-level-2">
        hello world
      </div>
    </OrigamiBuildService>
  ))
```

For more information about the storybook implementation in the anvil repo, see https://github.com/Financial-Times/anvil#using-storybook

For more information about storybook in general, see https://storybook.js.org/ and https://storybook.js.org/basics/guide-react/

## Props 

> For more information about react props, see https://reactjs.org/docs/components-and-props.html 

### `dependencies (required)`
A object that maps dependency names to version numbers


