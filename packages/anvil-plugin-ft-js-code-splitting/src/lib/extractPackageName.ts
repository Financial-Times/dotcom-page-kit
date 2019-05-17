import path from 'path'

const PackageFolders = /(node_modules|bower_components)/

function findPackageName(filePath, type) {
  const segments = filePath.split(path.sep)
  const index = segments.lastIndexOf(type)

  const name = segments[index + 1]

  if (name[0] === '@') {
    const scopedName = segments[index + 2]
    return `${name}/${scopedName}`
  } else {
    return name
  }
}

export default function extractPackageName(filePath: string): string | void {
  const type = filePath.match(PackageFolders)

  if (type) {
    return findPackageName(filePath, type[type.length - 1])
  }
}
