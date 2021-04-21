import { TFlagsData } from '../types'

export default function formatFlagsJSON(flags: TFlagsData = {}): TFlagsData {
  const output: {[key: string]: any} = {}

  Object.keys(flags).forEach((key) => {
    const value = flags[key]

    if (value) {
      output[key] = value
    }
  })

  return output
}
