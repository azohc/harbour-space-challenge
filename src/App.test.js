// import dependencies
import React from 'react'

// import API mocking utilities from Mock Service Worker
import { rest } from 'msw'
import { setupServer } from 'msw/node'

// import react-testing methods
import { render, waitFor, screen } from '@testing-library/react'

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom'
import App, { API_URL } from './App'
import { DATA_SCIENCE_APPRENTICESHIP_ZEPTOLAB } from './mockResponse'

// mock get requests to the API to return json
const server = setupServer(
  rest.get(API_URL, (req, res, ctx) => {
    return res(ctx.json(DATA_SCIENCE_APPRENTICESHIP_ZEPTOLAB))
  })
)

// establish API mocking before all tests
beforeAll(() => server.listen())
// reset any request handlers that are declared as part of our tests
afterEach(() => server.resetHandlers())
// clean up once tests are done
afterAll(() => server.close())

test('loads and displays content container', async () => {
  render(<App />)
  expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  await waitFor(() =>
    expect(
      screen.getByTestId('content-container')
    ).toBeInTheDocument()
  )
})

test('handle server error', async () => {
  server.use(
    rest.get(API_URL, (res, req, ctx) => {
      return res(ctx.status(500))
    })
  )
  const { findByTestId } = render(<App />)
  expect(await findByTestId('api-error')).toHaveTextContent(
    'Failed to load content'
  )
})
