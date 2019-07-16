# Page Kit Architecture

Before starting development on Page Kit we dissected the previous FT.com front-end platform to understand how its features and functions fitted together to power our websites. The list of items we needed to build was long and diverse and sprinkled with application specific logic. It was not obvious how it could or should all be assembled into a single piece of software.

When we studied how our applications used (and didn't use) the old platform it became clear that we could not create a single prescriptive solution able to meet the needs of all of them. Instead, Page Kit has been designed as a collection of tools which allow application specific pieces to be placed in-between.

Page Kit does not dictate to developers how to build a website, it has been designed to provide what is most useful and re-usable and then _get out of the way_.

> The secret to building large apps is never build large apps. Break your applications into small pieces. Then, assemble those testable, bite-sized pieces into your big application.
>
> — Justin Meyer


## Package design

### Ease of migration

The initial packages provided by Page Kit only provide the necessary parts for apps switching from the existing front-end platform. The team have been careful to try and balance the burden of migration against pushing our technology stack forward and we have tended to favour choices which make migration simpler. However, Page Kit has been built using the latest software and there are a small number of features which are incompatible with our applications that we can no longer avoid updating.

### Sustainability and comprehension

All codebases will at some time be placed into maintenance mode without any developers actively working on them, including this one. Broadly, most decisions - such as [the decision to create many small packages](docs/design-decisions/many-small-packages.md) - have been made with the intention of reducing the cognitive load required to "get in and get out" of the codebase in future.

Keeping packages focused provides opportunities to design APIs and to write documentation and tests at a more easily consumable level.

Some packages are really very small but have been abstracted in order to increase the visibility and accessibility of important information.

We have made the assumption that it will be easier to build new packages with a wide feature set from several smaller packages than it is to split up a large package.

### Package scope and naming

The `packages/` directory of the project is like a "table of contents" providing an overview of what's inside. Developers should be able to use this to orient themselves and help decide where new features or bug fixes need to go. Because this list is quite long packages which are similar in scope have been grouped together by prefixing their names. Features which cross naming groups have been split into separate packages to avoid mixing concerns.

### Avoiding feature creep

Each package readme begins with a one or two sentence summary defining what it is. When unable to achieve this brief summary we chose to split the package into separate pieces. These descriptions are to be used when deciding whether or not new features should be added to a package which should help to avoid scope creep.

### It's like a Lego™️ kit

Sometimes it helps to think of Page Kit as being a bit like a Lego kit. Inside the box there are lots of pieces (some of which might appear quite specific) and there are instructions for how to build the model on the front. But, like a Lego kit there are also instructions for putting together alternative models using the same pieces, or you can ignore the instructions and mix in your own pieces to create something new.


## Example applications

There are several example applications in the `examples/` folder which serve two purposes:

1. To help developers learn about Page Kit's core concepts and demonstrate combining Page Kit with different tools.

2. Each example should include integration tests which verify Page Kit is working as expected. Maintaining a wide-range of examples with tests will help all contributors to feel confident that the changes they make are reliable.


## Releasing changes

All Page Kit packages have their version numbers pinned together and use a single release process. Releases are currently planned according to [the roadmap](roadmap.md) and changes should be recorded in [the changelog](changelog.md). Before making a new release please consult the [release guidelines](release-guidelines.md).

Important bug fixes should be released as soon as possible. New features and minor code changes should be grouped into minor releases to avoid creating unnecessary noise and work for the team. Do not be afraid of releasing new major versions but please carefully consider if the change may implemented in another way. If a breaking change will require effort to migrate consuming applications it may be easier to create a new package instead to avoid any apps being left behind on an old version.

[Renovate] has been configured to pin all Page Kit dependencies to a specific version and open a single pull request when new versions of Page Kit are available.

[Renovate]: https://renovatebot.com/


## Application integration

### Client-side assets

https://docs.google.com/drawings/d/18ByjywGZmqqWXxHCekwbU-_3eq7ZA701nPRwEG0cX_4/edit?usp=sharing
