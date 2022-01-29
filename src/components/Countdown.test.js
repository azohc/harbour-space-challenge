import React from 'react'

import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import Countdown from './Countdown'

test("past date prints time's up", () => {
  render(
    <Countdown
      deadline={new Date().setFullYear(new Date().getFullYear() - 1)}
    />
  )
  expect(screen.getByText("Time's up!")).toBeInTheDocument()
  expect(
    screen.queryByTestId('countdown-span')
  ).not.toBeInTheDocument()
})

test('future date prints time left', () => {
  render(
    <Countdown
      deadline={new Date().setFullYear(new Date().getFullYear() + 1)}
    />
  )
  // wait a second to get 364 days 23 hours 59 minutes 59 seconds (4 spans)
  setTimeout(() => {}, 1000)
  expect(screen.queryByText("Time's up!")).not.toBeInTheDocument()
  expect(screen.getAllByTestId('countdown-span')).toHaveLength(4)
})
