import React from 'react'

export interface AskFtButtonProps {
  id: string
  className: string
  dataTrackable: string
}

export const AskFtButton = ({ id, className, dataTrackable }: AskFtButtonProps) => (
  <a
    id={id}
    className={`ft-header__ask-ft-button ${className}`}
    data-trackable={dataTrackable}
    href="https://ask.ft.com"
    title="ASK FT"
  >
    <span className="ft-header__ask-ft-button-label">Ask FT</span>
  </a>
)
