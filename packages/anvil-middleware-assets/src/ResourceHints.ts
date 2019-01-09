import getResourceType from './getResourceType'
import formatResourceHint from './formatResourceHint'

export default class ResourceHinting {
  private hints: Set<string> = new Set()

  add(url: string): void {
    this.hints.add(url)
  }

  toString(): string {
    const hints = []

    for (const filename of this.hints) {
      const type = getResourceType(filename)
      hints.push(formatResourceHint(filename, { as: type }))
    }

    return hints.join(', ')
  }
}
