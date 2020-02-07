const React = require('react')

exports.Component = function({ text }) {
  return React.createElement('div', null, text)
}
