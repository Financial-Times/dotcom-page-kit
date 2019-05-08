export enum hooks {
  BABEL_CONFIG = 'babelConfig',
  BABEL_PRESET_ENV_OPTIONS = 'babelConfig::preset::env::options',
  CLEAN_WEBPACK_PLUGIN_OPTIONS = 'webpackConfig::plugins::cleanWebpackPlugin::options',
  JS_RULE = 'webpackConfig::jsRule',
  MANIFEST_PLUGIN_OPTIONS = 'webpackConfig::plugins::manifestPlugin::options',
  WEBPACK_CONFIG = 'webpackConfig'
}
