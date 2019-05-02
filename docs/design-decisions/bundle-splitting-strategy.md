# Design Decisions: The JavaScript Bundle Splitting Strategy


## JavaScript Bundle splitting

A bundle splitting strategy aims to reuse as much code as possible between client requests minimising the amount of new code that a user needs to download as they browse FT.com.

Code which is sent to browsers is [chunked] into a set of distinct [bundles] which can be shared between pages if the requested code remains the same. A bundle contains a combined and the final version of its various source code files after any compilation and minification steps have been completed.

At FT we have separate applications which serve different pages or page components for FT.com but which nonetheless share dependencies and therefore code. Bundle splitting allows us to reuse code between our applications. If a client already has a specific code bundle it will serve the bundle from its cache rather than requesting it again; this is the most performant way to serve files to the browser and something that we want to optimize for.


### Bundling strategies in n-ui and anvil

With n-ui an application builds a single code bundle for its own code and n-ui separately creates a bundle of n-ui-specific code. This leads to duplicate code being downloaded by users as they navigate our site. As an example, the application bundle downloaded when a user visits the home page shares a lot of code with the application bundle downloaded for the stream page but the browser is not able to reuse any of this code because the bundle as a whole has changed.

With anvil, applications are responsible for bundling both their own code and any anvil code they depend on. Commonly shared code is chunked into a separate bundles as detailed below to enable reuse by the browser. These steps reduce the chances that multiple copies of common modules will be downloaded as users navigate FT.com.


## Enabling bundle splitting

Apps which are serving client-side code should include the [ft-js-bundle-splitting] plugin in their anvil.config.js files to enable bundle-splitting.

Once the webpackConfig has been successfully loaded the plugin will execute a number of bundle-splitting rules to chunk the application code into bundles.


## Strategy

The [ft-js-bundle-splitting] plugin bundles application code as follows:

 - A single bundle consisting of application-specific code.

 - A separate bundle for each origami component requested.

 - A separate bundle for each anvil component requested.

 - A single bundle of stable packages which are widely used and which change infrequently.

 - A single bundle of shared packages which are likely to change regularly.

 - A webpack runtime bundle. Webpack generates a webpack runtime which contains all of the code webpack needs to load your chunked code in the browser.


[ft-js-bundle-splitting]:https://github.com/Financial-Times/anvil/tree/master/packages/anvil-plugin-ft-js-bundle-splitting
[chunked]:https://webpack.js.org/glossary/#c
[bundles]:https://webpack.js.org/glossary/#b
