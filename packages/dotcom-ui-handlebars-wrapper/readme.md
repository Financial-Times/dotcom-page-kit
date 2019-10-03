# @financial-times/dotcom-ui-handlebars-wrapper

This package provides a React component for using Handlebars templates within server-side React components.

## Getting started

This package is compatible with Node 8+ and is distributed on npm.

```sh
npm install --save @financial-times/dotcom-ui-handlebars-wrapper
```

After installing the package, you can use it to render Handlebars templates within React components on the server side.

### Server-side integration

If you need to consume a Handlebars template provided by a non-Page-Kit package in a React app, you can create a wrapper component for it, by providing the file path of the component to `handlebarsWrapper`. For example, if you have a template called `title.html`:

```handlebars
<h1>{{title}}</h1>
```

You can render it in React by doing:

```jsx
import { handlebarsWrapper } from '@financial-times/dotcom-ui-handlebars-wrapper'
import React from 'react'
import { renderToString } from 'react-dom/server'

const Title = handlebarsWrapper('path/to/title.html')

renderToString(<Title title='Hello' />)
```

This will output `<div><h1>Hello</h1></div>`. The enclosing `<div>` tag is there because React requires a wrapper tag to output arbitrary HTML into.

### Client-side

Because this package uses `@financial-times/dotcom-server-handlebars` to render templates, it requires filesystem access to read templates and partials, and so is incompatible with client-side usage.

