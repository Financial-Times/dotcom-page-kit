# Migrating from n-ui to Page Kit (v0.1.0)

🏗 WIP 🏗

##  Remove n-ui

_NOTE: This is quite a long step and you may need a notepad and pen._

- Update `.gitignore`, replace all the `public/*` lines with a single `public/` line.
- Remove n-ui as a dependency from `bower.json` and `package.json` (but leave n-ui-foundations, Page Kit does not replace any part of n-ui-foundations).
- Remove n-ui scripts from the `makefile`, we will add replacement scripts later.
- Delete `n-ui-build.config.js` in the app root directory.
- Now is a good time to bump some dependencies to versions which support Page Kit.
    - Bump n-gage to `v3.9.2` or higher.
    - Bump n-heroku-tools to `v8.3.0` or higher.

### Client-side

#### Sass

- Open the Sass entry point and remove `@import 'n-ui/main';`.
- Remove any `nUiStylesheetStart/nUiStylesheetEnd` mixins from the Sass source code, there is no equivalent in Page Kit.

#### JavaScript

- Open the client-side JS entry point.
- Remove any dependency on `n-ui` or `@financial-times/n-ui`.
- Comment out any references to `flags` imported from n-ui, we will bring them back later.
- Comment out any references to `tracking` imported from n-ui, we will bring them back later.
- Delete any references to `allstylesloaded` and hoist the contents of its callback into the parent scope.
- Delete any `onAppInitialised()` calls.

### Server-side

- Install n-express:
  ```bash
  npm install -S @financial-times/n-express
  ```
- Open the application entry point (usually `server/app.js`) and replace the dependency on n-ui:
  ```diff
  - const express = require('@financial-times/n-ui');
  + const express = require('@financial-times/n-express');
  ```
- Update the Express server initialisation options, at a minimum add the `appName`, `graphiteName` and set `withFlags`, `withConsent` and `withAnonMiddleware` to `true`.
  ```diff
  const app = express({
  + appName: 'application name',
  + withFlags: true,
  + withConsent: true,
  + withAnonMiddleware: true
  ...
  });
  ```
- If the `.snyk` file contains a patch for n-ui, delete this now.
- If any `helpers` are being registered at this time comment out these dependencies and then remove the `helpers` option.
- Make a note of what features `app.locals.nUiConfig = {}` is configuring and then delete it.
    - The `preset` value will be either `discrete` or `complete`. Check the list of features included in each one here: https://github.com/Financial-Times/n-ui/blob/master/browser/js/app-initializer.js and make a note of the features being used in your application.
    - _Please note_ that we will need to initialise any client-side components not included in Page Kit later, such as image lazy loading, n-feedback, o-date, etc.
- Finally, search for any references to `n-ui` and `nui` and clean up what's left.


##  Implement Page Kit Handlebars as Express view engine

_NOTE: This is probably the hardest step and this will vary between applications depending on how it extends or works around the limitations of Handlebars._

- Install the Handlebars package:
  ```bash
  npm install -S @financial-times/dotcom-server-handlebars
  ```
- Register Handlebars as an Express view engine and configure the helper functions:
    ```js
    const { PageKitHandlebars, helpers } = require('@financial-times/dotcom-server-handlebars');
    app.engine('.html', new PageKitHandlebars({ helpers }).engine);
    ```
    If your app was using any additional Handlebars helpers (e.g `x-handlebars`) configure them now.
- Update all `response.render()` calls in the application's controllers to include the `.html` file extension.
- Remove the `layout` property (usually `layout: 'wrapper'`).
- If your application is using Handlebars directly (`require('handlebars')`):
    - Don't! Handlebars is a singleton...
    - ...and n-ui implemented a hack to load partial templates on application startup and append them to this.
    - If necessary refactor the application to use a shared instance of `PageKitHandlebars`, you may prefer to add a new `handlebars-setup.js` module to achieve this.
