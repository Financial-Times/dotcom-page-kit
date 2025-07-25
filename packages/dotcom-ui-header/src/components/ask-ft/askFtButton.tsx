import React from 'react'
import { LinkButton } from '@financial-times/o3-button'

export interface AskFtButtonProps {
  id: string
  variant: 'top' | 'drawer'
  dataTrackable: string
}

export const AskFtButton = ({ id, variant, dataTrackable }: AskFtButtonProps) => (
  <LinkButton
    href="https://ask.ft.com"
    icon="sparkles"
    label="Ask FT"
    size="small"
    theme="neutral"
    type="primary"
    attributes={{
      id: id,
      'data-trackable': dataTrackable,
      className: `ft-header__ask-ft-button ft-header__ask-ft-button--${variant}`
    }}
  />
)
