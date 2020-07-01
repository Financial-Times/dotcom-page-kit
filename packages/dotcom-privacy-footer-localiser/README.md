# @financial-times/dotcom-privacy-footer-localiser

This package is meant to modify the default footer of dotcom pages based on the requirements of any local legislation that might apply to a user.


## Getting started

This package is compatible with Node 12+ and is distributed on npm.

```bash
npm install --save @financial-times/dotcom-privacy-footer-localiser
```

### Server-side

This module doesn't export any server-side functionality.


### Client-side

This package exports two methods to manipulate the footer 

- `addDNSLinkToFooter`: adds a "Do Not Sell My Info" Link above the "Privacy" if the CCPA legislation applies to the user.
- `adaptPrivacyLinkToLegislation`: replaces the text of the "Privacy" link with one that matches the requirements of the legislation that applies to the user.

Neither of those two methods accept any parameters.

#### Examples

```js
import { addDNSLinkToFooter } from '../main'

// ... JS operations with higher priority 
addDNSLinkToFooter()
```

```js
import { adaptPrivacyLinkToLegislation } from '../main'

// ... JS operations with higher priority 
adaptPrivacyLinkToLegislation()
```
