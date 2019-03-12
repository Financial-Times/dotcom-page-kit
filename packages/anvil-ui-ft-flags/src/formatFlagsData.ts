import { TFlagsData } from './types'

export default function formatFlagsData(flags: TFlagsData = {}): string {
  const output = {}

  Object.keys(flags).forEach((key) => {
    const value = flags[key]

    if (value) {
      output[key] = value
    }
  })

  return JSON.stringify(output)
}
