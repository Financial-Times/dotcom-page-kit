import React from 'react'

export interface AskFtButtonProps {
  className: string
  dataTrackable: string
}

export const AskFtButton = ({ className, dataTrackable }: AskFtButtonProps) => (
  <a
    className={`ask-ft-button ${className}`}
    data-trackable={dataTrackable}
    href="https://ask.ft.com"
    title="ASK FT"
  >
    Ask FT
  </a>
)
