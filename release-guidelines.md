# Release Guidelines

All of our packages are versioned using [Semantic Versioning], you should familiarise yourself with this. The following guide will outline how to tag and release a new version of all packages, it assumes that all the code you wish to release is now on the `master` branch.

  1. **Review the commits since the last release**. You can find the last release in the git log, or by using the compare feature on GitHub. Make sure you've pulled all of the latest changes.

  2. **Decide on a version**. Work out whether this release is major, minor, or patch level. Major releases are generally planned out; if a breaking change has snuck into `master` without prior-planning it may be worth removing it or attempting to make it backwards-compatible.

  3. **Write the changelog**. This project has a `changelog.md` file in the root. You should create a new section at the top with the new version number then outline all of the changes as a list. Follow the style of the rest of the document.

  4. **Commit your changes**. Commit the changes to changelog. This is the _only_ time a maintainer may commit directly to the `master` branch.

  5. **Add a release**. Create a release using the GitHub UI (note there should be a "v" preceding the version number). This will automatically kick off a new build and publish each package.

  6. **Celebrate**. :tada::beer::cake::cocktail:

[semantic versioning]: http://semver.org/
