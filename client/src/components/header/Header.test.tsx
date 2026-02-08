import React from 'react';
import { fireEvent } from '@testing-library/react';
import Header from './Header';
import { renderWithProviders } from '../../test-utils';

const defaultProps = {
  useDarkTheme: false,
  handleDarkThemeToggle: () => {},
};

test('shows the contact modal when contact is clicked', async () => {
  const { getByText, findByText } = renderWithProviders(
    <Header {...defaultProps} />,
    { withRouter: true }
  );
  // Open the Links dropdown first
  const linksDropdown = getByText("Links");
  fireEvent.click(linksDropdown);

  const contactLink = getByText("Contact");
  expect(contactLink).toBeInTheDocument();
  fireEvent.click(contactLink);
  expect(await findByText(/Mustadio is open source/)).toBeVisible();
});

test('shows the matchup modal when Choose Matchup is clicked', async () => {
  const { getByText, findByText } = renderWithProviders(
    <Header {...defaultProps} />,
    { withRouter: true }
  );
  const matchupLink = getByText("Choose Matchup...");
  expect(matchupLink).toBeInTheDocument();
  fireEvent.click(matchupLink);
  expect(await findByText(/Tournament Navigation/)).toBeVisible();
});