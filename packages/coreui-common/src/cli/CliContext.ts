import { Context } from 'adonai'
import { CliMessenger } from './CliMessenger'

interface AnyObject {
  [key: string]: any
}

interface ConstructorArgs {
  workingDir
}

export class CliContext extends Context {
  paths = {
    workingDir: '',
    packageDir: ''
  }

  args: AnyObject = {}

  flags: AnyObject = {}

  messenger = new CliMessenger()

  constructor(a: ConstructorArgs) {
    super()
    this.paths.workingDir = a.workingDir
  }

  amend(name: string, value) {
    const nameParts = name.split('::')
    const subject = nameParts[nameParts.length - 1]
    return this.runner.run(
      `amend::${name}`,
      { [subject]: value },
      { $return: subject, $pluginMayReturn: subject, $pluginResultIsMergeable: true }
    )
  }
}
