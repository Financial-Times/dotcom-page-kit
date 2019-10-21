export async function getInitialProps({ getInitialProps }, request) {
  if (!getInitialProps) return {}
  return await getInitialProps({ rerequest })
}

export async function getDependencies({ getDependencies }) {
  if (!getDependencies) return {}
  return await getDependencies()
}
