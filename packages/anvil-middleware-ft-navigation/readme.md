# FT Navigation Middleware

The FT Navigation Express Middleware adds FT navigation data required to render the navigation components for the page to `app.locals`.

Pages which should render a navigation crumbtrail (i.e. most Stream pages) should call the middleware with `{ enableCrumbtrail: true }` to tell the middleware to include crumbtrail data in the response.

The response is a path-specific navigation object comprising:

```ts
const data = {
  "crumbtrail": null || {
    "breadcrumb",  
    "subsections"
  },
  "drawer": {...editionSpecificDrawerData},
  "navbar": {...editionSpecificNavbarData},
  "account",
  "user",
  "anon",
  "footer",
  "navbar-simple",
  "navbar-right",
  "navbar-right-anon"
}
```

This middleware should be consumed by your application's server file.


## Installation
```bash
npm install --save @financial-times/anvil-middleware-ft-navigation
```

## Configuration

The following options are available to customise (default values in comments)

```js
{ 
  enableCrumbtrail: // false
  crumbtrailUrl:    // http://next-navigation.ft.com/v2/hierarchy
  menuUrl:          // http://next-navigation.ft.com/v2/menus
  interval:         // 15 * 60 * 1000 (i.e. 15 minutes)
}
```

## Example usage:
```js
const navigationMiddleware = require('@financial-times/anvil-middleware-ft-navigation')

const instance = navigationMiddleware.init({ enableCrumbtrail: true })

app.use(instance)

app.get('/', (request, response) => {
  Object.keys(response.locals.navigation)
  // => {crumbtrails: {...}, "drawer-uk": {...}, "drawer-international": {...}, ...}
})
```
