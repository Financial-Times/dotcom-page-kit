import { TFlagsData } from './types'

export default function formatFlagsData(flags: TFlagsData = {}): string {
  const output = {}

  for (const [key, value] of Object.entries(flags)) {
    if (value) {
      output[key] = value
    }
  }

  return JSON.stringify(output)
}
