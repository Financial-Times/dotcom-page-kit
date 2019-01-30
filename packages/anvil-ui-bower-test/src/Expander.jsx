import React from 'react'

export const Expander = ({ buttonText, textContent }) => (
  <div className="Expander">
    <style dangerouslySetInnerHTML={{ __html: '[aria-hidden="true"] { display: none }' }} />
    <button className="Expander-toggle">{buttonText}</button>
    <div className="Expander-content">{textContent}</div>
  </div>
)
