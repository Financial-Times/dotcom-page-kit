const path = require('path')
const glob = require('glob')
const fetch = require('node-fetch')
const { writeJsonSync } = require('fs-extra')

class UpdateDep {
  constructor({ workingDir = process.cwd(), dependencyName }) {
    this.workingDir = workingDir
    this.dependencyName = dependencyName
  }

  async execute() {
    const packages = this.getPackageList()
    const version = await this.fetchLatestVersion()

    for (let packagePath of packages) {
      const pkg = require(packagePath)
      const hasProdDep = this.packageHasDependency(pkg)
      const hasDevDep = this.packageHasDependency(pkg, 'dev')
      const hasPeerDep = this.packageHasDependency(pkg, 'peer')

      if (hasProdDep) {
        this.updatePackageDependency(version, pkg)
      }

      if (hasDevDep) {
        this.updatePackageDependency(version, pkg, 'dev')
      }

      if (hasPeerDep) {
        this.updatePackageDependency(version, pkg, 'peer')
      }

      if (hasProdDep || hasDevDep || hasPeerDep) {
        writeJsonSync(packagePath, pkg)
      }
    }
  }

  getPackageList() {
    const cwd = this.workingDir
    const rootPkg = this.getRootPackageDotJson()
    const pathCollections = rootPkg.workspaces.map((workspaceGlob) => {
      const pathToMatch = path.join(workspaceGlob, '/')
      return glob.sync(pathToMatch, { cwd }).map((p) => path.join(this.workingDir, p, 'package.json'))
    })
    return [].concat(...pathCollections)
  }

  getRootPackageDotJson() {
    return require(path.join(this.workingDir, 'package.json'))
  }

  packageHasDependency(pkg, type = 'prod') {
    const depsProp = this.getDepsPropByType(type)
    return pkg[depsProp] && pkg[depsProp][this.dependencyName]
  }

  updatePackageDependency(version, pkg, type = 'prod') {
    const depsProp = this.getDepsPropByType(type)
    return (pkg[depsProp][this.dependencyName] = `^${version}`)
  }

  async fetchLatestVersion() {
    return fetch(`https://registry.npmjs.org/${this.dependencyName}`)
      .then((response) => response.json())
      .then((result) => result['dist-tags'].latest)
  }

  getDepsPropByType(type) {
    switch (type) {
      case 'prod':
        return 'dependencies'
      case 'dev':
        return 'devDependencies'
      case 'peer':
        return 'peerDependencies'
    }
  }
}

module.exports = UpdateDep
