import isProduction from '../isProduction'
import { withEnv } from '@financial-times/anvil-test-utils'

describe('isProduction(environment)', () => {
  describe('when the `environment` arg has been specified', () => {
    it('returns true is `environment` is `production`', () => {
      const result = isProduction('production')
      expect(result).toBe(true)
    })

    it('returns false is `environment` is not `production`', () => {
      const result = isProduction('foo')
      expect(result).toBe(false)
    })

    it('treats the `environment` arg as case insensitive', () => {
      const result = isProduction('proDucTion')
      expect(result).toBe(true)
    })
  })

  describe('when the environment arg has not been specified', () => {
    const productionEnv = { NODE_ENV: 'production' }
    const proDucTionEnv = { NODE_ENV: 'proDucTion' }
    const developmentEnv = { NODE_ENV: 'development' }

    it('uses `process.env.NODE_ENV` to determine the environment', () => {
      withEnv(productionEnv, () => {
        const result = isProduction()
        expect(result).toBe(true)
      })

      withEnv(developmentEnv, () => {
        const result = isProduction()
        expect(result).toBe(false)
      })
    })

    it('treats `process.env.NODE_ENV` as case insensitive', () => {
      withEnv(proDucTionEnv, () => {
        const result = isProduction()
        expect(result).toBe(true)
      })
    })
  })
})
