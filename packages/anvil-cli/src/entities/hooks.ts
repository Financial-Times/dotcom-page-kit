export enum hooks {
  BABEL_CONFIG = 'babelConfig',
  BABEL_PRESET_ENV_OPTIONS = 'babelConfig::preset::env::options',
  WEBPACK_CLEAN_PLUGIN_OPTIONS = 'webpackConfig::plugins::cleanWebpackPlugin::options',
  WEBPACK_JS_RULE = 'webpackConfig::jsRule',
  WEBPACK_MANIFEST_PLUGIN_OPTIONS = 'webpackConfig::plugins::manifestPlugin::options',
  WEBPACK_CONFIG = 'webpackConfig'
}
