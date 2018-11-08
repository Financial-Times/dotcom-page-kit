import fs from 'fs'

export const getDefaultData = (filename: string) => {
  const defaultDataBuffer = fs.readFileSync(require.resolve(filename))
  return JSON.parse(defaultDataBuffer.toString())
}
