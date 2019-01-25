import React from 'react'

import Drawer from './drawer'

export default function FTHeader({ children }) {
  return (
    <React.Fragment>
      {children}
      <Drawer sections={undefined} user={undefined} />
    </React.Fragment>
  )
}
