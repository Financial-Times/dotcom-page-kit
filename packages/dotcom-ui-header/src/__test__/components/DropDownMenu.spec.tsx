/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { DropdownMenu } from '../../components/dropdown-menu/dropDownMenu'
import DROPDOWN_DEFAULT_LIST from '../../components/dropdown-menu/dropDownProfessionalList.json'

describe('DropdownMenu', () => {
  it('renders correctly', () => {
    const { baseElement: dropdown } = render(
      <DropdownMenu
        listToDisplay={DROPDOWN_DEFAULT_LIST}
        headerContent="Test Title"
        trackingKey="test_tracking"
      />
    )

    expect(dropdown).toMatchSnapshot()
  })

  it('renders label', () => {
    const MockLabel = () => <div>Mock Label</div>
    const mockLabelCount = DROPDOWN_DEFAULT_LIST.filter((item) => item.hasLabel).length
    const { baseElement: dropdown, queryAllByText } = render(
      <DropdownMenu
        listToDisplay={DROPDOWN_DEFAULT_LIST}
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
      <DropdownMenu
        listToDisplay={DROPDOWN_DEFAULT_LIST}
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
      <DropdownMenu
        listToDisplay={DROPDOWN_DEFAULT_LIST}
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
    expect(contentContainer.getAttribute('data-o-tracking-view')).toContain(trackingKey)
  })
})
