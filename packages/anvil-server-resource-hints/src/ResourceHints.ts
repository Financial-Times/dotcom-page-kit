import getResourceType from './getResourceType'
import formatResourceHint from './formatResourceHint'

export default class ResourceHinting {
  public files: Set<string> = new Set()

  add(file: string): void {
    this.files.add(file)
  }

  toString(): string {
    const hints = []

    for (const filename of this.files) {
      const type = getResourceType(filename)
      hints.push(formatResourceHint(filename, { as: type }))
    }

    return hints.join(', ')
  }
}
