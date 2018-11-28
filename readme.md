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

### CLI

The CLI tool provides a suite of actions which can be extended via plugins. To begin with we are working on the `build` action which can be used to assemble the static assets for your application. By default this action includes only a barebones Webpack configuration but capabilities to transpile JS2018, TypeScript, CSS, Sass, and more can be plugged in to extend this functionality.

### Server-side

This suite of modules will help your application to render user interfaces. These provide a wide range of functionality such as template rendering, hook your app up to external data sources (such as polling feature flags), and middleware to decorate request and response data.

### Application shell

The application shell provides the basic UI components for your application. This includes templates and layouts, feature detection, client-side bootstrapping, and shared client-side functionality such as analytics.


## FAQ

### What is an asset pipeline?

An asset pipeline is a set of tools and processes used to compile and optimise source code into a set of static JavaScript and CSS assets for use by a web browser. This may include [transpiling], [bundling], and [minification] steps.

[transpiling]: https://scotch.io/tutorials/javascript-transpilers-what-they-are-why-we-need-them
[bundling]: https://nolanlawson.com/2017/05/22/a-brief-and-incomplete-history-of-javascript-bundlers/
[minification]: https://blog.stackpath.com/glossary/minification/

### What is an application shell?

The application shell provides the tools required to locate and load the static assets generated by the asset pipeline and provide them to the browser. This includes the loading of JavaScript, stylesheets, fonts, and a minimal HTML document.

### Why are you doing this?

All of the user facing applications that together make up FT.com use a module called [n-ui]. This module currently provides:- an asset pipeline; an application shell; template loading and configuration; shared header and footer UI; navigation; tracking and analytics setup; global messaging components; and several other features. Although we rely on this module heavily it is not well understood by the current team and is tightly coupled to technical decisions that were made several years ago.

We plan to split these functions into a suite of tightly defined, loosely coupled modules based upon the current best standards. The aim is to provide a foundation which enables teams to work efficiently with the technologies best suited to solving the problems they have.

See the [original pitch document] for more information.

[n-ui]: https://github.com/Financial-Times/n-ui
[original pitch document]: https://docs.google.com/document/d/1UNRbX-BpPESA4-wSfCb6DRYIijyOUhBJh99iUE95cU0/edit?usp=sharing

### Does this replace n-ui?

The intention of this project is to gain in-depth knowledge about the features and usage of n-ui and to use this knowledge to help create a new suite of tools. If we are successful then we will help and encourage developers to migrate from n-ui to them.

### How does this relate to Origami?

This project does not include any visual changes to the FT.com application UI so the relationship between FT.com and Origami will remain unchanged.

### Will this target non-FT.com teams?

It is our aim to build a core set of modules which should be considered usable by the wider JavaScript community. On top of this core we will build FT specific modules. We hope that by introducing this conceptual divide we can make fewer assumptions, encourage contributions, and more effectively manage opinionated parts of the codebase.


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

3. Run the build script for all packages:

    ```bash
    npm run build
    ```

4. Start Storybook to view the current set of UI components:

    ```bash
    npm run storybook
    ```

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

Before starting Storybook, first run the build script for all packages using this command:

```
npm run build
```

Once all of the packages have been built you can run Storybook using the following the command:

```
npm run storybook
```

The Storybook interface should then automatically open in your default browser. Storybook has been configured to automatically find stories in files ending with `*story.tsx` inside packages prefixed with `anvil-ui-`.

Please note that the Storybook configuration file is automatically generated from the template located at `./.storybook/config.template.js`. As such, anything that needs to be added to the `config.js` file will have to be instead placed in the `./.storybook/config.template.js`. You do not need to manually add stories to the `config.js` file as these are automatically discovered
