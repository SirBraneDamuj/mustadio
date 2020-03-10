import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Header from './Header';

test('shows the contact modal when contact is clicked', async () => {
  const { getByText, findByText } = render(<Header />);
  const contactLink = getByText("Contact");
  expect(contactLink).toBeInTheDocument();
  fireEvent.click(contactLink);
  expect(await findByText(/Mustadio is open source/)).toBeVisible();
});

test('shows the matchup modal when Choose Matchup is clicked', async () => {
  const { getByText, findByText } = render(<Header />);
  const matchupLink = getByText("Choose Matchup...");
  expect(matchupLink).toBeInTheDocument();
  fireEvent.click(matchupLink);
  expect(await findByText(/Round 1/)).toBeVisible();
});