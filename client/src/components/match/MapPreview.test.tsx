import React from 'react';
import MapPreview from './MapPreview';
import { renderWithContext } from '../../test-utils';

test('renders the 3D button', () => {
  const { getByText, getByRole } = renderWithContext(<MapPreview mapNumber={'001'} mapTitle={'Test Map'} />);
  const renderButton = getByText("3D!");
  expect(renderButton).toBeInTheDocument();
  expect(getByRole('button', { name: '3D!' })).toBeEnabled();
});

test('renders the map title link', () => {
  const { getByText } = renderWithContext(<MapPreview mapNumber={'001'} mapTitle={'Test Map'} />);
  const titleLink = getByText('001) Test Map');
  expect(titleLink).toBeInTheDocument();
  expect(titleLink.closest('a')).toHaveAttribute('href', expect.stringContaining('ffhacktics.com'));
});