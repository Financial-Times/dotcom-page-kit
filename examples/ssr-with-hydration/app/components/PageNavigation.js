import React from 'react'

export default function PageNavigation() {
  return (
    <nav>
      <ul>
        <li>
          <a id="homepageNavLink" href="/">
            Home
          </a>
        </li>
        <li>
          <a id="dogsPageNavLink" href="/dogs">
            Dogs
          </a>
        </li>
        <li>
          <a id="termsPageNavLink" href="/terms">
            Terms
          </a>
        </li>
      </ul>
    </nav>
  )
}
