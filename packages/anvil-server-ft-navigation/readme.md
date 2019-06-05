# @financial-times/anvil-server-ft-navigation

This package provides a navigation data poller with methods for safely accessing the fetched data for FT.com.

It is primarily intended to be consumed via the [`anvil-middleware-ft-navigation`](https://github.com/Financial-Times/anvil/tree/master/packages/anvil-middleware-ft-navigation) package which can be used by Express applications.

Data will be periodically fetched and updated from the [Next Navigation API](https://github.com/Financial-Times/next-navigation-api). This data is managed by editorial staff and is used to render the navigation components across FT.com including the header, drop-down menus, drawer, and footer.


## Getting started

This package is compatible with Node 8+ and is distributed on npm.

```bash
npm install -S @financial-times/anvil-server-asset-loader
```

This package provides a single class which can be configured using [options](#options).

```js
import Navigation from '@financial-times/anvil-server-ft-navigation'
const navigation = new Navigation()
```

The navigation instance provides methods to retrieve global navigation data and navigation for a specific page:

```js
const menusData = await navigation.getMenusData()
const navigationData = await navigation.getNavigationDataFor('/companies/health', 'uk')
```


## Navigation API

### `getMenusData(): Promise<TNavMenus>`

Resolves the full navigation menus data, refreshed by a poller.

### `getNavigationFor(currentPath: string, selectedEdition: string): Promise<TNavigationData>`

Resolves the navigation data for the selected edition with any links to the current path marked as selected and redirection placeholders updated. If no edition is selected it will default to `"uk"`.

### `getSubNavigationFor(currentPath: string): Promise<TNavSubNavigation>`

Resolves any sub-navigation data for the given path which may include ancestors and children (a.k.a. crumbtrail and subsections).


## Options

The `Navigation` class accepts the following parameters. All parameters are optional:

 ### `menuUrl`

The URL to the navigation service endpoint which provides the global navigation data. Defaults to `"http://next-navigation.ft.com/v2/menus"`.

### `subNavigationUrl`

The URL to the navigation service endpoint which provides navigation data for a given path. Defaults to `"http://next-navigation.ft.com/v2/hierarchy"`.

### `interval`

Time in milliseconds to wait between polling navigation data. Defaults to `900000` (15 minutes).


## Modifying navigation data

The data resolved by all methods is frozen to prevent accidental mutation of the `Poller` instance's data as it is passed around. If you need to modify any part of the data, you should first clone the parts you need and then work with your cloned object.

```js
const subNavData = getSubNavigationFor('/world/uk')
const clone = JSON.parse(JSON.stringify(subNavData));
```
