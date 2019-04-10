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

Outputs the content if all of the given conditions are [truthy].

Example:

```hbs
{{#ifAll foo bar baz}}All conditions are truthy{{else}}A condition is falsy{{/ifAll}}
```

[truthy]: https://developer.mozilla.org/en-US/docs/Glossary/Truthy


## ifEquals

Outputs the content if the two conditions are [strictly equal].

Example:

```hbs
{{#ifEquals foo bar}}Conditions are strictly equal{{else}}Conditions do not match{{/ifEquals}}
```

[strictly equal]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness


## ifSome

Outputs the content if at least one of the given conditions is [truthy].

Example:

```hbs
{{#ifSome foo bar baz}}All conditions are truthy{{else}}A condition is falsy{{/ifSome}}
```
