# @financial-times/dotcom-core-branding

Core branding encompases the shared elements which together generate the look and feel of an ft.com page according to Financial Times brand. These elements are intrinsic to our brand and required by every page.

The package contains both metadata, that should go into the page `<head>`, and some defaults that define the visual look and the feel of the page (background, color, typography).
The package is designed to be used as part of other packages (`dotcom-core-shell` and `dotcom-core-layout`), and can be used on its own if ever applicable.

## Getting started

This package is compatible with Node 8+ and is distributed on npm.

```sh
npm install --save @financial-times/dotcom-core-branding
```

## Favicon

This component stores favicon information and is designed to be used as a part of the `<head>`.

```jsx
import { Favicon } from '@financial-times/dotcom-core-branding/component'

class yourClass = () => {
    <Favicon />
}
```

## Title

This component provides page title and is designed to be used as a part of the `<head>`.

```jsx
import { Title } from '@financial-times/dotcom-core-branding/component'

class yourClass = () => {
    <Title pageTitle='your title' siteTitle='your title' />
}
```
where `siteTitle` prop is optional, and if not provided will be defaulted to 'Financial Times', and `pageTitle` is just optional.

## Description

This component provides page description and is designed to be used as a part of the `<head>`.

```jsx
import { Description } from '@financial-times/dotcom-core-branding/component'

class yourClass = () => {
    <Description description='your description' />
}
```
where description prop is optional, and if not provided will be defaulted to 'News, analysis and comment from the Financial Times, the worldʼs leading global business publication'.

## Social Media

This component provides social media meta for the `<head>`.

```jsx
import { SocialMedia } from '@financial-times/dotcom-core-branding/component'

class yourClass = () => {
    <SocialMedia facebookPage='page ID' twitterSite='twitter handle' />
}
```
where facebookPage and twitterSite props are optional, and will be defaulted to '8860325749' and '@FinancialTimes' accordingly.

## Font URLs

An array of font URLs that load the origami fonts into the application. 

## Default colors

Default colors for the the font and the background.

