const fs = require('fs')

const camelCase = require('camelcase')
const svgr = require('@svgr/core').default

const logoNames = ['brand-ft-masthead']

logoNames.forEach((logoName) => {
  const pathToSvg = require.resolve(`@financial-times/logo-images/src/${logoName}.svg`)

  const svgString = fs.readFileSync(pathToSvg).toString()

  const componentName = camelCase(logoName, { pascalCase: true })

  svgr(svgString, {}, { componentName }).then((jsCode) => {
    const comment =
      '// **THIS IS AN AUTO-GENERATED FILE (`npm run build:svg-to-react`) - DO NOT EDIT MANUALLY.**\n\n'

    const fileExtension = 'tsx'

    fs.writeFileSync(`src/components/svg-components/${componentName}.${fileExtension}`, comment + jsCode)
  })
})
