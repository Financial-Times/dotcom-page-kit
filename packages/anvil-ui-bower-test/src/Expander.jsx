import React from 'react'

export const Expander = () => (
  <div className="Expander">
    <button className="Expander-toggle">Show loading indicator</button>
    <div className="Expander-content">
      <div class="o-loading o-loading--dark o-loading--small" />
    </div>
  </div>
)
