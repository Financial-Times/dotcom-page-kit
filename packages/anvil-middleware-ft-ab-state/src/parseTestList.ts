export default (list: string): Map<string, string> => {
  return list.split(',').reduce((accumulator, item) => {
    const [key, value] = item.split(':')

    if (key && value) {
      accumulator.set(key, value)
    }

    return accumulator
  }, new Map())
}
