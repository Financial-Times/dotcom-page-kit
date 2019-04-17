const buildServiceURL = 'https://www.ft.com/__origami/service/build/v2/bundles'

const types = new Set(['js', 'css'])

module.exports = function buildService(components = [], type) {
  if (types.has(type)) {
    return `${buildServiceURL}/${type}?modules=${components.join()}`
  } else {
    throw Error(`Unknown build service asset type: "${type}"`)
  }
}
