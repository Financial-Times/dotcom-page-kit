# Helpers

## dateformat

Formats a [date object] using the [dateformat] library. If no format is specified it will default to the built in `isoUtcDateTime` format.

Example:

```hbs
{{#dateformat}}{{date}}{{/dateformat}}
{{#dateformat "fullDate"}}{{ date }}{{/dateformat}}
{{#dateformat "dddd, d mmmm, yyyy"}}{{ date }}{{/dateformat}}
```

[date object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
[dateformat]: https://www.npmjs.com/package/dateformat


## ifAll

Outputs the content if all of the given parameters are [truthy].

Example:

```hbs
{{#ifAll foo bar baz}}All parameters are truthy{{else}}A parameter is falsy{{/ifAll}}
```

[truthy]: https://developer.mozilla.org/en-US/docs/Glossary/Truthy


## ifEquals

Outputs the content if all parameters are [strictly equal].

Example:

```hbs
{{#ifEquals foo bar}}Parameters are strictly equal{{else}}Parameters do not match{{/ifEquals}}
```

[strictly equal]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness


## ifSome

Outputs the content if at least one of the given parameters is [truthy].

Example:

```hbs
{{#ifSome foo bar baz}}Some parameters are truthy{{else}}A parameter is falsy{{/ifSome}}
```


## resize

Deliver an image via the [Origami Image Service] and resize it to the specified width.

Example:

```hbs
<img src="{{#resize 640}}{{image}}{{/resize}}" />
```

[Origami Image Service]: https://www.ft.com/__origami/service/image/v2/
