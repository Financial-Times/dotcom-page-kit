const addEditionBasedProperties = (navigation, currentEdition) => {
  const clone = JSON.parse(JSON.stringify(navigation))
  clone.navbar = currentEdition === 'uk' ? 'navbar-uk' : 'navbar-international'
  clone.drawer = currentEdition === 'uk' ? 'drawer-uk' : 'drawer-international'
  return clone
}

export const assignNavigation = (navigation, editions) => {
  const currentEdition = editions.current.id
  let response
  if(currentEdition && navigation) {
    response = addEditionBasedProperties(navigation, editions)
  }
  return response
}
