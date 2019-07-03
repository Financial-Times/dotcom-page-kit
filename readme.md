# FT.com Page Kit

[![CircleCI](https://circleci.com/gh/Financial-Times/anvil/tree/master.svg?style=svg&circle-token=2149091698510f3908776e16620b30494fdca26c)](https://circleci.com/gh/Financial-Times/anvil/tree/master)

The aim of this project is to provide a high quality, well tested, and thoroughly documented set of tools for assembling and delivering modern websites with Node.js based upon the best industry standards.

---

- [Scope](#scope)
- [FAQ](#faq)
- [Getting started](#getting-started)

---


## Scope

Page Kit is not a single part but a set of packages which provide the different pieces required to deliver a reliable production website. The packages can be roughly grouped into 4 categories:

### 1. Compiling client-side assets

Page Kit provides a CLI tool built upon Webpack and Babel which is capable of [transpiling], [bundling], and [optimising] client-side JavaScript code. The CLI tool can be configured and extended to suit your requirements and several plugins are provided which enable support for Sass, code splitting, and more.

[transpiling]: https://scotch.io/tutorials/javascript-transpilers-what-they-are-why-we-need-them
[bundling]: https://nolanlawson.com/2017/05/22/a-brief-and-incomplete-history-of-javascript-bundlers/
[optimising]: https://developers.google.com/web/fundamentals/performance/why-performance-matters/

### 2. Server-side rendering

Page Kit includes several packages which are designed to help assemble and deliver a Web page. This includes packages for template rendering, utilities to find and load client-side assets, and fetch data needed to render the shared UI components.

### 3. Client-side bootstrapping

Page Kit has packages to help make fast loading websites which include all of the metadata and information needed by search engines and social networks. There are packages which provide browser [feature detection] and script loading, and utilities to format [Open Graph] and [Linked Data].

[feature detection]: https://en.wikipedia.org/wiki/Feature_detection_(web_development)
[Open Graph]: http://ogp.me/
[Linked Data]: https://json-ld.org/

### 4. Shared UI components

Page Kit includes a set of packages which provide the markup, behaviour, and styles for rendering shared interface components such as the FT.com header, navigation, and footer.


## FAQ

### Why are you doing this?

All of the user facing applications that together make up FT.com use a package called [`n-ui`]. This package currently provides:- tools to build and load client-side code; client-side bootstrapping; template loading and configuration; shared header, footer, and layout UI; navigation menu data; tracking and analytics setup; ads configuration; global messaging components; and more! Although we rely on this module heavily it is not well understood by the current team and is tightly coupled to technical decisions that were made several years ago.

Page Kit splits all of this functionality into a set of loosely coupled, individually documented, and tested packages. The aim is to provide a flexible foundation which teams can build upon rather than prescribing a whole solution.

See the [original pitch document] for more information.

[`n-ui`]: https://github.com/Financial-Times/n-ui
[original pitch document]: https://docs.google.com/document/d/1UNRbX-BpPESA4-wSfCb6DRYIijyOUhBJh99iUE95cU0/edit?usp=sharing

### Does this replace `n-ui`?

The intention of this project is to replace `n-ui`.

### How does this relate to Origami?

This project does not include any visual changes to the FT.com so the relationship between FT.com and Origami is unchanged.

### Will this target non-FT.com teams?

Our aim is to build a core set of packages which should be considered usable by the wider JavaScript community. On top of this core we will build FT.com specific modules. We hope that by introducing this conceptual divide we can make fewer assumptions, encourage contributions, and more effectively manage opinionated parts of the codebase.


## Getting started

### Requirements

To get started with Page Kit, you'll need to make sure you have the following software tools installed.

1. [Git](https://git-scm.com/)
2. [Node.js](https://nodejs.org/en/) (version 8 or higher is required)
3. [npm](http://npmjs.com/)
4. [GNU Parallel](https://www.gnu.org/software/parallel/) (Optional, for running parallel `watch` scripts)

Please note that Page Kit has only been tested in Mac and Linux environments. If you are on a Mac you may find it easiest to install the [Command Line Tools](https://developer.apple.com/download/more/) package which includes Git.


### Project setup

1. Clone the Page Kit Git repository and change to the new directory that has been created:

    ```bash
    git clone git@github.com:financial-times/anvil
    cd anvil
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

Before writing any new code you may also find it useful to refer to the [contribution guide](contribution.md) which covers coding standards and expectations.

### Project structure

The repository groups all public packages together in a single `packages/` directory. There is also an `example/` directory which includes several applications which demonstrate the usage of various packages and provide the basis of the integration and end-to-end tests.

Packages follow a naming convention which broadly denotes their functionality, these are:

- `dotcom-middleware-*` An [Express] compatible middleware
- `dotcom-build-*` A plugin for the Page Kit CLI build task
- `dotcom-server-*` A generic Node.js module
- `dotcom-types-*` Shared TypeScript declaration files
- `dotcom-ui-*` A UI component

[Express]: https://expressjs.com/

### Using Storybook

[Storybook] is a development environment and showcase for UI components. It makes working on and sharing UI components easier by providing a richly configurable environment.

[Storybook]: https://storybook.js.org/

Before starting Storybook you must first run the build script for all packages using this command:

```
npm run build
```

Once all of the packages have been built you can run Storybook using the following the command:

```
npm run storybook
```

The Storybook interface should then automatically open in your default browser. Storybook has been configured to automatically find stories inside packages prefixed with `dotcom-ui-`.

_Please note_ that the Storybook configuration file at `./.storybook/config.js` is automatically generated from the template located at `./.storybook/config.template.js`. Anything that needs to be added to the Storybook configuration file should be added to `./.storybook/config.template.js`. You do not need to manually add stories to the Storybook configuration file as these will be automatically discovered.
