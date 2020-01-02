/**
 This script ensures packages are published to npm with the appropriate distribution tag.
 By default all publishes to npm are tagged as "latest" which means dependents will be
 notified of updates even if they are pre-release or maintenance releases.
 <https://docs.npmjs.com/cli/dist-tag>

 Usage: node get-npm-dist-tag.js "tag"
 */

const semver = require('semver')
const fetch = require('node-fetch')

// Name of the package to fetch the latest version for
const TARGET_PACKAGE = '@financial-times/dotcom-ui-shell'

async function getRegistryData() {
  const response = await fetch(`https://registry.npmjs.com/${TARGET_PACKAGE}`)

  if (response.ok) {
    return response.json()
  } else {
    throw Error(`The npm registry responded with a ${response.status}`)
  }
}

function getHighestVersion(registryData) {
  const allVersions = Object.keys(registryData.versions)
  const stableVersions = allVersions.filter((v) => !semver.prerelease(v))

  return semver.sort(stableVersions).pop()
}

function getDistTag(newVersion, highestVersion) {
  if (semver.prerelease(newVersion)) {
    return 'pre-release'
  }

  const result = semver.compare(newVersion, highestVersion)

  if (result === -1) {
    return 'maintenance'
  }

  if (result === 1) {
    return 'latest'
  }

  throw Error(`No appropriate distribution tag for "${newVersion}" could be found`)
}

async function run(tag) {
  try {
    const newVersion = semver.clean(tag)

    if (newVersion) {
      const registryData = await getRegistryData()

      if (registryData.versions[newVersion]) {
        throw Error(`The version "${newVersion}" already exists on npm`)
      }

      const highestVersion = getHighestVersion(registryData)
      const distTag = getDistTag(newVersion, highestVersion)

      console.log(distTag) // eslint-disable-line no-console
    } else {
      throw Error(`The tag "${tag}" could not be coerced into a valid version number`)
    }
  } catch (error) {
    console.error(error.toString()) // eslint-disable-line no-console
    process.exit(1)
  }
}

run(process.argv[process.argv.length - 1] || '')
