# Release Guidelines

All of our packages are versioned using [Semantic Versioning]. The following guide will outline how to tag and release a new version of all packages, it assumes that all the code you wish to release is now on the `main` branch.


## When to release

Important bug fixes should be released as soon as possible. New features and code changes should be grouped into minor releases to avoid creating unnecessary noise and work for the customer products team. Do not be afraid of releasing new major versions for breaking changes but please carefully consider if the change may implemented in another way. If a breaking change will require effort to migrate consuming applications it may be easier to create a new package instead to avoid any apps being left behind on an old version.

_Please note_ for apps using [Renovate] we have configured Page Kit dependencies to be pinned to a specific version and open a single pull request when new versions of packages are available.

[Renovate]: https://renovatebot.com/


## How to release

### Patch versions

  1. Pull requests for bug fixes should be raised against the `main` branch. Label the PR with the "bug" label and tag the Platforms team to review it.

  2. Release the changes. Create a release using the GitHub UI (note there should be a "v" preceding the version number). This will automatically kick off a new build and publish each package.

  3. You may need to also port the changes to an older release branch. See [maintenance releases](#maintenance-versions) below for more information.

  4. **Celebrate**. :tada::beer::cake::cocktail:

### Major and minor versions

  1. Raise a pull request for the current `development` branch against the `main` branch if there is not one already.

  2. Review the commits and work out whether this should be a major or minor version. Check with the team if you are not sure. Major releases are generally planned out; if a breaking change has snuck in without prior-planning it may be worth removing it or attempting to make it backwards-compatible.

  3. Release the changes. Create a release using the GitHub UI (note there should be a "v" preceding the version number) and include the list of changes in the release notes. This will automatically kick off a new build and publish each package.

  4. **Celebrate**. :tada::beer::cake::cocktail:

### Maintenance versions

When we need to fix a production bug we will normally raise a PR against the `main` branch and make a patch release once it is merged.

Sometimes that fix will also be needed by apps which are still running an older version of Page Kit. Because we can't always immediately upgrade apps to use the latest version we'd have to make a new maintenance release for the older version as well.

For example, imagine that some production apps are running Page Kit `1.0.0` and others `2.0.0`. The same bug is present in both versions.

  1. After following the [patch versions](#patch-versions) guide a new `2.0.1` release is made.

  2. Find the last v1 release and copy its commit hash (`git show-ref --tags`.)

  3. Create a new branch from this commit (`git checkout -b release-v1.x <hash>`.)

  4. Cherry pick the relevant commits from the `main` branch onto the branch that has just been created (`git cherry-pick <hash>`.)

  5. Push the branch and create a new `1.0.1` release.

[semantic versioning]: http://semver.org/
