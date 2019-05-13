# Anvil

[![CircleCI](https://circleci.com/gh/Financial-Times/anvil/tree/master.svg?style=svg&circle-token=2149091698510f3908776e16620b30494fdca26c)](https://circleci.com/gh/Financial-Times/anvil/tree/master)

<p align="center">
  <img src="https://media.giphy.com/media/CtGZtZklB1yCs/giphy-downsized.gif" alt="3 fellas hammering it out">
</p>

The aim of this project is to provide a high quality, well tested, and thoroughly documented set of tools for assembling and delivering modern websites with Node.js  based upon the best industry standards.

---

- [Scope](#scope)
- [FAQ](#faq)
- [Getting started](#getting-started)

---


## Scope

Anvil is not a single part but a suite of packages which provide the component pieces required to deliver a reliable production Website. Packages can be grouped into 4 categories:

### 1. Compiling client-side code

Anvil provides a build tool built upon Webpack and Babel which is capable of [transpiling], [bundling], and [optimising] client-side JavaScript code. The build tool can be configured and extended to suit your requirements via a [plugin system] and Anvil provides several plugins which can enable support for Sass and PostCSS, code splitting, and more.

[transpiling]: https://scotch.io/tutorials/javascript-transpilers-what-they-are-why-we-need-them
[bundling]: https://nolanlawson.com/2017/05/22/a-brief-and-incomplete-history-of-javascript-bundlers/
[optimising]: https://developers.google.com/web/fundamentals/performance/why-performance-matters/
[plugins]: #todo

### 2. Server-side rendering

Anvil includes several packages which can be used to help assemble and deliver a Web page. This includes packages for [Handlebars] and [JSX] template rendering, utilities to find and load client-side assets, and fetch any data needed to render the shared UI components.

[Handlebars]: https://handlebarsjs.com/
[JSX]: https://reactjs.org/docs/introducing-jsx.html

### 3. Client-side bootstrapping

Anvil has been designed to make fast loading Websites which include all of the metadata and information needed by search engines and social networks. These packages provide browser [feature detection] and script loading, data dehydration and rehydration, and utilities to format [Open Graph] and [Linked Data].

[feature detection]: https://origami.ft.com/docs/components/compatibility/
[Open Graph]: http://ogp.me/
[Linked Data]: https://json-ld.org/

### 4. Shared UI components

Anvil includes a set of packages which provide the markup, behaviour, and styles for shared interface components such as the FT.com header, navigation, and footer.


## FAQ

### Why are you doing this?

All of the user facing applications that together make up FT.com use a module called [`n-ui`]. This module currently provides:- tools to build and load client-side code; client-side bootstrapping; template loading and configuration; shared header, footer, and layout UI; navigation menu data; tracking and analytics setup; global messaging components; and more. Although we rely on this module heavily it is not well understood by the current team and is tightly coupled to technical decisions that were made several years ago.

Anvil splits these functions into a suite of tightly defined, loosely coupled packages based upon the current best standards. The aim is to provide a foundation which enables teams to work efficiently with the technologies best suited to solving the problems they have.

See the [original pitch document] for more information.

[`n-ui`]: https://github.com/Financial-Times/n-ui
[original pitch document]: https://docs.google.com/document/d/1UNRbX-BpPESA4-wSfCb6DRYIijyOUhBJh99iUE95cU0/edit?usp=sharing

### Does this replace `n-ui`?

The intention of this project is to replace `n-ui`

### How does this relate to Origami?

This project does not include any visual changes to the FT.com UI so the relationship between FT.com and Origami is unchanged.

### Will this target non-FT.com teams?

Our aim is to build a core set of packages which should be considered usable by the wider JavaScript community. On top of this core we will build FT.com specific modules. We hope that by introducing this conceptual divide we can make fewer assumptions, encourage contributions, and more effectively manage opinionated parts of the codebase.


## Getting started

### Requirements

To get started with Anvil, you'll need to make sure you have the following software tools installed.

1. [Git](https://git-scm.com/)
2. [Make](https://www.gnu.org/software/make/)
3. [Node.js](https://nodejs.org/en/) (version 8 or higher is required)
4. [npm](http://npmjs.com/)

Please note that Anvil has only been tested in Mac and Linux environments. If you are on a Mac you may find it easiest to install the [Command Line Tools](https://developer.apple.com/download/more/) package which includes Git and Make.


### Project setup

1. Clone the Anvil Git repository and change to the new directory that has been created:

    ```bash
    git clone git@github.com:financial-times/anvil
    cd anvil
    ```

2. Install all of the project dependencies (this may take a few minutes if you are running this for the first time):

    ```bash
    npm install
    ```

3. You can now choose to run an example application or start Storybook to view the current set of UI components. Examples are located in the `examples/` directory and have their own instructions. To use Storybook you can follow [the guide below](#using-storybook).

Before getting started on writing any code you may also find it useful to refer to the [contribution guide](contribution.md) which covers coding standards and expectations.

### Project structure

The repository groups all public packages together in a single `packages/` directory. There is also an `example/` directory which includes several applications demonstrating the usage and aiding the development of various packages.

Packages should follow a naming convention to denote their functionality, these are:

- `anvil-middleware-*` An [express.js] compatible middleware
- `anvil-plugin-*` A plugin for the Anvil CLI tool
- `anvil-server-*` A generic Node.js module
- `anvil-types-*` Shared TypeScript declaration files
- `anvil-ui-*` A UI component

[express.js]: https://expressjs.com/

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

The Storybook interface should then automatically open in your default browser. Storybook has been configured to automatically find stories in files ending with `*story.tsx` inside packages prefixed with `anvil-ui-`.

_Please note_ that the Storybook configuration file at `./.storybook/config.js` is automatically generated from the template located at `./.storybook/config.template.js`. Anything that needs to be added to the Storybook configuration file should be added to `./.storybook/config.template.js`. You do not need to manually add stories to the Storybook configuration file as these will be automatically discovered.

### Updating a dependency across the repo

To upgrade to the latest version of a particular prod, dev and peer dependency across the entire repo, use the `npm run script:update <dependency>` command. For instance, to upgrade to the latest version of `react`, you would run the following:

```
npm run script:update react
```
