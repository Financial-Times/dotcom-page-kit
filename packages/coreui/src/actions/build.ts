import path from 'path'
import { CliContext } from 'coreui-common'
import { buildWebpack } from '../helpers/buildWebpack'

export default {
  execute: build,
  prepareContext
}

export async function build(c: CliContext) {
  const context = { namespace: 'Build' }
  await c.with(context, async () => {
    await c.do(buildWebpack)
  })
}

export function prepareContext(c: CliContext) {
  if (!path.isAbsolute(c.flags.srcFile)) {
    c.flags.srcFile = path.join(c.paths.workingDir, c.flags.srcFile)
  }
  if (!path.isAbsolute(c.flags.outDir)) {
    c.flags.outDir = path.join(c.paths.workingDir, c.flags.outDir)
  }
}
