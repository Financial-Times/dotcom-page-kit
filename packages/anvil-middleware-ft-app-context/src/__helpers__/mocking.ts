import { AnyObject } from '@financial-times/anvil-types-generic'

export function withEnv(env: AnyObject, callback: Function) {
  const originalEnv = process.env
  process.env = env
  callback()
  process.env = originalEnv
}
