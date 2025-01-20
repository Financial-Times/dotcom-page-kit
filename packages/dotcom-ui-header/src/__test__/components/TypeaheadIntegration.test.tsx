/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import fixture from '../fixtures/index'
import { Drawer, MainHeader } from '../../index'

const propsAnonymous = { ...fixture, userIsAnonymous: true, userIsLoggedIn: false }

const components = [
  { name: 'Drawer', Component: Drawer },
  { name: 'MainHeader', Component: MainHeader }
]

describe('page-kit-header and typeahead (n-topic-search) integration', () => {
  components.forEach(({ name, Component }) => {
    describe(`${name} component`, () => {
      it(`should render the Typeahead component with the correct attribute that indicates the input field is inside the ${name.toLowerCase()}`, () => {
        render(<Component {...propsAnonymous} />)
        const searchInput = screen.getByRole('combobox')

        expect(searchInput).toBeInTheDocument()
        expect(searchInput).toHaveAttribute('type', 'search')
      })

      it('should semantically connect the suggestions wrapper by setting aria-controls attribute', () => {
        render(<Component {...propsAnonymous} />)
        const searchInput = screen.getByRole('combobox')

        expect(searchInput).toHaveAttribute('aria-controls', `suggestions-${searchInput.id}`)
      })

      if (name === 'Drawer') {
        it('should indicate that search input belongs inside a drawer', () => {
          render(<Component {...propsAnonymous} />)
          const searchInput = screen.getByRole('combobox')

          expect(searchInput).toHaveAttribute('data-n-topic-search-drawer')
        })
      }
    })
  })
})
