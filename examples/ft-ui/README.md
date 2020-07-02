# FT UI

This example demonstrates all the FT.com layout which includes the header, navigation, and footer components. It uses [Sucrase] to provide support for JSX syntax and ESM.

It also shows how to use the utils exposed by privacy-footer-localiser on the client-side.

[Sucrase]: https://github.com/alangpierce/sucrase

## Comments on `privacy-footer-localiser`

Any of the two methods imported from `dotcom-privacy-footer-localiser` could well be called from `dotcom-ui-footer` if they needed to be applied to footer of all pages.
Currently, these methods will only change the defaut footer if the user is found to be in California by the `compliance-region` service.
The `compliance-region` service doesn't support CORS and it saves the user compliance-region in sessionStorage. Therefore, in order to get this example to make client-side changes to the footer, the following needs to happen:

  - The example is rendered from `local.ft.com` with a clean sessionStorage 
  - The user is located in California or uses a VPN to pretend to be there

Alternatively a record can be saved in sessionStorage with:

```
key: user-compliance
value: {"region":"US-CA","legislation":"ccpa,gdpr"}
```
