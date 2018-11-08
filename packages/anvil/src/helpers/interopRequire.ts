export default function(pluginPath: string) {
  const obj = require(pluginPath)
  return obj && obj.__esModule ? obj['default'] : obj
}
