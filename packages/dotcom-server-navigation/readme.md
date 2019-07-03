# @financial-times/dotcom-server-navigation

This package provides tools to fetch and format navigation data for FT.com.

It is primarily intended to be consumed via the [`dotcom-middleware-navigation`](https://github.com/Financial-Times/anvil/tree/master/packages/dotcom-middleware-navigation) package which can be used by Express applications.

Data for the menus will be periodically fetched and updated from the [Next Navigation API](https://github.com/Financial-Times/next-navigation-api). This data is managed by editorial staff and is used to render the navigation components across FT.com including the header, drop-down menus, drawer, and footer.


## Getting started

This package is compatible with Node 8+ and is distributed on npm.

```bash
npm install -S @financial-times/dotcom-server-navigation
```

This package provides a single class which can be configured using [options](#options).

```js
import { Navigation } from '@financial-times/dotcom-server-navigation'
const navigation = new Navigation()
```

The navigation instance provides methods to retrieve global navigation data and navigation for a specific page:

```js
const menusData = await navigation.getMenusData()
const menusDataForPage = await navigation.getMenusFor('/companies/health', 'uk')
```


## API

### `getMenusData(): Promise<TNavMenus>`

Resolves all menus data, refreshed by a poller. This data has been deep-frozen to prevent accidental mutation as it gets passed around. If you need to modify any part of the data, you should first clone the parts you need and then work with your cloned object.

### `getMenusFor(currentPath: string, currentEdition?: string): Promise<TNavMenusForEdition>`

Resolves the menus data for the current edition with any links to the current path marked as selected and URL placeholders updated. If no edition is provided it will default to `"uk"`.

### `getSubNavigationFor(currentPath: string): Promise<TNavSubNavigation>`

Resolves any sub-navigation data for the current path which may include ancestors and children (a.k.a. crumbtrail and subsections).

### `getEditionsFor(currentEdition?: string): TNavEditions`

Returns the available FT editions with the current edition selected. If no edition is provided it will default to `"uk"`.


## Options

The `Navigation` class accepts the following parameters. All parameters are optional:

 ### `menuUrl`

The URL to the navigation service endpoint which provides the global navigation data. Defaults to `"http://next-navigation.ft.com/v2/menus"`.

### `subNavigationUrl`

The URL to the navigation service endpoint which provides navigation data for a given path. Defaults to `"http://next-navigation.ft.com/v2/hierarchy"`.

### `interval`

Time in milliseconds to wait between polling navigation data. Defaults to `900000` (15 minutes).
