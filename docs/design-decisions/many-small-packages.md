# Design Decisions: Many Small Packages

At the time of writing the Page Kit codebase contains ~26 individual packages. This is a major change from the existing FT.com toolset which can be considered a single installable package.

There are generally accepted benefits gained by choosing this architecture and a number of trade-offs. We have decided that most of the trade-offs are short-term, will be absorbed by the Page Kit team, and should not adversely affect the end-users of Page Kit.

When we started the project we considered the problems people were having with the old system, some of which were:

- Not much documentation and few tests so you cannot work on the system with confidence.
- It's highly prescriptive so you must use the tools in their entirety and follow their conventions or else it will not work.
- Developers could not extend the system and were forced to integrate project-specific features directly into it which lead to an increasing number of "dead" features hanging around.
- Implementation details are tightly coupled throughout which leads to changes being more difficult and expensive to make.
- There is a lot of non-deterministic functionality whereby unconnected parts of the codebase expect other parts to be "in the right place at the right time" which makes the system harder to rationalise and increases the chance of introducing bugs.

We decided that each of these problems could be mitigated by splitting functionality into individual packages. By dividing the system into separate pieces we hope to:

- Provide granular documentation and testing.
- Enable more flexibility by creating functionally separate and interchangeable parts.
- Ensure generically useful functionality is reusable and separated from domain-specific abstractions.
- Prevent implementation details and "deviant behaviour" leaking out by building interfaces between the different parts.
- Increase the visibility of important but easily buried functionality by "hoisting" it up to the top-level.
- Improve the sustainability of the codebase by making it easier to deprecate and replace pieces of functionality.
- Bugs with a smaller "blast radius".

To help with this we have been guided by the [SOLID principles] and this rule-of-thumb:

> A package should be able to have its functionality summarised in one or two sentences. If it is hard to describe a package within this limitation consider breaking it apart.

[SOLID principles]: https://khalilstemmler.com/articles/solid-principles/solid-typescript/

## Decision owners

- Matt Hinchliffe
- Maggie Allen
