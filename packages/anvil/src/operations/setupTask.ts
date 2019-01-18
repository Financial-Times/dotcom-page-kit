import { Command } from 'commander'
import { name, as } from 'adonai'
import { CliOperation } from '../entities/CliOperation'
import { MultiArgOperation } from 'adonai-routine'

interface RunningArgs {
  task: MultiArgOperation
  command: Command
  taskArgs: any[]
}

export function setupTask(operation: CliOperation, task: MultiArgOperation) {
  return (...taskArgs) => {
    return operation
      .routine({ taskArgs, task })
      .with(name('@setupTask'))
      .then(getCommandFromTaskArgs, as('command'))
      .then(getOptionsFromCommand, as('operation.options'))
      .then(getArgsFromCommand, as('operation.args'))
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

function executeTask(operation: CliOperation, { task }: RunningArgs) {
  return operation.exec(task)
}
