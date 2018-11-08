import path from 'path'
import program, { Command } from 'commander'

const actions: string[] = ['build']

/**
 * Create program
 *
 * This dynamically loads all of the available actions for this CLI program
 */
export function createProgram(args: ProgramArgs): Command {
  actions.forEach((action) => {
    const { registerAction } = require(path.join('../actions', action, 'registerAction'))
    registerAction(program, args)
  })

  return program
}
