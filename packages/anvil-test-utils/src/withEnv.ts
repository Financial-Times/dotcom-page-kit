import { AnyObject } from '@financial-times/anvil-types-generic'

interface Args {
  env?: AnyObject
  execute?: Function
  [key: string]: any
}

export function withEnv(args: Args = {}, run?: Function) {
  const env = run ? args : args.env
  const callback = run || args.execute
  const originalEnv = process.env

  process.env = env
  const result = callback()

  if (isPromise(result)) {
    return result.then(() => {
      process.env = originalEnv
    })
  }
  process.env = originalEnv
}

function isPromise(value) {
  return value && typeof value === 'object' && value.then
}
