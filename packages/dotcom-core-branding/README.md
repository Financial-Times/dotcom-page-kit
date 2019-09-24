# @financial-times/dotcom-core-branding

Core branding encompases the shared elements which together generate the look and feel of an ft.com page, they are both intrinsic to our brand and required by every page. Below is the list of the things included in the package with instructions on how to use them.

## Getting started
```
npm install
npm run build
```

## Favicon

This component stores favicon information that suppose to be part of the header.

```jsx
import { Favicon } from '@financial-times/dotcom-core-branding/component'

class yourClass = () => {
    <Favicon />
}
```

## Title

This component to be used for a page title.

```jsx
import { Title } from '@financial-times/dotcom-core-branding/component'

class yourClass = () => {
    <Title pageTitle='your title' siteTitle='your title' />
}
```
where siteTitle prop is optional.

## Description

This component to be used for a page description.

```jsx
import { Description } from '@financial-times/dotcom-core-branding/component'

class yourClass = () => {
    <Description description='your description' />
}
```
where description prop is optional.

## Social Media

This component to be used for a social media meta.

```jsx
import { SocialMedia } from '@financial-times/dotcom-core-branding/component'

class yourClass = () => {
    <SocialMedia facebookPage='page ID' twitterSite='twitter handle' />
}
```
where description prop is optional.
