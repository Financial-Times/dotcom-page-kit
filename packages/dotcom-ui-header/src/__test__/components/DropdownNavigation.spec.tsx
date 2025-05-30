/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { DropdownNavigation } from '../../components/dropdown-navigation/dropdownNavigation'
import { PRO_NAVIGATION_DROPDOWN_DEFAULT_LIST } from '../../components/dropdown-navigation/constants'

describe('DropdownNavigation', () => {
  it('renders correctly', () => {
    const { baseElement: dropdown } = render(
      <DropdownNavigation
        selector="test_dropdown"
        options={PRO_NAVIGATION_DROPDOWN_DEFAULT_LIST}
        headerContent="Test Title"
        trackingKey="test_tracking"
      />
    )

    expect(dropdown).toMatchSnapshot()
  })

  it('renders button props', () => {
    const { baseElement: dropdown } = render(
      <DropdownNavigation
        buttonId="test_button_id"
        buttonIcon="test_icon"
        selector="test_dropdown"
        options={PRO_NAVIGATION_DROPDOWN_DEFAULT_LIST}
        headerContent="Test Title"
        trackingKey="test_tracking"
      />
    )

    expect(dropdown).toMatchSnapshot()
  })

  it('renders label', () => {
    const MockLabel = () => <div>Mock Label</div>
    const mockLabelCount = PRO_NAVIGATION_DROPDOWN_DEFAULT_LIST.filter((item) => item.hasLabel).length
    const { baseElement: dropdown, queryAllByText } = render(
      <DropdownNavigation
        selector="test_dropdown"
        options={PRO_NAVIGATION_DROPDOWN_DEFAULT_LIST}
        headerContent="Test Title"
        trackingKey="test_tracking"
        label={<MockLabel />}
      />
    )

    const label = queryAllByText('Mock Label')

    expect(dropdown).toMatchSnapshot()
    expect(label).toHaveLength(mockLabelCount)
  })

  it('renders custom header', () => {
    const MockHeader = () => <div>Dropdown Custom Header</div>
    const { getByText } = render(
      <DropdownNavigation
        selector="test_dropdown"
        options={PRO_NAVIGATION_DROPDOWN_DEFAULT_LIST}
        headerContent={<MockHeader />}
        trackingKey="test_tracking"
      />
    )

    const header = getByText('Dropdown Custom Header')

    expect(header).toBeInTheDocument()
  })

  it('sets tracking attributes correctly', () => {
    const trackingKey = 'test_tracking'
    const { getAllByRole, baseElement } = render(
      <DropdownNavigation
        selector="test_dropdown"
        options={PRO_NAVIGATION_DROPDOWN_DEFAULT_LIST}
        headerContent="Test Title"
        trackingKey={trackingKey}
      />
    )

    const toggleButton = getAllByRole('button')[0]
    const links = getAllByRole('link')
    const contentContainer = baseElement.querySelector('[data-id="dropdown-content"]')!

    expect(toggleButton.getAttribute('data-trackable')).toContain(trackingKey)
    links.forEach((link) => {
      expect(link.getAttribute('data-trackable')).toContain(trackingKey)
    })
    expect(contentContainer).toBeInTheDocument()
  })
})
