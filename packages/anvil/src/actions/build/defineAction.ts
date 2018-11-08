import path from 'path'
import { CliContext } from '@financial-times/anvil-plugin-helpers'
import { buildWebpack } from '../../helpers/buildWebpack'

export default {
  execute,
  prepareContext
}

export async function execute(context: CliContext): Promise<void> {
  const settings = { namespace: 'Build' }

  await context.with(settings, async () => {
    await context.do(buildWebpack)
  })
}

// This function (if present) will be called before the execute
// function should decorate or format the context for use
export function prepareContext(context: CliContext): void {
  if (!path.isAbsolute(context.flags.srcFile)) {
    context.flags.srcFile = path.join(context.paths.workingDir, context.flags.srcFile)
  }
  if (!path.isAbsolute(context.flags.outDir)) {
    context.flags.outDir = path.join(context.paths.workingDir, context.flags.outDir)
  }
}
