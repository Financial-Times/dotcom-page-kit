# anvil-server-ft-navigation

The FT Navigation package exposes a Navigation class with some methods for accessing navigation data for ft.com. This package should be consumed by a Navigation middleware such as [Navigation Middleware] which can handle the responses. // TODO: Fill in a location for our default navigation middleware

Instances of Navigation will periodically fetch navigation data from the [Origami navigation service](https://registry.origami.ft.com/components/origami-navigation-service@71.0.0) via [ft-poller](https://github.com/Financial-Times/ft-poller). This data is managed by editorial staff and is used to render the navigation components on FT.com including the header, drop-down menus, drawer and footer.


### How it works

Create an instance of Navigation.

```js
import Navigation from '@financial-times/anvil-server-ft-navigation'
const navigation = new Navigation()

navigation.getNavigation() // Promise<object>
navigation.getMenu(menuItem) // Promise<object>
navigation.getCrumbtrail(pathName) // Promise<object>
```

The constructor method inside Navigation sets up some default properties and creates an `initialPromise` which initialises the poller so that it begins requesting navigation data immediately.
```js
this.initialPromise = this.poller.start({ initialRequest: true })
```


### Available methods

Navigation methods are intended to be utilised by the middleware.

`navigation.getNavigation()` will return the full navigation data. The data is automatically refreshed every 15 minutes.

`navigation.getMenu('drawer-uk')` will return the navigation data for only the menu item requested read from the `data` property on the instance of Navigation. In this case, it will return the data related to the `drawer-uk` element.

`navigation.getCrumbtrail('markets')` will return the crumbtrail data for the requested path. The crumbtrail is the data which populates the header-subnav element.

![alt text](./screenshots/screenshot-markets-nav-item.png)


### Modifying the data

The data from `getNavigation`, `getMenu` and `getCrumbtrail`  methods is frozen to prevent mutation as it is passed around. If you need to modify any part of the data, you should first clone the parts you need and then work with your cloned object.

```js
const menuItem = getMenu('drawer-uk')
const clone = menuItem => JSON.parse(JSON.stringify(menuItem));
```


// TODO: Expand on usage once we have more of the Navigation middleware in in place.

// TODO: run tests

### Run the tests

From the top-level of anvil run `jest` or`jest packages/anvil-server-ft-navigation`.
