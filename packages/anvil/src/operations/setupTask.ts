import { Command } from 'commander'
import { name, as } from 'adonai'
import { CliContext } from '../entities/CliContext'
import { MultiArgOperation } from 'adonai-routine'

interface RunningArgs {
  task: MultiArgOperation
  command: Command
  taskArgs: any[]
}

export function setupTask(cli: CliContext, task: MultiArgOperation) {
  return (...taskArgs) => {
    return cli
      .routine({ taskArgs, task })
      .with(name('setupTask'))
      .then(getCommandFromTaskArgs, as('command'))
      .then(getOptionsFromCommand, as('cli.options'))
      .then(getArgsFromCommand, as('cli.args'))
      .then(executeTask)
      .exec()
  }
}

function getCommandFromTaskArgs({}, { taskArgs }: RunningArgs): Command {
  return taskArgs.pop()
}

function getOptionsFromCommand({}, { command }: RunningArgs) {
  return command.opts()
}

function getArgsFromCommand({}, { command, taskArgs }: RunningArgs) {
  const properties = command._args.map((arg) => arg.name)
  return taskArgs.reduce((map, option, i) => {
    map[properties[i]] = option
    return map
  }, {})
}

function executeTask(cli: CliContext, { task }: RunningArgs) {
  return cli.exec(task)
}
