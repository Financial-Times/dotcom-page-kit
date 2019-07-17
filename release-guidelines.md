# Release Guidelines

All of our packages are versioned using [Semantic Versioning]. The following guide will outline how to tag and release a new version of all packages, it assumes that all the code you wish to release is now on the `master` branch.


## When to release

Important bug fixes should be released as soon as possible. New features and minor code changes should be grouped into minor releases to avoid creating unnecessary noise and work for the team. Do not be afraid of releasing new major versions but please carefully consider if the change may implemented in another way. If a breaking change will require effort to migrate consuming applications it may be easier to create a new package instead to avoid any apps being left behind on an old version.

_Please note_ for apps using [Renovate] we have configured Page Kit dependencies to be pinned to a specific version and open a single pull request when new versions of packages are available.

[Renovate]: https://renovatebot.com/


## How to release

  1. **Review the commits since the last release**. You can find the last release in the git log, or by using the compare feature on GitHub. Make sure you've pulled all of the latest changes.

  2. **Decide on a version**. Work out whether this release is major, minor, or patch level. Major releases are generally planned out; if a breaking change has snuck into `master` without prior-planning it may be worth removing it or attempting to make it backwards-compatible.

  3. **Write the changelog**. This project has a `changelog.md` file in the root. You should create a new section at the top with the new version number then outline all of the changes as a list. Follow the style of the rest of the document.

  4. **Commit your changes**. Commit the changes to the changelog. This is the _only_ time a maintainer may commit directly to the `master` branch.

  5. **Add a release**. Create a release using the GitHub UI (note there should be a "v" preceding the version number). This will automatically kick off a new build and publish each package.

  6. **Celebrate**. :tada::beer::cake::cocktail:

[semantic versioning]: http://semver.org/
