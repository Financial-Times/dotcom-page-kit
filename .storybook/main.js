module.exports = {
  stories: [
    '../packages/dotcom-ui-header/src/**/story.tsx',
    '../packages/dotcom-ui-footer/src/**/story.tsx',
    '../packages/dotcom-ui-layout/src/**/story.tsx'
  ],
  framework: '@storybook/react',
  addons: ['@storybook/addon-essentials'],
  core: {
    builder: '@storybook/builder-webpack4'
  }
}
