# Release Guidelines

All of our packages are versioned using [Semantic Versioning]. The following guide will outline how to tag and release a new version of all packages, it assumes that all the code you wish to release is now on the `master` branch.


## When to release

Important bug fixes should be released as soon as possible. New features and code changes should be grouped into minor releases to avoid creating unnecessary noise and work for the customer products team. Do not be afraid of releasing new major versions for breaking changes but please carefully consider if the change may implemented in another way. If a breaking change will require effort to migrate consuming applications it may be easier to create a new package instead to avoid any apps being left behind on an old version.

_Please note_ for apps using [Renovate] we have configured Page Kit dependencies to be pinned to a specific version and open a single pull request when new versions of packages are available.

[Renovate]: https://renovatebot.com/


## How to release

### Patch versions

  1. Pull requests for bug fixes should be raised against the `master` branch. Label the PR with the "bug" label and tag Core UI team members to review it.

  2. Update the changelog. Create a new heading at the top of the file with the new version number then outline all of the changes as a list. Follow the style of the rest of the document with short descriptions preceded by the name of the package affected. You may use the GitHub editor and commit the change straight into your branch.

  3. Release the changes. Create a release using the GitHub UI (note there should be a "v" preceding the version number). This will automatically kick off a new build and publish each package.

  4. If necessary, port the changes to any old `release-vX.X.X` branches which are still supported. To do this use the `git cherry-pick` command to apply relevant commits from the `master` branch to the appropriate `release-vX.X.X` branch.

  5. **Celebrate**. :tada::beer::cake::cocktail:

### Major and minor versions

  1. Raise a pull request for the current `development` branch against the `master` branch if there is not one already.

  2. Review the commits and work out whether this should be a major or minor version. Check with the team if you are not sure. Major releases are generally planned out; if a breaking change has snuck in without prior-planning it may be worth removing it or attempting to make it backwards-compatible.

  2. Update the changelog. Create a new heading at the top of the file with the new version number then outline all of the changes as a list. Follow the style of the rest of the document with the package name followed by a short description. You may use the GitHub editor and commit the change straight into the `development` branch.

  4. Release the changes. Create a release using the GitHub UI (note there should be a "v" preceding the version number) and include the list of changes in the release notes. This will automatically kick off a new build and publish each package.

  5. **Celebrate**. :tada::beer::cake::cocktail:

[semantic versioning]: http://semver.org/
