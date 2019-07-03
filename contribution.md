# Contribution

So you'd like to contribute some code, report a bug, or request a feature? You're in the right place! This guide covers the basics of starting to contribute to Page Kit.

  - [Reporting Bugs](#reporting-bugs)
  - [Requesting Features](#requesting-features)
  - [Opening a Pull Request](#opening-a-pull-request)
  - [Code Style](#code-style)
  - [Testing](#testing)
  - [Releasing/Versioning](#releasingversioning)


## Reporting bugs

We like it when people report bugs and would definitely rather _know_ about them than be left in the dark. We use GitHub issues for bug tracking. When filing a bug report, there are some guidelines you can follow which will help us quickly resolve your issue:

  - ### Check if the bug has already been reported
    You can do this by searching the repository. This gives us more time to focus on existing bugs, and it might help you find a solution more quickly.

  - ### Make sure your software is up to date
    It may be that your bug has already been fixed in a newer version.

  - ### Provide steps to reproduce
    Your bug will generally get fixed much more quickly if you provide clear steps to reproduce the problem. This should include the version numbers of any relevant software.

  - ### Write a failing test or example
    This is not _required_ to file a bug report, but we'll love you if you add one! Writing a failing [test](#testing) or example and opening a pull request will help us quickly locate the issue.

  - ### Open multiple bug reports
    If you have multiple different bugs, it's best to open each as a separate GitHub issue.


## Requesting features

When making a feature request, it's helpful for us if you follow these guidelines.

  - ### Check if the feature has already been requested
    You can do this by searching the repository. You may find that somebody has already asked for the feature you're thinking of! If this is the case then feel free to join in the comments.

  - ### Phrase as user needs
    If you phrase your feature request as a user need rather than a proposed solution, it opens up more potential for discussion and collaboration – _way_ more fun for everyone.

  - ### Does it have proven value?
    New features should consider the product vision and wider FT technology programme goals. Components and tools within Page Kit should have proven value and defined use-cases applicable to the majority of implementers.

  - ### Open multiple feature requests
    If you have multiple different requests, it's best to open each as a separate GitHub issue.

It's important to note that we can't accept _every_ feature request, we'll always discuss why if we're not going to accept them though.


## Opening a pull request

Please do! All of the code in Page Kit is peer-reviewed by members of the FT customer products team. Here are some things you can do to help this review go smoothly:

  - ### Discuss features first
    If you're thinking of opening a pull request that adds a feature, you'll save yourself some time and effort if you [discuss it in a feature request first](#requesting-features). The review is guaranteed to go more smoothly if we've chatted about it beforehand.

  - ### Check the workflow and release guidelines
    The project follows a scheduled release workflow so we encourage the separation of stable, development, and experimental code. See the [Git workflow](#git-workflow) and the [release guidelines](release-guidelines.md) for more information.

  - ### Update the documentation
    The user documentation should be kept up to date with any changes made. Use inline code comments as developer documentation, focusing more on _why_ your code does something than _what_ it's doing.

  - ### Avoid hacks or temporary workarounds
    The stability of Page Kit is vital for it to be successful and sustainable. As well as maintaining quality it is important to consider that applications can have very different lifespans; a "quick hack" may remain in production for several months longer than it is required. If you need a hack try to keep it in your app!

  - ### Reviewers are empowered to say no
    This is a collaborative project and sometimes your pull request may not work in the best interests of those in another team so they have been given the power to say "no". If your pull request is good but would require a major release then it may be held until a more suitable time.

  - ### Follow the code style
    We have a [code style](#code-style), and the pull request build will fail if this isn't followed. If the code style varies for a project already then it's best to follow the example set in that project. We're not mean, we just like consistency!

  - ### Reference other issues
    When fixing a bug, reference the original report; when adding a feature, link to the original feature request. It'll help us massively!


## Git workflow

This project follows a workflow designed around project releases. It is less strict than [Gitflow] but we encourage the separation of stable, development, and experimental branches in order to follow a scheduled release cycle.

- The `master` branch is for the current stable release. Bugfixes are merged into this branch.
- The `development` branch is for upcoming major or minor releases. This branch tracks `master` and new features are merged into it.
- Branches for new features should track and raise pull requests against the `development` branch or `master` branch if there are not any upcoming releases planned.

[Gitflow]: https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow


## Code style

The best way to ensure you stick to the Page Kit code style is to make your work consistent with the code around it. We also provide a [Prettier] configuration to automatically format files and run [ESLint] before any tests so don't let it get in the way of your flow – you can fix it afterwards!

[Prettier]: https://prettier.io/
[ESLint]: https://eslint.org/

### General style

  - 2 spaces for indentation
  - 100 characters per line
  - Avoid abbreviating names (`request` is better than `req`)

### JavaScript style

  - No semicolons
  - Use `'`, not `"`
  - Use ES2018 where available
  - Commas at the end of the line, not the start

### Markdown style

  - Add two empty lines above a `h2` (to break up sections)
  - Indent lists and quotes (by two spaces)
  - Use [reference-style] links as much as possible

[reference-style]: https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#links


## Testing

We use [Jest] for testing packages. We enforce code quality with [ESLint].

[Jest]: https://jestjs.io/
[ESLint]: https://eslint.org/
