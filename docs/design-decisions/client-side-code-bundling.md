# Design Decisions: Client-side code bundling

Page Kit uses [Webpack] to orchestrate the compilation and optimisation of client-side JavaScript and styles. This is consistent with the previous FT.com toolset.

Webpack is very powerful but often requires in-depth knowledge to create and maintain configurations which leverage it effectively.

For this reason we considered alternative tools which aim to provide compilation and optimisation for client-side code but with far less setup and maintenance, including:

- https://parceljs.org/
- https://fuse-box.org/
- https://stealjs.com/

We also considered using tools which are focussed on JavaScript only:

- https://rollupjs.org/
- https://pax.js.org/

However, none of these tools could meet our complex requirements, such as resolving packages installed with Bower and bundling a mix of old and new code. Most importantly we need to provide a build step which ensures each of our microservices create consistent, long-term cacheable, and highly reusable assets. As of January 2020 _only_ Webpack is able to do this.

For more information see the [code splitting strategy] documentation.


## Decision owners

- Matt Hinchliffe


[Webpack]: https://webpack.js.org/
[code splitting strategy]: ./code-splitting-strategy.md