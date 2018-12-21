export default (blocks: object = {}) => {
  return Object.keys(blocks).reduce((blocksWithContent, key) => {
    const value = blocks[key]

    // Blocks may be used multiple times and build up an array
    if (Array.isArray(value) && value.length) {
      blocksWithContent[key] = value.join('\n')
    }

    return blocksWithContent
  }, {})
}
