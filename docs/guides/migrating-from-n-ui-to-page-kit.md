# Migrating from n-ui to Page Kit (v0.1.0)

🏗 WIP 🏗

##  Remove n-ui

_NOTE: This is quite a long step and you may need a notepad and pen._

- Update `.gitignore`, replace all the `public/*` lines with a single `public/` line.
- Remove n-ui scripts from `makefile`, we will add replacement scripts later.
- Remove n-ui as a dependency from `bower.json` and `package.json` (but leave n-ui-foundations, Page Kit does not replace any part of n-ui-foundations).
- Delete `n-ui-build.config.js` in the app root directory.

### Client-side

#### Sass

- Open the Sass entry point and remove `@import 'n-ui/main';`.
- Remove any `nUiStylesheetStart/nUiStylesheetEnd` mixins from the Sass source code, there is no equivalent in Page Kit.

#### JavaScript

- Open the client-side JS entry point.
- Remove any dependency on `n-ui` or `@financial-times/n-ui`.
- Comment out any references to `flags` imported from n-ui, we will bring them back later.
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

- Update the Express server initialisation options, at a minimum set `withFlags`, `withConsent` and `withAnonMiddleware` to `true`.
  ```diff
  const app = express({
    ...
  + withFlags: true,
  + withConsent: true,
  + withAnonMiddleware: true
  });
  ```
- If any `helpers` are being registered at this time comment out these dependencies and then remove the `helpers` option.
- Make a note of what features `app.locals.nUiConfig = {}` is configuring and then delete it.
    - See https://github.com/Financial-Times/n-ui/blob/master/browser/js/app-initializer.js for the complete list of features.
    - _Please note_ that we will need to initialise any client-side components not included in Page Kit later, such as image lazy loading, n-feedback, o-date, etc.

- Finally, search for any references to `n-ui` and `nui` and clean up what's left. Commit your work and have a cup of tea, you've earned it!
