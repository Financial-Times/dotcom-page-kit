import React from 'react'
import { TAppContext } from '../types'
import { APP_CONTEXT_ELEMENT_ID } from '../constants'

export type TAppContextProps = {
  appContext?: TAppContext
}

export function AppContextEmbed({ appContext }: TAppContextProps) {
  return (
    <script
      type="application/json"
      id={APP_CONTEXT_ELEMENT_ID}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(appContext) }}
    />
  )
}