- Run the application (`make run`) and load it in your browser:
    - This is the point in the migration where you will find out if your application is using any unsupported Handlebars helpers. For instance, Page Kit does not support `{{#defineBlock}}{{/defineBlock}}` as it uses a different mechanism for inserting content into the document `<head>` and before/after the header and footer slots. Handlebars supports an inline partials mechanism which you can use instead if necessary.
    - Comment out the use of any other unsupported helpers for now and make a note of them.

  It's important to get the application running and verify that it is delivering the expected HTML at this point as we will verify each of the following stages by running the application and checking it in the browser.
- Commit your work and have a lovely cup of tea, you've earned it. :relaxed:


## Setup basic build task for client-side JS and Sass

_NOTE: This is probably the second hardest step and may vary between applications and the dependencies it uses._

- Install the Page Kit build packages:
    ```bash
    npm install -D \
        @financial-times/dotcom-page-kit-cli \
        @financial-times/dotcom-build-js \
        @financial-times/dotcom-build-sass \
        @financial-times/dotcom-build-bower-resolve
    ```
- Create a `page-kit.config.js` file in the repository root:
    ```js
    const path = require('path');

    module.exports = {
        plugins: [
            require('@financial-times/dotcom-build-js').plugin(),
            require('@financial-times/dotcom-build-sass').plugin(),
            require('@financial-times/dotcom-build-bower-resolve').plugin()
        ],
        settings: {
            build: {
                entry: {
                    scripts: './client/main.js',
                    styles: './client/main.scss'
                },
                outputPath: path.resolve('./public')
            }
        }
    };
    ```
- Configure Page Kit build steps in the application's `makefile`:
    ```diff
    build:
    +	page-kit build --development
    build-production:
    +	page-kit build
    watch:
    +	page-kit build --development --watch
    ```
- Build the application:
    - There may be a number of warnings output to the console, inspect these but they can usually be ignored.
    - If there are any errors resolve these now. In our tests the most common cause of problems is CJS/ESM interoperability.
    - Open the `public/` folder and ensure the expected JS and CSS files are being generated along with a `manifest.json` file.

  It's important to get the application building correctly without any errors at this stage. If you are unsure run `make build-production` which will fail if any problems are found.
- Commit your work.


## Setup basic integration with the Page Kit shell

- Install the shell package:
   ```bash
   npm install -S @financial-times/dotcom-ui-shell
   ```
- Install react, react-dom and the eslint react plugin (this is required by n-gage):
   ```bash
   npm install -S \
     react \
     react-dom \
   npm install -D eslint-plugin-react
   ```
- Create a `page-kit-shell.js` file in the application's `/server` directory with the following content:
   ```js
   const React = require('react');
   const ReactDOM = require('react-dom/server');
   const { Shell } = require('@financial-times/dotcom-ui-shell');

   module.exports = ({ response, next, shellProps }) => {
     return (error, html) => {
       if (error) {
         return next(error);
       }

       const document = React.createElement(
         Shell,
         { ...shellProps, contents: html }
       );

       response.send('<!DOCTYPE html>' + ReactDOM.renderToStaticMarkup(document));
     };
   };
   ```
- Integrate the new `page-kit-shell.js` module in the application's controller files.
    - Require the module.
    - Create a `shellProps` object.
    - Create a `pageKitArgs` object passing in Express route handler params and `shellProps`.
    - Pass the shell with its arguments as a third parameter to the `render()` call.
    ```js
    const pageKitShell = require('./[PATH]/page-kit-shell');
    ...
    const shellProps = {
      pageTitle: 'application-title'
    };
    const pageKitArgs = { request, response, next, shellProps };
    ...
    res.render('layout.html', templateData, pageKitShell(pageKitArgs));
    ```
- Add any additional properties that your application needs to `shellProps` alongside `pageTitle`, e.g. `description`, `openGraph` and `jsonLd`.
- Build and run the application and check the output in the browser.
   - The expected bootstrap scripts and meta tags should be present in the rendered HTML.
   - The page should have a pink background.
- Commit your work.


