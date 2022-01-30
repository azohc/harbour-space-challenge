import React from 'react'

import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import NavBar from './NavBar'

test('only harbour space is printed when no programName is provided', () => {
  render(<NavBar />)
  expect(screen.getByText('HARBOUR SPACE')).toBeInTheDocument()
  expect(screen.queryByTestId('program-name')).not.toBeInTheDocument()
})

test('harbour space and program name are printed', () => {
  render(<NavBar programName="programName" />)
  expect(screen.getByText('HARBOUR SPACE')).toBeInTheDocument()
  expect(screen.getByText('/programName')).toBeInTheDocument()
  expect(screen.queryByTestId('program-name')).toBeInTheDocument()
})
