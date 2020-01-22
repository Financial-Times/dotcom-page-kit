# FT App Context Schema

The schema defines the following properties:

## `abTestState` (string)

The A/B test flags data as a comma delimited string

Additional restrictions:

* Regex pattern: `^,*([0-9A-Za-z-_]+:[0-9A-Za-z-_]+,*)+$`

## `appName` (string)

The name of the application

Additional restrictions:

* Regex pattern: `^.+$`

## `appVersion` (string)

The running version of the app (usually a Git commit hash)

Additional restrictions:

* Regex pattern: `^.+$`

## `conceptId` (string)

The UUID of the concept on the current page

Additional restrictions:

* Regex pattern: `^[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}$`

## `conceptType` (string)

The type of concept on the current page

Additional restrictions:

* Regex pattern: `^http://www.ft.com/ontology/.+$`

## `contentId` (string)

The UUID of the content on the current page

Additional restrictions:

* Regex pattern: `^[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}$`

## `contentType` (string)

The type or sub-type of the content on the current page

Additional restrictions:

* Regex pattern: `^(article|video|audio|podcast|package|live-blog)$`

## `edition` (string)

The selected FT edition

Additional restrictions:

* Regex pattern: `^(uk|international)$`

## `isProduction` (boolean)

If the app is currently running in a production environment

Default: `false`

## `isUserLoggedIn` (boolean)

If the visitor is signed in to an FT account

Default: `false`

## `product` (string)

The product name

Default: `"next"`

Additional restrictions:

* Regex pattern: `^.+$`

## `publishReference` (string)

The publish reference of the content on the current page

Additional restrictions:

* Regex pattern: `tid_`
