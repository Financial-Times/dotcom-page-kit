import { withEnv } from '..'
import { setTimeout } from 'timers'

describe('withEnv(...)', () => {
  describe('when called with one argument', () => {
    it('works as expected', () => {
      const env = {
        FOO: 'foo',
        BAR: 'bar'
      }
      const originalEnv = process.env
      withEnv({
        env,
        execute: () => {
          expect(process.env).toBe(env)
        }
      })
      expect(process.env).toBe(originalEnv)
    })

    it('supports async execution', async () => {
      let runnerWasCalled = false
      const env = {
        FOO: 'foo',
        BAR: 'bar'
      }
      const originalEnv = process.env
      await withEnv({
        env,
        execute: async () => {
          await waitFor(1000)
          expect(process.env).toBe(env)
          runnerWasCalled = true
        }
      })
      expect(process.env).toBe(originalEnv)
      expect(runnerWasCalled).toBe(true)
    })
  })

  describe('when called with two arguments', () => {
    it('works as expected', () => {
      const env = {
        FOO: 'foo',
        BAR: 'bar'
      }
      const originalEnv = process.env
      withEnv(env, () => {
        expect(process.env).toBe(env)
      })
      expect(process.env).toBe(originalEnv)
    })

    it('supports async execution', async () => {
      let runnerWasCalled = false
      const env = {
        FOO: 'foo',
        BAR: 'bar'
      }
      const originalEnv = process.env
      await withEnv(env, async () => {
        await waitFor(1000)
        expect(process.env).toBe(env)
        runnerWasCalled = true
      })
      expect(process.env).toBe(originalEnv)
      expect(runnerWasCalled).toBe(true)
    })
  })
})

function waitFor(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}
