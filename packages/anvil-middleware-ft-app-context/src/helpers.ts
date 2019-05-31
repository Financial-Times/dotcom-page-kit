import { Request, Response } from 'express'

interface RequestArgs {
  request: Request
}

interface ResponseArgs {
  response: Response
}

interface EnvironmentArgs {
  environment: string
}

export function getAppName({ response }: ResponseArgs) {
  return response.get('ft-app-name')
}

export function getAbState({ request }: RequestArgs) {
  return request.get('ft-ab')
}

export function getEdition({ request }: RequestArgs) {
  return request.get('ft-edition')
}

export function getAppVersion({}) {
  return process.env.SOURCE_VERSION
}

export function isProduction({ environment }: EnvironmentArgs) {
  return environment.toUpperCase() === 'PRODUCTION'
}
