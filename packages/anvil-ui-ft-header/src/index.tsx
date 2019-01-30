import React from 'react'

import Drawer from './drawer'

interface Props {
  children?: any
}

const FTHeader: React.FC<Props> = ({ children }) => {
  return (
    <React.Fragment>
      {children}
      <Drawer sections={undefined} user={undefined} />
    </React.Fragment>
  )
}

export default FTHeader
