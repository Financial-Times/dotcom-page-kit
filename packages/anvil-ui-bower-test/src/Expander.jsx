import React from 'react'

export const Expander = ({ buttonText }) => (
  <div className="Expander">
    <button className="Expander-toggle">{buttonText}</button>
    <div className="Expander-content">
      <div class="o-loading o-loading--dark o-loading--small" />
    </div>
  </div>
)
