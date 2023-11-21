# Express With NextJS

This example demonstrates how to render an FT styled application using Express and NextJS.

To start the example app enter this directory and run `npm dev`, and go to `localhost:3000/app-path`.

## Client vs SSR

This application uses Next14 with [AppRouter](https://nextjs.org/docs/app). This should server render most of the site, but also run some code on the client side only. This includes an example of Origami's header component being ran in the browser, which enables the site's interactive menu & search features.
