export function getScriptsToLoad(assetLoader) {
  return [
    assetLoader.getPublicURL('runtime.js'),
    ...assetLoader.getPublicURLOfHashedAssetsMatching(/npm\.(.*)\.js/),
    assetLoader.getPublicURL('main.js')
  ]
}

export async function getInitialProps({ getInitialProps }, req) {
  if (!getInitialProps) return {}
  return await getInitialProps({ req })
}

export async function getDependencies({ getDependencies }) {
  if (!getDependencies) return {}
  return await getDependencies()
}
