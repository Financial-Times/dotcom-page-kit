# Design Decisions: App context

App context is a combination of metadata about the current application and the page it is serving for use by client-side code. This is a change from the existing FT.com toolset.

Previously metadata was embedded into the HTML as data attributes on the document element (`<html>`). This implementation had several problems:

- What the metadata properties were and how they should be used was not defined anywhere.
- The mechanism was often misused to pass additional information from server to client which lead to de facto standards emerging across different parts of FT.com.
- We did not know who or what relies on this data meaning we were scared to change it, or fix it.
- Several properties had changed in scope, either the name became irrelevant or the type of data had changed.

To help resolve this our implementation of app context is based upon a schema which documents and guarantees the data. The schema also defines how the feature can be used to reduce the chance of it being re-purposed or misused. Because we don't always know who or what may be using the data the schema enables us communicate an official point of reference for them to follow.

The new app context feature has also enabled us to refactor the [ads] and [tracking] component configuration to be deterministic rather than have each separately and arbitrarily scraping pages for information.

[ads]: https://github.com/Financial-Times/n-ads/
[tracking]: https://github.com/Financial-Times/n-tracking/
