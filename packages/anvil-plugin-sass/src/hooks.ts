export enum hooks {
  SCSS_RULE = 'webpackConfig::sassPlugin::rule',
  CSSNANO_OPTIONS = 'webpackConfig::sassPlugin::cssnanoOptions',
  CSS_LOADER_OPTIONS = 'webpackConfig::sassPlugin::cssLoaderOptions',
  SASS_LOADER_OPTIONS = 'webpackConfig::sassPlugin::sassLoaderOptions',
  AUTOPREFIXER_OPTIONS = 'webpackConfig::sassPlugin::autoprefixerOptions',
  POSTCSS_LOADER_OPTIONS = 'webpackConfig::sassPlugin::postcssLoaderOptions',
  STYLES_ONLY_PLUGIN_OPTIONS = 'webpackConfig::sassPlugin::stylesOnlyPluginOptions',
  MINI_CSS_EXTRACT_PLUGIN_OPTIONS = 'webpackConfig::sassPlugin::miniCssExtractPluginOptions'
}
