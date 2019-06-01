export default function isProduction(environment: string = process.env.NODE_ENV) {
  if (environment) {
    return environment.toUpperCase() === 'PRODUCTION'
  }
  return false
}
