# Page Kit Architecture

🏗 _Please note that this document is a WIP_ 🏗

Before starting development on Page Kit we dissected the previous FT.com front-end platform to understand how its features and functions fitted together to power our websites. The list of items we needed to build was long and diverse and sprinkled with application specific logic. It was not obvious how it could or should all be assembled into a single piece of software.

When we studied how our applications used (and didn't use) the old platform it became clear that we could not create a single prescriptive solution able to meet the needs of all of them. Instead, Page Kit has been designed as a collection of tools which allow application specific pieces to be placed in-between.

Page Kit does not dictate to developers how to build a website, it has been designed to provide what is most useful and re-usable and then _get out of the way_.

> The secret to building large apps is never build large apps. Break your applications into small pieces. Then, assemble those testable, bite-sized pieces into your big application.
>
> — Justin Meyer


## Package design

### Ease of migration

The initial set of packages provided by Page Kit should cover all of the necessary parts required by apps switching from the existing front-end platform. The team have been careful to try and balance the burden of migration against pushing our technology stack forward and we have tended to favour choices which make migration simpler.

However, a small number of deprecated features being used in our apps today are now incompatible with modern web tools. Where this applies, removing the deprecated features will be a part of the app migration.

Our previous front-end platform ended up centralising many app-specific features. Because Page Kit packages are intended to cover only the majority use cases these have not been included and will need to be refactored back into apps as part of the migration.

### Sustainability and comprehension

All codebases will at some time be placed into maintenance mode without any developers actively working on them, including this one. Broadly, most decisions - such as [the decision to create many small packages](docs/design-decisions/many-small-packages.md) - have been made with the intention of reducing the cognitive load required to "get in and get out" of the codebase in future.

For example, by keeping packages small provides opportunities to design APIs and to write documentation and tests at a more easily consumable level.

We have applied this rule rigorously, we have created some really very small packages but we have done so to increase the visibility and accessibility of important information.

### Package scope and naming

The `packages/` directory of the project is like a "table of contents" providing an overview of what's inside. Developers should be able to use this to orient themselves and help decide where new features or bug fixes need to go. Packages which are similar in scope have been grouped together by prefixing their names. Features which cross naming groups have been split into separate packages to avoid mixing concerns and ensure consistency.

### Avoiding feature creep

Each package readme begins with a one or two sentence summary defining what it is. When unable to achieve this brief summary we chose to split the package into separate pieces. These descriptions can be used when deciding whether or not new features should be added to a package.

### It's like a Lego kit

Sometimes it helps to think of Page Kit as being a bit like a Lego kit. Inside the box there are lots of pieces (some of which might appear quite specific) and there are instructions for how to build the model on the front. But, like a Lego kit there are also instructions for putting together alternative models using the same pieces, or you can ignore the instructions and mix in your own pieces to create something new.


## Example applications

There are several example applications in the `examples/` folder which serve two purposes:

1. To help developers learn about Page Kit's core concepts and demonstrate combining Page Kit with different tools.

2. Each example should include integration tests which verify Page Kit is working as expected. Maintaining a wide-range of examples with tests will help all contributors to feel confident that the changes they make are reliable.


## Releasing changes

All Page Kit packages have their version numbers pinned together and use a single release process. Releases are currently planned according to [the roadmap](roadmap.md) and changes should be recorded in [the changelog](changelog.md). When planning a new release please consult the [release guidelines](release-guidelines.md).


## Application integration diagrams

### Client-side asset assembly and delivery

https://docs.google.com/drawings/d/18ByjywGZmqqWXxHCekwbU-_3eq7ZA701nPRwEG0cX_4/edit?usp=sharing

👷‍♀️ _More coming soon_ 👷‍♂️
