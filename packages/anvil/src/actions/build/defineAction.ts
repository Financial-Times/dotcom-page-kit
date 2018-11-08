import path from 'path'
import { CliContext } from '@financial-times/anvil-plugin-helpers'
import { buildWebpack } from '../../helpers/buildWebpack'

export default {
  execute,
  prepareContext
}

export async function execute(c: CliContext): Promise<void> {
  const context = { namespace: 'Build' }
  await c.with(context, async () => {
    await c.do(buildWebpack)
  })
}

export function prepareContext({ paths, flags }: CliContext): void {
  if (!path.isAbsolute(flags.srcFile)) {
    flags.srcFile = path.join(paths.workingDir, flags.srcFile)
  }
  if (!path.isAbsolute(flags.outDir)) {
    flags.outDir = path.join(paths.workingDir, flags.outDir)
  }
}
