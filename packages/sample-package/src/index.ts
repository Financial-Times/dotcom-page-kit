import { enumerator } from './enumerator'

export default (number: number) => {
  if (typeof number !== 'number') {
    throw TypeError('NO DO NOT DO THAT')
  }

  return number * enumerator
}
