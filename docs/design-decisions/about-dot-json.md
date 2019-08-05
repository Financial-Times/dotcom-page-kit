# Design Decisions: \_\_about.json

Page Kit does not generate an `__about.json` file and therefore does not support the `/__about` endpoint which is automatically configured when using `n-express`. This is a change from the existing FT.com toolset.

The `__about` endpoint was a [proposed standard] which suggested all web applications run by the FT should expose some metadata including the application name, version, and the supporting team  in order to more easily discover and track this information.

However, the proposal was never fully implemented across the FT and has since been superseded by developments in [Biz Ops] and [automated change logging].

In addition to the proposed schema `n-ui` also appended its version number which was used to track the progress of new releases and configure which external assets to use. Neither of these use-cases are applicable to Page Kit; we recommend installing Page Kit packages with a fixed version number (and for consumers to use tools able to automatically update it) and applications build and consume their own assets.

We are aware that the `__about` endpoint may still be useful when debugging but the metadata remains accessible via other means including using the FT debug headers when making requests to an application or referring to the [app context data] which is embedded in HTML pages.

[proposed standard]: https://docs.google.com/document/d/1k0xIwNjRSxVEmabKE3t4RijzkJn4y_13oFPD2wFukfw/edit
[Biz Ops]: https://biz-ops.in.ft.com/
[automated change logs]: https://github.com/Financial-Times/change-api
[app context data]: ../../packages/dotcom-server-app-context/schema.md

## Decision owners

- Matt Hinchliffe
- Samuel Parkinson
- Jake Champion