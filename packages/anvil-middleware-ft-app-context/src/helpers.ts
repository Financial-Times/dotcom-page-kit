import path from 'path'
import { Request, Response } from 'express'

interface RequestArgs {
  request: Request
}

interface ResponseArgs {
  response: Response
}

interface WorkingDirArgs {
  workingDir: string
}

interface EnvArgs {
  env: string
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

export function getAppVersion({ workingDir }: WorkingDirArgs) {
  return getAboutInfo({ workingDir }).appVersion
}

export function isProduction({ env }: EnvArgs) {
  return env.toUpperCase() === 'PRODUCTION'
}

export function getAboutDocPath({ workingDir }: WorkingDirArgs) {
  return path.join(workingDir, '/public/__about.json')
}

function getAboutInfo({ workingDir }: WorkingDirArgs) {
  try {
    return require(getAboutDocPath({ workingDir }))
  } catch (e) {}
  return {}
}
