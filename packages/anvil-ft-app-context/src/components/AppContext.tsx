import React from 'react'
import { TAppContext } from '../types'
import { APP_CONTEXT_ELEMENT_ID } from '../constants'

export interface TAppContextProps {
  data: TAppContext
}

export function AppContext({ data }: TAppContextProps) {
  return (
    <script
      type="application/json"
      id={APP_CONTEXT_ELEMENT_ID}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
