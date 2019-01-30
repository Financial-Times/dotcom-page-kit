<<<<<<< HEAD
import Toggle from 'o-toggle'
=======
import Toggle from 'o-toggle' // eslint-disable-line import/no-unresolved
>>>>>>> Use bower-glob-resolver to install bower dependencies for all packages, add example component

export function init() {
  const toggleButton = document.querySelector('.Expander-toggle')
  const target = document.querySelector('.Expander-content')

  return new Toggle(toggleButton, { target })
}
