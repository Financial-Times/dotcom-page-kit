import React from 'react'
import Home from '../../views/Home'

export function homePageController(req, res) {
  res.render(<Home greeting="hello world..." />)
}