## Implement the layout component with navigation data

- Install the layout component and the navigation middleware:
   ```bash
     npm install -S \
       @financial-times/dotcom-ui-layout \
       @financial-times/dotcom-middleware-navigation
   ```
- Require the navigation middleware in your application's server file and add it to the list of middlewares being used by your application.
  ```diff
  + const navigationMiddleware = require('@financial-times/dotcom-middleware-navigation');
  ...
  app.use(
  + navigationMiddleware.init()
    ...
  );
  ```
- Integrate the layout component with your `page-kit-shell.js` module.
   - Require the module.
   - Create a `layoutProps` object.
   - Pass `layoutProps` to the existing `document` component.
   - Add `layoutProps` to the function arguments.
     ```diff
     + const { Layout } = require('@financial-times/dotcom-ui-layout');
       ...
     + const layoutProps = {
     +  navigationData: response.locals.navigation,
     +  headerOptions: { ...response.locals.anon }
     + };
     ...
     - module.exports = ({ response, next, shellProps }) => {
     + module.exports = ({ response, next, shellProps, layoutProps }) => {
       ...
       const document = React.createElement(
         Shell,
     -   { ...shellProps, contents: html }
     +   { ...shellProps },
     +   React.createElement(Layout, { ...layoutProps, contents: html })
       );
     ```
- Build and run the application and check the output in the browser.
   - The header, footer and navigation elements should be present in the rendered html.
   - Site skip-links should be present in the rendered html.
- Commit your work.


## Setup Bower package resolution for Page Kit components

- Install the bower glob resolver package as a devDependency:
   ```bash
    npm install -D bower-glob-resolver
   ```
- Add the new resolver to the application's `.bowerrc`:
   ```json
    { "resolvers": ["bower-glob-resolver"] }
   ```
- Use the resolver to add the Page Kit UI components as bower dependencies in the `bower.json` file:
  ```json
  "dependencies": {
    "page-kit-ui-components": "glob:node_modules/@financial-times/dotcom-ui-*/bower.json"
  }
  ```
- Initialise the layout component in the application's client-side JS entrypoint:
   ```js
    import * as layout from '@financial-times/dotcom-ui-layout'
    ...
    layout.init();
   ```
- Import the UI styles in the application's client-side styles entrypoint:
   ```scss
    @import '@financial-times/dotcom-ui-layout/styles';
    @import '@financial-times/dotcom-ui-header/styles';
    @import '@financial-times/dotcom-ui-footer/styles';
   ```
- Delete and reinstall the `bower_components` directory.
- Build the application.
  - If you see errors declaring missing bower modules, these have probably been supplied via n-ui in the past, install them directly in your application now.
- Commit your work.


## Add the asset loader and provide styles and scripts to the shell

- Install the assets middleware:
    ```
    npm install -S @financial-times/dotcom-middleware-assets
    ```
- Integrate the assets middleware in the application's server file.
  - Add the middleware to the list of middlewares being used by your application and configure the `hostStaticAssets` and `publicPath` options.
    ```diff
    + const assetsMiddleware = require('@financial-times/dotcom-middleware-assets');
    ...
    + const isProduction = process.env.NODE_ENV === 'production';
    ...
    app.use(
    +  assetsMiddleware.init({
    +    hostStaticAssets: !isProduction,
    +    publicPath: isProduction ? '/__assets/hashed/page-kit' : '/__dev/assets/[application-name]'
    +  })
    );
    ```
- Use the assets loader api to add `scripts` and `stylesheets` properties to the existing `shellProps` object:
    ```diff
    const shellProps = {
    + scripts: response.locals.assets.loader.getScriptURLsFor('entrypointJS'),
    + stylesheets: response.locals.assets.loader.getStylesheetURLsFor('entrypointCSS')
    ...
    }
    ```
