import delve from 'dlv'

export const getNavigationForEdition = (editions: {}) => {
  // edition = the value of editions.current.id otherwise "uk"
  const edition = delve(editions, 'current.id', 'uk')

  return {
    navbar: `navbar-${edition}`,
    drawer: `drawer-${edition}`
  }
}
