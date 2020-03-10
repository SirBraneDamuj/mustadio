import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MapPreview from './MapPreview';

test('shows the render dialog when 3D is clicked', async () => {
  const { getByText, findByText } = render(<MapPreview mapNumber={'MAP001'} />);
  const renderLink = getByText("3D!");
  expect(renderLink).toBeInTheDocument();
  fireEvent.click(renderLink);
  expect(await findByText('Map Renderer')).toBeVisible();
});