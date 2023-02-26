// Write your tests here
test('sanity', () => {
  expect(true).toBe(false)
})

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import AppFunctional from './AppFunctional';

test('updates email input value', async () => {
  render(<AppFunctional />);
  const emailInput = screen.getByPlaceholderText('email girin');
  
  // Simulate typing an email address into the input field
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  
  // Wait for the component to update its state with the new email value
  await waitFor(() => {
    expect(emailInput).toHaveValue('test@example.com');
  });
});


