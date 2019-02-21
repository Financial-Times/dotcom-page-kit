# anvil-server-ft-navigation

This module exposes a Navigation class with some methods for accessing navigation data for ft.com. 

It is intended to be consumed by a Navigation middleware such as [`anvil-middleware-ft-navigation`](https://github.com/Financial-Times/anvil/tree/master/packages/anvil-middleware-ft-navigation) which can handle the responses.

Instances of Navigation will periodically fetch navigation data from the [Origami navigation service](https://registry.origami.ft.com/components/origami-navigation-service@71.0.0) via [ft-poller](https://github.com/Financial-Times/ft-poller). This data is managed by editorial staff and is used to render the navigation components on FT.com including the header, drop-down menus, drawer and footer.

```js
import Navigation from '@financial-times/anvil-server-ft-navigation'

const navigation = new Navigation()

navigation.getNavigationData() // Promise<TNavMenus>
navigation.getPathMenu(menuId: string) // Promise<TNavMenu>
navigation.getCrumbtrail(pathName) // Promise<object>
```

## API

### `constructor(options?: TNavOptions)`

Options will be merged with defaults: 

```js
{
  menuUrl: 'http://next-navigation.ft.com/v2/menus',
  crumbtrailUrl: 'http://next-navigation.ft.com/v2/hierarchy',
  interval: 15 * 60 * 1000 // poll every 15 minutes
}
```

### `getNavigationData()`

Returns the full navigation data, refreshed every 15 minutes.

### `getPathMenu(menuId: string, path: string): Promise<TNavMenu>` 

Returns the navigation data for the supplied menu item, customised to be relevant to the supplied path:
- Add `selected: true` to items whose `url` property matches "/world/uk" 
- Replace url values matching `url?location=${currentPath}` with `url?location=/world/uk`

```js
navigation.getPathMenu('drawer-uk', '/world/uk')
```

Returns:
```js
{
  label: 'Drawer',
  items: [
    { label: 'Foo', url: '/world/uk', submenu: null, selected: true },
    {
      label: 'Bar', 
      url: '/fake-item?location=/world/uk', 
      submenu: null, 
      selected: false
    }
  ]
}
```

### `getCrumbtrail(path: string)`

Returns the crumbtrail data for path. The crumbtrail is the data which populates the header-subnav element:

![alt text](./screenshots/screenshot-markets-nav-item.png)


## Modifying the data

The data from `getNavigationData`, `getPathMenu` and `getCrumbtrail`  methods is frozen to prevent mutation as it is passed around. If you need to modify any part of the data, you should first clone the parts you need and then work with your cloned object.

```js
const menuItem = getPathMenu('drawer-uk', '/world/uk')
const clone = menuItem => JSON.parse(JSON.stringify(menuItem));
```
