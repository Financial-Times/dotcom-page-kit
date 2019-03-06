# Design Decisions: HTML Templating

Since the Next team started their rebuild of FT.com in 2014 we've used [Handlebars] to render HTML templates in the majority of our applications. With a tight [Express] integration it's made it easy for us to render our HTML pages on the server.

Handlebars has done a good job but it does now require the team to maintain a lot of extra code in order to use it effectively. Over time we have created a suite of helper functions, integrations for template provided by packages installed with Bower or npm, and template inheritance. This works OK on the server but it is complicated and adds _a lot_ of bloat when adapted for use in the browser:

![Analysis displaying the difference between Handlebars and JSX bundle size, 78kb vs 18kb](images/hbs-vs-jsx-size.png)

Last year a project was kicked off to explore how the app and website codebases could be brought into closer alignment. The goal was to build a set of UI components which could be shared between the two products in order to provide a consistent experience for our users and save time and money when shipping new features.

The [x-dash project] didn't choose Handlebars for templates but instead chose to define HTML using [JSX]. JSX is a syntax extension, or syntactic sugar, for JavaScript which enables markup to be written within JS. JSX was chosen because it was compatible with the app (which uses [Preact]) and required minimal additional tooling for integration with the website. In addition support for JSX is baked into many tools; almost every JavaScript parser, linter, compiler, and editor support JSX syntax out of the box.

When the Anvil team [reached out] to the customer products engineering team at the start of the project and asked "Which tool would you choose to provide server-side rendering for your app?" only 18% of the respondents indicated that they would choose Handlebars with most of the rest stating that they would choose the same library as they chose for client-side. When asked "Which tools would you choose to help build the client-side parts for your app?" 67% of respondants indicated that they would choose React or a similar library.

Because React is the library which first introduced JSX and all derivative libraries (including Preact, [Inferno], etc.) also use JSX it is reasonable to assume that JSX is the majority of team's preferred choice for authoring markup in a JavaScript application.

[Handlebars]: https://handlebarsjs.com/
[Express]: https://expressjs.com/
[view engine]: https://expressjs.com/en/guide/using-template-engines.html
[x-dash project]: https://financial-times.github.io/x-dash/
[JSX]: https://jasonformat.com/wtf-is-jsx/
[Preact]: https://preactjs.com/
[reached out]: https://docs.google.com/document/d/1CxmHvsAfNmar-1kuQEQSawL6jcjc1OrY4mXtvhsq9K4/edit?usp=sharing
[React]: https://reactjs.org/
[Inferno]: https://infernojs.org/


## Conclusion

The Anvil team chose to use JSX for definding HTML because it integrates with the existing website code base, is supported by many tools out of the box, is lightweight, works well on the client-side, can be used with a variety of different libraries, enables access to a wide ecosystem of tools, and is what the _majority of the customer products engineering team want to use_.


## Example Code

Below I've written a function which defines some markup using JSX. It includes a `<div>` element with a heading and some text:

```jsx
function Introduction() {
  return (
    <div class="intro">
      <h1>What is JSX?</h1>
      <p>JSX is a syntax extension to JavaScript.</p>
    </div>
  )
}
```

The XML-like syntax in code shown above can also be written as, or transformed into, this regular JavaScript:

```js
function Introduction() {
  return (
    createElement('div', { class: 'intro' },
      createElement('h1', {}, 'What is JSX?'),
      createElement('p', {}, 'JSX is a syntax extension to JavaScript.')
    )
  )
}
```
