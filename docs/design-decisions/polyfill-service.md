# Design Decisions: Polyfill Service

Anvil integrates the [Polyfill Service] in order to provide JavaScript features that we use to browsers that do not yet support them. Our integration is different to the existing FT.com toolset.

We no longer load the Polyfill Service JS bundle via the FT.com CDN and instead load it directly from polyfill.io.

Previously we loaded polyfills from our own domain by configuring an extra path which proxies requests to the Polyfill Service from our own CDN. This was done because the performance improvement made by avoiding an extra DNS lookup was worth the added complexity of maintaining extra CDN configuration.

We have decided to revert this decision with the intention of eventually removing the extra CDN configuration. The performance benefit of avoiding an extra DNS lookup is very small, and when using HTTP2 and resource hints, negligible. In addition this CDN configuration code is considered a risk as it is managed separately to the main FT.com CDN service.

## Decision owners

- Matt Hinchliffe
- Samuel Parkinson
- Jake Champion

[Polyfill Service]: https://polyfill.io/v3/url-builder/
