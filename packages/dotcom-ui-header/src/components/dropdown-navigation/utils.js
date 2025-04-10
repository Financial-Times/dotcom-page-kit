export const isEqual = (obj1, obj2) => {
  if (obj1 === obj2) {
    return true
  }

  if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
    return false
  }

  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  if (keys1.length !== keys2.length) {
    return false
  }

  for (let i = 0; i < keys1.length; i++) {
    const k1 = keys1[i]
    const k2 = keys2[i]
    if (k1 !== k2) {
      return false
    }

    if (!isEqual(obj1[k1], obj2[k2])) {
      return false
    }
  }

  return true
}
