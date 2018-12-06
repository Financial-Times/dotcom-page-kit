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
  if (!path.isAbsolute(flags.srcFile)) {
    flags.srcFile = path.join(paths.workingDir, flags.srcFile)
  }
  if (!path.isAbsolute(flags.outDir)) {
    flags.outDir = path.join(paths.workingDir, flags.outDir)
  }
}
