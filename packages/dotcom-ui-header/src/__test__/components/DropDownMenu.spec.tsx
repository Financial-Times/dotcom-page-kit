/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { DropdownMenu } from '../../components/dropdown-menu/dropDownMenu';
import DROPDOWN_DEFAULT_LIST from '../../components/dropdown-menu/dropDownProfessionalList.json';

describe('DropdownMenu', () => {
  it('renders correctly', () => {
    const {baseElement: dropdown} = render(<DropdownMenu listToDisplay={DROPDOWN_DEFAULT_LIST} headerTitle='Test Title' />);
    expect(dropdown).toMatchSnapshot();
  });
});