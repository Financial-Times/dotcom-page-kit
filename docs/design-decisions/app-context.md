# Design Decisions: App context

App context is a combination of metadata about the current application and the page it is serving for use by client-side code. This is a change from the existing FT.com toolset.

Previously metadata was embedded into the HTML as data attributes on the document element (`<html>`). This implementation had several problems:

- What the metadata properties were and how they should be used was not defined anywhere.
- The mechanism was often misused to pass additional information from server to client which lead to de facto standards emerging across different parts of FT.com.
- We did not know who or what relies on this data meaning we were scared to change it, or fix it.
- Several properties had changed in scope, either the name became irrelevant or the type of data had changed.

To help resolve this our implementation of app context is based upon a schema which documents and guarantees the data. The schema also defines how the feature can be used to reduce the chances of it being re-purposed or misused. The schema also enables us provide an official reference for people to follow because we don't always know who or what may be using the data.

Finally, the app context feature has enabled us to refactor the [tracking] component. It now provides its own, separate options, and is deterministic rather than arbitrarily scraping pages for information.

[tracking]: https://github.com/Financial-Times/n-tracking/

## Decision owners

- Matt Hinchliffe
- Ifeanyi Isitor
