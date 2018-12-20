import path from 'path'
import { CliContext } from '../context/CliContext'
import { buildWebpack } from '../operations/buildWebpack'

export default {
  execute: build,
  prepareContext
}

export async function build(context: CliContext) {
  await context.with({ namespace: 'Build' }, async () => {
    await context.do(buildWebpack)
  })
}

export function prepareContext({ flags, paths }: CliContext) {
  if (!path.isAbsolute(flags.entryFile)) {
    flags.entryFile = path.join(paths.workingDir, flags.entryFile)
  }
  if (!path.isAbsolute(flags.outputPath)) {
    flags.outputPath = path.join(paths.workingDir, flags.outputPath)
  }
}
