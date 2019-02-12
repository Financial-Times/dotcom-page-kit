# @financial-times/anvil-ui-ft-header

This package provides components which return variations on the header component for ft.com.

//TODO
If you want to make use ft.com navigation data in your app then `withNavigationHierarchy: true` should passed to ?? (express or n-ui) on app initialisation. If `withNavigationHierarchy` is true (the anvil navigation api) will poll the [navigation API](https://github.com/Financial-Times/next-navigation-api) (when ??) and set the `showSubNav`, `hierarchy`, `breadcrumb` and `subsections` properties on `response.locals.navigation`. These properties are used to populate various menus and navigation items on the apps.




### Getting started

This module is compatible with Node 10+ and is distributed on npm.

```bash
npm install --save @financial-times/anvil-ui-ft-header
```

Include a header component in your html template and pass in a data object:

```jsx
import { HeaderSimple } from 'anvil-ui-ft-header'
import headerData from './navigation/header'

<HeaderSimple {...headerData} />
```

The LogoOnly header variant can be rendered without passing in a data object but all other variants of the header expect data which can be sourced either from the [navigation API](https://github.com/Financial-Times/next-navigation-api) or the [Origami Navigation Service](https://www.ft.com/__origami/service/navigation/v2/).


### Variants

HeaderSimple

LogoOnly




### Options

//TODO wip

`userNav` - Displays header elements compatible with a signed-in user state.

`disableSticky` - Turns off the sticky header.

`variant` - : Serve a variant of the standard header element. The only current valid variant is `'logo-only'`.

`showSignOut` - Used on myFT pages to add a 'Sign out' link to the navigation menu.

`hideOutboundLinks`- If a page can be linked to from the iOS app but outbound navigation from the page is not allowed then the 'hideOutboundLinks' flag will be set to true by the iOS app. This will render the header logo without its usual link functionality and hide the page footer. It's required to comply with Apple's in-app billing rules.


### Header Elements

#### Header top

The primary header element on ft.com.

![Example header top element](../../screenshots/header-top.png)

If `variant: 'logo-only'`is passed in then the header top will render without the drawer, search or myFT elements. This pattern is used in several conversion apps.

Note: The myFT unread articles icon lives outside this package and is not available in the storybook demos. The indicator depends on the [`o-header__top-link--myft`](https://github.com/Financial-Times/n-myft-ui/blob/master/components/unread-articles-indicator/index.js#L55) class being present in the header.

#### Header navigation

Content pages on ft.com usually include a navigation element.

![Example header navigation element](../../screenshots/header-navigation.png)

// TODO implement the withNavigationHierarchy login in the navigation package.

#### Header crumbtrail

Stream pages and myFT pages on ft.com usually include a crumbtrail element.

![Example header crumbtrail element](../../screenshots/header-crumbtrail.png)

// TODO how does the page know whether or not to include a crumbtrail

### Storybook

[Storybook](https://storybook.js.org/) has been configured for all UI packages in Anvil. From the root of the anvil directory, run:

```bash
npm run storybook
```

The storybook will launch on port: 9001. The header stories will be available under 'FT > Header'.


--------


The header component expects data from the [navigation API](https://github.com/Financial-Times/next-navigation-api). The [anvil-server-ft-navigation](../anvil-server-ft-navigation/readme.md) package or its middleware, [anvil-middleware-navigation](../anvil-middleware-ft-navigation/readme.md), can be used to make data from this API available on `response.locals.navigation`.


### Interface options

export interface Props {
  userNav: boolean // Show the `sign in` and `subscribe` links to anonymous users.
  hideOutboundLinks?: boolean // An iOS setting - removes link functionality from header and hides footer.
  viewStyle?: string // Set the header top style to default|compact - the only currently avialable value = 'compact'.
  navbar: any // Navigation data - either UK or International
  'navbar-right': any // Navigation data - signed in users
  'navbar-right-anon': any // Navigation data - for anonymous users
  breadcrumb: any // Crumbtrail data
  subsections: any // Crumbtrail data
  showSubNav: boolean
  showSignOut: boolean // A myFT option - Adds a Sign out link to the crumbtrail element
  userIsAnonymous: boolean // Marks a user as anonymous - set in n-express
  userIsLoggedIn: boolean // Marks a user as signed in - set in n-express
}
