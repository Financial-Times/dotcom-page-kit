# Design Decisions: CSS loading


## CSS code splitting

A code splitting strategy aims to re-use as much code as possible between client requests, minimising the amount of new code that a user needs to download as they browse FT.com.

CSS files are sent to the browser after any transpilation and minification steps have been completed. If a browser already has a specific CSS file then it will serve the file from its cache rather than requesting it again. This is the most performant way to serve files to the browser and therefore something we want to optimize.


## Creating shareable CSS files via Page Kit

The CSS for some prevalent components (e.g. header, footer) is provided by Page Kit. Because the CSS is common across apps, the hash (generated based exclusively on file content) that forms part of the filename will likewise be consistent, allowing the identically-named file in the browser cache to be re-used when navigating between the apps that form FT.com.


## Blocking and non-blocking styles

Downloading and parsing CSS files will halt page rendering, which is well described by this article: [Google Developers - Web Fundamentals: Render Blocking CSS by Ilya Grigorik]. Therefore it pays to be strategic about prioritising when in the page render process various stylesheets are downloaded.

Some styles can be considered as 'blocking': we want them downloaded before we begin to parse the DOM so that they will be readily present when elements they are responsible for styling are rendered. 'Blocking' styles should style elements that are immediately viewable upon visiting the page, e.g. those contained in the browser viewport, such as the header.

Some styles can be considered as 'non-blocking': there is less urgency when they are downloaded as they style elements that will not be immediately viewable upon visiting the page, e.g. those that require user interaction to appear (e.g. drop-down menu) or are below what is initially contained in the browser viewport (e.g. footer).

[Google Developers - Web Fundamentals: Render Blocking CSS by Ilya Grigorik]: https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-blocking-css


## Methods of delaying the download of non-blocking stylesheets

There are methods to download non-blocking stylesheets asynchronously without delaying page rendering, detailed in this article: [Filament Group: The Simplest Way to Load CSS Asynchronously by Scott Jehl].

We have opted for the hacky but succinct method of setting the stylesheet `link`'s `media` attribute to `print` (which will load the stylesheet asynchronously without delaying page rendering), and then using the `onload` attribute to switch the `media` attribute to `all` that stylesheet has loaded.

[Filament Group: The Simplest Way to Load CSS Asynchronously by Scott Jehl]: https://www.filamentgroup.com/lab/load-css-simpler


## Decision owners

- [Adam Braimbridge]
- [Matt Hinchliffe]

[Adam Braimbridge]: https://github.com/adambraimbridge
[Matt Hinchliffe]: https://github.com/i-like-robots
