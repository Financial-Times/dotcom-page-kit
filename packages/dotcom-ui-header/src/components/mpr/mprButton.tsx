import React from 'react'
import { LinkButton } from '@financial-times/o3-button'
import type { MprButtonProps } from '@financial-times/o-header/src/tsx/components/mpr-button'

const MPR_URL = 'https://professional-monetary-policy-radar.ft.com/'

export const MprButton = ({ id, dataTrackable }: MprButtonProps) => (
  <LinkButton
    href={MPR_URL}
    icon="radar"
    label="MPR"
    size="small"
    type="primary"
    attributes={{
      id: id,
      'data-trackable': dataTrackable,
      className: `o-header__mpr-button`,
      'data-ft-origin': 'pro-central-banking'
    }}
  />
)
