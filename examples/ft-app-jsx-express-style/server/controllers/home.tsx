import React from 'react'
import Home from '../../views/Home'

export function homePageController(_, res) {
  res.render(<Home greeting="hello world..." />)
}
