import React from 'react'
import { TAppContext } from '../../types'
import { APP_CONTEXT_ELEMENT_ID } from '../../shared/appContext/constants'

export interface TAppContextProps {
  context: TAppContext
}

export function AppContextEmbed({ context }: TAppContextProps) {
  return (
    <script
      type="application/json"
      id={APP_CONTEXT_ELEMENT_ID}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(context) }}
    />
  )
}
