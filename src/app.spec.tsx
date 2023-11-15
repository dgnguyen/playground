import { render, screen } from '@testing-library/react'

import { App } from '@/app'

it('Test', () => {
  render(<App />)

  const button = screen.getByRole('button')
  expect(button).toBeEnabled()
})
