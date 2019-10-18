import { HelperOptions } from 'handlebars'

export function capture(name: string, options: HelperOptions) {
  if (this.hasOwnProperty(name)) {
    throw Error(`Template data property "${name}" has already been declared.`)
  } else {
    this[name] = options.fn(this)
  }
}
