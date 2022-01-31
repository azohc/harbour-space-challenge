import React from 'react'

import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import TextCard from './TextCard'

test('single title, subtitle and text are rendered when no multimap provided', () => {
  render(<TextCard title="Title" subtitle="Subtitle" text="Text" />)
  expect(screen.queryAllByText('Title')).toHaveLength(1)
  expect(screen.queryAllByText('Subtitle')).toHaveLength(1)
  expect(screen.queryAllByText('Text')).toHaveLength(1)
})

test('multiple titles and texts are rendered when multimap is provided', () => {
  render(<TextCard multiMap={{ Title1: 'A', Title2: 'B' }} />)
  expect(screen.queryAllByText(/Title\d/)).toHaveLength(2)
  expect(screen.getByText('A')).toBeInTheDocument()
  expect(screen.getByText('B')).toBeInTheDocument()
})
