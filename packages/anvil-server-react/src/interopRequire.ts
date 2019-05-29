export default function interopRequire(path: string): any {
  const obj = require(path)
  return obj && obj.__esModule ? obj['default'] : obj
}
