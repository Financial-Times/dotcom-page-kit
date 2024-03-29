# Handlebars Helpers

This package contains a suite of helpers to enable the migration of applications from [n-handlebars] to Page Kit. Not every helper provided by n-handlebars has been ported over; any helpers we could not find usage of, are used only within [n-ui], or have dependencies on other Handlebars components have not been included.

[n-ui]: https://github.com/Financial-Times/n-ui/
[n-handlebars]: https://github.com/Financial-Times/n-handlebars


## Usage

When using this package you can import the `helpers` property and provide it as an option when creating a new `PageKitHandlebars` instance. Please note that helpers will not be appended to the global Handlebars instance.

```js
const { PageKitHandlebars, helpers } = require('@financial-times/dotcom-server-handlebars')
const renderer = new PageKitHandlebars({ helpers })
```

Alternatively if you want to use the helpers with an existing Handlebars instance:

```js
const Handlebars = require('handlebars')
const { helpers } = require('@financial-times/dotcom-server-handlebars')

Handlebars.registerHelper(helpers)
```


## Block helpers

### capture

Captures the string inside of the opening and closing tags and assigns it to a variable.

Example:

```hbs
{{#capture "myOutput"}}I am being captured.{{/capture}}

{{myOutput}}
```

### dateformat

Formats a [date object] using the [dateformat] library. If no format is specified it will default to the `isoUtcDateTime` format.

Example:

```hbs
{{#dateformat}}{{date}}{{/dateformat}}
{{#dateformat "fullDate"}}{{ date }}{{/dateformat}}
{{#dateformat "dddd, d mmmm, yyyy"}}{{ date }}{{/dateformat}}
```

[date object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
[dateformat]: https://www.npmjs.com/package/dateformat

### ifAll

Outputs the content if all of the parameters are [truthy].

Example:

```hbs
{{#ifAll foo bar baz}}All parameters are truthy{{else}}A parameter is falsy{{/ifAll}}
```

[truthy]: https://developer.mozilla.org/en-US/docs/Glossary/Truthy

### ifEquals

Outputs the content if all of the parameters are [strictly equal]. The first parameter is used as the control and all parameters are tested against it.

Example:

```hbs
{{#ifEquals foo bar}}Parameters are all equal{{else}}A parameter does not match{{/ifEquals}}
```

[strictly equal]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness

### ifEqualsSome

Outputs the content if some of the parameters are [strictly equal]. The first parameter is used as the control and all parameters are tested against it.

Example:

```hbs
{{#ifEqualsSome foo bar baz}}Some parameters are all equal{{else}}No parameters match{{/ifEqualsSome}}
```

### ifSome

Outputs the content if at least one of the parameters is [truthy].

Example:

```hbs
{{#ifSome foo bar baz}}A parameter is truthy{{else}}All parameters are falsy{{/ifSome}}
```

### renderReactComponent

Outputs a JSX component specified by its local path (relative to the root of the app consuming `dotcom-server-handlebars`) or the package name of the node module, with specification of a named export if required, as well as any other props.

Example:

```hbs
{{{renderReactComponent localPath="views/components/ComponentWithHbsOutput" title="This is a React component"}}}

{{{renderReactComponent package="@financial-times/dotcom-ui-header" namedExport="LogoOnly" variant="large-logo"}}}
```

### resize

Deliver an image via the [Origami Image Service] and resize it to the specified width. Additional named parameters will be appended to the URL query string.

Example:

```hbs
<img src="{{#resize 640}}{{image}}{{/resize}}" />
<img src="{{#resize 640 fit="contain"}}{{image}}{{/resize}}" />
```

[Origami Image Service]: https://www.ft.com/__origami/service/image/v2/

### slice

Iterate over a subset of items. Accepts an `offset` and `limit` parameter.

Example:

```hbs
{{#slice iterable offset="2"}}{{this}}{{/slice}}
{{#slice iterable offset="4" limit="2"}}{{this}}{{/slice}}
```

### unlessAll

Outputs the content if all of the parameters are [falsy].

Example:

```hbs
{{#unlessAll foo bar baz}}All parameters are falsy{{else}}A parameter is truthy{{/unlessAll}}
```

[falsy]: https://developer.mozilla.org/en-US/docs/Glossary/Falsy

### unlessEquals

Outputs the content if any parameters are _not_ [strictly equal].

Example:

```hbs
{{#unlessEquals foo bar}}Parameters are not equal{{else}}All parameters match{{/unlessEquals}}
```

### unlessSome

Outputs the content if any of the parameters are [falsy].

Example:

```hbs
{{#unlessSome foo bar baz}}A parameter is falsy{{else}}All parameters are truthy{{/unlessSome}}
```


## Inline helpers

### array

Converts the given parameters into a single array.

Example:

```hbs
{{array foo bar baz}}
{{>partial parameter=(array foo bar baz)}}
```

### concat

Concatenates multiple parameters into a single string.

Example:

```hbs
{{concat "Welcome to " name}}
{{>partial parameter=(concat "Welcome to " name)}}
```

### encode

Encodes a uniform resource identifer (URI) using [`encodeURIComponent()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) or [`encodeURI()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI).

Example:

```hbs
{{encode text}}
{{encode text mode="uri"}}
```

### json

JSON stringifies the given parameter. Please note that this will error if you try to output the `@root` context when used in an Express application as this may contain secret information.

Example:

```hbs
{{{json data}}}
```