- Build and run the application and check the output in the browser.
  - The network tab should show the expected requests for script files and stylesheets.
  - The header and footer elements should be styled.
  - The application's client-side behaviour should work. Please note you may find runtime errors with the compiled JS. The most common issues are caused by ESM and Common JS module syntax being mixed up or otherwise used incorrectly. You should fix these issues in a separate commit.
- Commit your work.


## Configure Page Kit JS code splitting

- Install the code splitting package:
  ```
  npm install -D @financial-times/dotcom-build-code-splitting
  ```
- Add the code splitting plugin to the list of plugins in  `page-kit.config.js`:
  ```diff
  plugins: [
  + require('@financial-times/dotcom-build-code-splitting').plugin()
    ...
  ]
  ```
- Build and run the application and check the output in the browser.
  - Do the client-side assets load correctly?
  - Check the `/public` file, it should contain several separate assets files.
- Commit your work.


## Implement dom-loaded library to safely initialise client-side JS code

- Install dom-loaded:
    ```
    npm install -S dom-loaded
    ```
- Implement dom-loaded in the client-side JS:
    ```diff
    + import domLoaded from 'dom-loaded';
    ...
    + domLoaded.then(() => {
      layout.init();
      ...
    + });
    ```
- Build and run the application and check the output in the browser.
  - Client-side JS should be running
  - The drawer menu and search bar icons should show/hide those elements.
- Commit your work.


## Integrate flags data with Page Kit shell component

- Install the flags package:
    ```
    npm install -S @financial-times/dotcom-ui-flags
    ```
- Implement the flags component in the client-side JS:
    ```diff
    + import * as flags from '@financial-times/dotcom-ui-flags';
    ...
    domLoaded.then(() => {
    + const flagsClient = flags.init(); // eslint-disable-line no-unused-vars
      layout.init();
      ...
    });
    ```
- Add a `flags` property to `shellProps`:
    ```diff
    const shellProps = {
    + flags: response.locals.flags,
      ...
    }
    ```
- Find any commented out uses of flags and reinstate them.
- Find any code relating to Easter eggs and delete it entirely now or in a separate commit.
- Build and run the application and check the output in the browser.
  - The flags script should be populated with the relevant flags data.
- Commit your work.


## Integrate Page Kit app context data with the shell component

- Install the app context packages:
    ```bash
    npm install \
      @financial-times/dotcom-ui-app-context \
      @financial-times/dotcom-middleware-app-context
    ```
- Require the app context middleware and add it to the list of middlewares used in the application server file.
    ```diff
  + const appContextMiddleware = require('@financial-times/dotcom-middleware-app-context');
  ...
  app.use(
  + appContextMiddleware.init()
    ...
  );
  ```
- Implement the app context component in the client-side JS:
    ```diff
    import * as appContext from '@financial-times/dotcom-ui-app-context';
    ...
    domLoaded.then(() => {
    + const appContextClient = appContext.init(); // eslint-disable-line no-unused-vars
      ...
    });
    ```
- Add a `context` property to `shellProps`:
    ```diff
    const shellProps = {
    + context: response.locals.appContext.data,
      ...
    }
    ```
- Build and run the application and check the output in the browser.
  - The app context script should be populated with the relevant context data.
- Commit your work.


## Implement n-tracking

- Install n-tracking:
    ```
    npm install -S @financial-times/n-tracking
    ```
- Implement n-tracking in the client-side JS with options. At a minimum, include the app context as an option:
    ```diff
    + import * as tracking from '@financial-times/n-tracking';
    ...
    domLoaded.then(() => {
    + tracking.init({ appContext })
      ...
    });
    ```
- Find any commented out uses of tracking.
  - Decide which uses of tracking are still being actively used or monitored. Check https://sites.google.com/ft.com/ftproductanalytics/tracking-documents and chartio or speak to the data team.
  - Reinstate any tracking which is still in use.
- Build and run the application and check the output in the browser.
  - An o-tracking.bundle.js should have been built.
  - An o-tracking script should be present in the bootstrap html.
  - Tracking events (spoor-api.ft.com as `ingest?type=`) should be present in the network tab.
- Commit your work.
