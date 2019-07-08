import { Command } from 'commander'
import { CliContext } from '../entities/CliContext'
import { TOptions } from '../types/CliConfig'

interface Task {
  (cli: CliContext): any
}

export function setupTask(cli: CliContext, invokeTask: Task) {
  return async (...taskArgs) => {
    const command = getCommandFromTaskArgs(taskArgs)

    cli.args = getArgsFromCommand(command, taskArgs)
    cli.options = getOptionsFromCommand(command) as TOptions

    await invokeTask(cli)
  }
}

function getCommandFromTaskArgs(taskArgs: any[]): Command {
  return taskArgs.pop()
}

function getOptionsFromCommand(command: Command) {
  return command.opts()
}

function getArgsFromCommand(command: Command, taskArgs: any[]) {
  const properties = command._args.map((arg) => arg.name)
  return taskArgs.reduce((map, option, i) => {
    map[properties[i]] = option
    return map
  }, {})
}
