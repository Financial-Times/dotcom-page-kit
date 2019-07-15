# Page Kit Architecture

Before starting development on Page Kit we dissected the previous FT.com front-end platform to understand how its features and functions fitted together to power our websites. The list of items we needed to build was long and diverse and sprinkled with application specific logic. It was not obvious how it should all be assembled into a single piece of software.

When moved on to see how our applications used (and didn't use) the old platform it became clear that we could not aim to create a single prescriptive solution which could meet the needs of all of them. Instead, Page Kit has been designed as a collection of tools which aim to offer flexibility allow application specific pieces placed in-between.

Page Kit does not dictate to developers how to build a website, it has been designed to provide what is most useful and re-usable and then _get out of the way!_

> The secret to building large apps is never build large apps. Break your applications into small pieces. Then, assemble those testable, bite-sized pieces into your big application.
> - Justin Meyer

## Package design

### Ease of migration

All of the initial packages provided by Page Kit have been designed to provide only the necessary parts for apps switching from the existing front-end platform. The team have been careful to try and balance the burden of migration against pushing our technology forward and in most cases we have made choices which favour ease of migration. However, Page Kit has been built using the latest software and there are a small number of features which are incompatible with our applications and we cannot avoid having to fix.

### Sustainability and comprehension

All codebases will at some time be placed into maintenance mode without any developers actively working on them, including this one. Broadly, most decisions - such as [the decision to create many small packages](docs/design-decisions/many-small-packages.md) - have been made with the intention of reducing the cognitive load required to "get in and get out" of the codebase in future and to avoid becoming an inflexible platform which dictates how applications should be built.

Some packages are really small but have been separated to increase the visibility of information which should be easily accessible.

We hope that it will be easier to create packages which cover a wide feature set from from other small packages than it is to split up one large package when it becomes too big.

### Package scope and naming

The `packages/` directory of the project should be a "table of contents" providing an overview of what's inside. Developers should be able to use this to orient themselves and decide where new features or bugfixes should go. Because this list is quite long packages which are similar in scope have been grouped together by prefixing their names. Features which cross naming groups have been split into separate packages to avoid mixing concerns.

### Avoiding feature creep

Each package readme begins with a one or two sentence summary defining what it is. When unable to achieve this brief summary we chose to split the package into separate pieces. These descriptions are intended to be used when deciding whether or not new features are should be added to a package which should help to avoid scope creep.

Keeping packages focused provides opportunities to carefully design APIs and to write documentation and tests at a more easily consumable level.

### It's like a Lego™️ kit

Sometimes it helps to think of Page Kit as being a bit like a Lego™️ kit. Inside the box there are lots of pieces (some of which might be quite specific) and there are instructions for how to build the model on the front. But, like a Lego kit there are also instructions for putting together alternative models using the same pieces, or you can ignore the instructions and mix in your own pieces to create something new.


## Releasing

All Page Kit packages have their version numbers pinned together and use a single release process. Releases are currently planned according to [the roadmap](roadmap.md) and changes should be recorded in [the changelog](changelog.md).

Important bug fixes should be released as soon as possible. New features and minor code changes should be grouped into minor releases to avoid creating unnecessary noise and work for the team. Do not be afraid of releasing new major versions but please carefully consider if the change may implemented in another way. If a breaking change will require effort to migrate consuming applications it may be easier to create a new package instead to avoid apps being left behind on an unsupported Page Kit version.

[Renovate] has been configured to pin all Page Kit dependencies to a specific version and open a single pull request when they are updated.

Before making a new release please consult the [release guidelines](release-guidelines.md).

[Renovate]: https://renovatebot.com/
