<h1 align="center">
    <img alt="FT.com Page Kit" src="etc/logo.svg" width="300">
</h1>

[![CircleCI](https://circleci.com/gh/Financial-Times/dotcom-page-kit/tree/main.svg?style=svg&circle-token=2149091698510f3908776e16620b30494fdca26c)](https://circleci.com/gh/Financial-Times/dotcom-page-kit/tree/main)

Page Kit provides a high quality, well tested, and thoroughly documented set of tools for assembling and delivering FT.com based upon the best industry standards.

---

- [Scope](#scope)
- [Getting started](#getting-started)
- [FAQ](#faq)

---


## Scope

Page Kit is not a single part but a set of packages which provide the different pieces required to deliver a reliable production website. The packages can be roughly grouped into 4 categories:

### 1. Compiling client-side assets

Page Kit provides Webpack and Babel configuration which is capable of [transpiling], [bundling], and [optimising] client-side JavaScript code. The config can be configured and extended to suit your requirements and several plugins are provided which enable support for Sass, code splitting, and more.

[transpiling]: https://scotch.io/tutorials/javascript-transpilers-what-they-are-why-we-need-them
[bundling]: https://nolanlawson.com/2017/05/22/a-brief-and-incomplete-history-of-javascript-bundlers/
[optimising]: https://developers.google.com/web/fundamentals/performance/why-performance-matters/

### 2. Server-side rendering

Page Kit includes several packages which are designed to help assemble and render a Web page. This includes packages for template rendering, utilities to find and load client-side assets, and fetch data needed to render the global UI components.

### 3. Client-side bootstrapping

Page Kit has packages to help make fast loading websites which include all of the metadata and information needed by search engines and social networks. There are packages which provide browser [feature detection] and script loading, and utilities to format [Open Graph] and [Linked Data].

[feature detection]: https://en.wikipedia.org/wiki/Feature_detection_(web_development)
[Open Graph]: http://ogp.me/
[Linked Data]: https://json-ld.org/

### 4. Global UI components

Page Kit includes a set of packages which provide the markup, behaviour, and styles for rendering global interface components such as the FT.com header, navigation, and footer.


## Getting started

### Requirements

To get started with Page Kit, you'll need to make sure you have the following software tools installed.

1. [Git](https://git-scm.com/)
2. [Node.js](https://nodejs.org/en/) (version 12 or higher is required)
3. [npm](http://npmjs.com/)
4. [GNU Parallel](https://www.gnu.org/software/parallel/) (Optional, for running parallel `watch` scripts)

Please note that Page Kit has only been tested in Mac and Linux environments. If you are on a Mac you may find it easiest to install the [Command Line Tools](https://developer.apple.com/download/more/) package which includes Git.


### Project setup

1. Clone the Page Kit Git repository and change to the new directory that has been created:

    ```bash
    git clone git@github.com:Financial-Times/dotcom-page-kit
    cd dotcom-page-kit
    ```

2. Install all of the project dependencies (this may take a few minutes if you are running this for the first time):

    ```bash
    npm install
    ```

3. Compile all of the packages (again, this may take a while if you are running this for the first time):

    ```bash
    npm run build
    ```

4. You can now choose to run an example application or start Storybook to view UI component demos. Examples are located in the `examples/` directory and each have their own instructions. To use Storybook you can follow [the guide below](#using-storybook).

Before writing any new code you may also find it useful to refer to the [architecture overview](architecture.md) and [contribution guide](contribution.md) which covers coding standards and expectations.


### Project structure

The repository groups all public packages together in a single `packages/` directory. There is also an `example/` directory which includes several applications which demonstrate the usage of various packages and provide the basis of the integration and end-to-end tests.

Packages follow a naming convention which broadly denotes their functionality, these are:

- `dotcom-middleware-*` An [Express] compatible middleware
- `dotcom-build-*` A plugin for the Page Kit CLI build task
- `dotcom-server-*` A generic Node.js module
- `dotcom-types-*` Shared TypeScript declaration files
- `dotcom-ui-*` A UI component

If you're interested to know more about our approach of building so many small packages see our [architecture overview](architecture.md) and [design decisions document](docs/design-decisions/many-small-packages.md).

[Express]: https://expressjs.com/


### Using Storybook

[Storybook] is a development environment and showcase for UI components. It makes working on and sharing UI components easier by providing a richly configurable environment.

[Storybook]: https://storybook.js.org/

Before starting Storybook you must first run the build script for all packages (if you have not done so already) using this command:

```
npm run build
```

Once all of the packages have been built you can run Storybook using the following the command:

```
npm run storybook
```

The Storybook interface should then open in your default browser. Storybook has been configured to automatically find stories inside packages with names prefixed with `dotcom-ui-`.

#### Storybook deployment
The deployment of Storybook to Github Pages is managed by our CircleCI workflow. It is able to deploy to Github Pages by using a personal access token created from the `next-team` Github account, stored in the `GH_TOKEN` Vault environment variable.


## FAQ

### Why are you doing this?

All of the user facing applications that together make up FT.com used to use a package called [`n-ui`]. This package provided:- tools to build and load client-side code; client-side bootstrapping; template loading and configuration; global header, footer, and layout UI; navigation menu data; tracking and analytics setup; ads configuration; global messaging components; and more! Although we relied on this module heavily it was not well understood by the current team and was tightly coupled to technical decisions that were made several years ago.

Page Kit splits all of this functionality into a set of loosely coupled, individually documented, and tested packages. They provide a flexible foundation which teams can build upon rather than prescribing a whole solution.

See the [original pitch document] for more information.

[`n-ui`]: https://github.com/Financial-Times/n-ui
[original pitch document]: https://docs.google.com/document/d/1UNRbX-BpPESA4-wSfCb6DRYIijyOUhBJh99iUE95cU0/edit?usp=sharing

### Does this replace `n-ui`?

Page Kit has completely replaced `n-ui` on FT.com.

### How does this relate to Origami?

This project does not include any visual changes to the FT.com so the relationship between FT.com and Origami is unchanged.

### Will this target non-FT.com teams?

Page Kit has been designed to work on FT.com applications and should not be used outside this team.
