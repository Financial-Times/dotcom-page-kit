import React from 'react'
import type { MprButtonProps } from '@financial-times/o-header/src/tsx/components/mpr-button'

const MPR_URL = 'https://professional-monetary-policy-radar.ft.com/'

export const MprButton = ({ id, dataTrackable }: MprButtonProps) => (
  <a
    id={id}
    href={MPR_URL}
    data-trackable={dataTrackable}
    className="o-header__mpr-button"
    title="Monetary Policy Radar"
    data-ft-origin="pro-central-banking"
  >
    MPR
  </a>
)
