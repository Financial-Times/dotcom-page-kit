import { createRequire } from 'node:module'
import * as path from 'node:path'
import esbuild from 'esbuild'
import { pageKitBase, basePlugins } from '@financial-times/dotcom-build-base'
import { pageKitSass } from '@financial-times/dotcom-build-sass'
import { pageKitJS } from '@financial-times/dotcom-build-js'

await esbuild.build({
  entryPoints: {
    scripts: './client/main.js',
    styles: './client/main.scss',
    'page-kit-layout-styles': createRequire(import.meta.url).resolve(
      '@financial-times/dotcom-ui-layout/styles.scss'
    )
  },
  plugins: [
    ...basePlugins(true),
    pageKitBase,
    pageKitJS(),
    pageKitSass({
      includePaths: [path.resolve('../../node_modules')]
    })
  ]
})
