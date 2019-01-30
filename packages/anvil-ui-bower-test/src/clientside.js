import Toggle from 'o-toggle' // eslint-disable-line import/no-unresolved

export function init() {
  const toggleButton = document.querySelector('.Expander-toggle')
  const target = document.querySelector('.Expander-content')

  return new Toggle(toggleButton, { target })
}
