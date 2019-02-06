# @financial-times/anvil-server-jsx-renderer

Utilities for rendering JSX on the server

## Installation

```
npm install --save @financial-times/anvil-server-jsx-renderer
```

## API

### createRenderer

> const render = createRenderer(options) <br />
> render(&lt;SomeComponent { ...props } /&gt;)

Returns a render function that can be used to render JSX components on the server.

#### Arguments 
##### options (Object)
  - **assetUrlPrefix:** The public url to the assets folder (e.g., http://foo.com/assets)<br />
  - **assetManifestPath:** The file path to the asset manifest json file
  - **shellComponent:** *Defaults to `@financial-times/anvil-ui-ft-shell`* - The component that is used to render the html document shell. 
  - **renderFn:** *Defaults to `react-dom/server#renderToStaticMarkup`* - The function to use to render the JSX component.

#### Returns
##### (component, [options]) => string
- **component:** Either a JSX node or a component constructor function
- **options** *(optional)*
  - **props:** The initial props to pass through to the component
  - **shellComponent:** The component to use to render html document shell the main component will be wrapped with

#### Example ####
```js
import express from 'express' 
import { createRenderer } from '@financial-times/anvil-server-jsx-renderer'

const app = express()
const render = createRendererMiddleware({
  assetUrlPrefix: 'http://localhost:3000/assets',
  assetManifestPath: path.join(__dirname, '../dist/manifest.json')
})

app.use('/assets', express.static(path.join(__dirname, '../dist')))

app.get('/', (req, res) => {
  res.send(render(<HomePage greeting="hello" />))
})

app.listen(3000)
```

If the server code is not being transpiled with something like [Babel](https://babeljs.io/) or [Sucrase](https://github.com/alangpierce/sucrase), then render function should be used as follows:

```js
const props = { greeting: 'hello' }
res.send(render(HomePage, { props }))
```

---

### express#createRenderController
> const render = createRenderController(options) <br />
> app.get('/', (req, res) => render(&lt;SomeComponent { ...props } /&gt;) )

Returns a function that can be used to create and [express](https://expressjs.com/) compatible controller function that renders a JSX component
  
#### Arguments 
##### options (Object) - See [`createRenderer` options](#options)
  
#### Example

```js
import express from 'express' 
import { createRenderController } from '@financial-times/anvil-server-jsx-renderer/express'

const app = express()
const render = createRenderController({
  assetUrlPrefix: 'http://localhost:3000/assets',
  assetManifestPath: path.join(__dirname, '../dist/manifest.json')
})

app.get('/', (req, res) => render(<HomePage greeting="hello" />)
```

---

### express#createRendererMiddleware
> const renderer = createRenderer(options) <br />
> app.use(renderer)

Returns an [express](https://expressjs.com/) compatible middleware that assigns a jsx renderer to the `res.render` property.

#### Arguments 
##### options (Object) - See [`createRenderer` options](#options)
  
#### Example

```js
import express from 'express' 
import { createRendererMiddleware } from '@financial-times/anvil-server-jsx-renderer/express'

const app = express()
const renderer = createRendererMiddleware({
  assetUrlPrefix: 'http://localhost:3000/assets',
  assetManifestPath: path.join(__dirname, '../dist/manifest.json')
})

app.use(renderer)
app.get('/', (req, res) => {
  res.render(<HomePage greeting="hello" />
})
```
