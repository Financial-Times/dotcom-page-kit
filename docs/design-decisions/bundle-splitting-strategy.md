# Design Decisions: The Bundle Splitting Strategy


## Bundle splitting

A Bundle splitting strategy aims to reuse as much code as possible between client requests minimising the amount of new code that a user needs to download between requests.

Code which is sent to browsers is bundled into a set of distinct chunks which can be shared between pages if the requested code remains the same. If a client already has a required code bundle it will serve the bundle from its cache rather than requesting it again. This is the most performant way to serve files to the browser.


## Enabling bundle splitting

Apps which are serving client-side code should include the [ft-js-bundle-splitting] plugin in their anvil.config.js files to enable bundle-splitting.

Once the webpackConfig has been loaded the plugin will execute a number of bundle-splitting rules to chunk the application code into bundles.


## Strategy

The [ft-js-bundle-splitting] plugin bundles application code as follows:

 - A single bundle consisting of all the origami components requested.

 - A single bundle consisting of all the anvil components requested.

 - A bundle of stable components which are widely used and which change infrequently.

 - A single bundle of shared components which are likely to change regularly.

 - A webpack runtime bundle. Webpack generates a webpack runtime which contains all of the code webpack needs to load your chunked code in the browser.


[ft-js-bundle-splitting]:https://github.com/Financial-Times/anvil/tree/master/packages/anvil-plugin-ft-js-bundle-splitting

