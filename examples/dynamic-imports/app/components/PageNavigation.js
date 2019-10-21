import React from 'react'

export default function PageNavigation() {
  return (
    <nav>
      <ul>
        <li>
          <a id="homePageNavLink" href="/">
            Home
          </a>
        </li>
        <li>
          <a id="dogsPageNavLink" href="/dogs">
            Dogs
          </a>
        </li>
      </ul>
    </nav>
  )
}
