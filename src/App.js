import { useState, useEffect } from 'react'
import './App.css'
import Countdown from './components/Countdown'

const API_URL =
  'https://stage.harbour.space/api/v1/scholarship_pages/data-science-apprenticeship-zeptolab'

function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [payload, setPayload] = useState({})
  const [error, setError] = useState([])

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(
        result => {
          setIsLoaded(true)
          setPayload(result)
        },
        error => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }, [])

  function renderApplicationCountdown() {
    if (!isLoaded || !Object.keys(payload).length) return
    return (
      <Countdown
        // deadline={payload['scholarship']['application_end_date']}
        deadline={new Date().setFullYear(
          new Date().getFullYear() + 1
        )}
      />
    )
  }
  return (
    <div className="App">
      <header className="App-header">header</header>
      {!isLoaded ? <div>loading</div> : <div>loaded</div>}
      {error.length !== 0 ? (
        <div data-testid="api-error">Failed to load content</div>
      ) : null}
      {renderApplicationCountdown()}
    </div>
  )
}

export default App
export { API_URL }
