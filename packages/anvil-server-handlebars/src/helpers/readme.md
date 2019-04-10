# Helpers

## Block helpers

### dateformat

Formats a [date object] using the [dateformat] library. If no format is specified it will default to the built in `isoUtcDateTime` format.

Example:

```hbs
{{#dateformat}}{{date}}{{/dateformat}}
{{#dateformat "fullDate"}}{{ date }}{{/dateformat}}
{{#dateformat "dddd, d mmmm, yyyy"}}{{ date }}{{/dateformat}}
```

[date object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
[dateformat]: https://www.npmjs.com/package/dateformat

### ifAll

Outputs the content if all of the given parameters are [truthy].

Example:

```hbs
{{#ifAll foo bar baz}}All parameters are truthy{{else}}A parameter is falsy{{/ifAll}}
```

[truthy]: https://developer.mozilla.org/en-US/docs/Glossary/Truthy

### ifEquals

Outputs the content if all parameters are [strictly equal].

Example:

```hbs
{{#ifEquals foo bar}}Parameters are strictly equal{{else}}Parameters do not match{{/ifEquals}}
```

[strictly equal]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness

### ifSome

Outputs the content if at least one of the given parameters is [truthy].

Example:

```hbs
{{#ifSome foo bar baz}}Some parameters are truthy{{else}}A parameter is falsy{{/ifSome}}
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

Outputs the content if all of the given parameters are [falsy].

Example:

```hbs
{{#unlessAll foo bar baz}}All parameters are falsy{{else}}A parameter is truthy{{/unlessAll}}
```

[falsy]: https://developer.mozilla.org/en-US/docs/Glossary/Falsy

### unlessEquals

Outputs the content if any parameters are _not_ [strictly equal].

Example:

```hbs
{{#unlessEquals foo bar}}Parameters are not strictly equal{{else}}Parameters match{{/unlessEquals}}
```

### unlessSome

Outputs the content if any of the given parameters are [falsy].

Example:

```hbs
{{#unlessSome foo bar baz}}Some parameters are false{{else}}All parameters are truthy{{/unlessSome}}
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

### json

JSON stringifies the given parameter. You cannot use this to output the `@root` context when used in an Express application as this may contain secret information.

Example:

```hbs
{{{json data}}}
```
