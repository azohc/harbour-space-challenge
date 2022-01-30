import { useState, useEffect } from 'react'
import './App.css'
import Countdown from './components/Countdown'
import NavBar from './components/NavBar'

const API_URL =
  'https://stage.harbour.space/api/v1/scholarship_pages/data-science-apprenticeship-zeptolab'

function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [payload, setPayload] = useState({})
  const [error, setError] = useState()

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(
        result => {
          setPayload(result)
          setIsLoaded(true)
        },
        error => {
          setError(error)
        }
      )
  }, [])

  function renderApplicationCountdown() {
    if (!isLoaded) return
    return (
      <Countdown
        deadline={payload['scholarship']['application_end_date']}
      />
    )
  }

  function renderErrorMessage() {
    if (error) {
      return <div data-testid="api-error">Failed to load content</div>
    }
  }
  return (
    <div className="App">
      <NavBar
        programName={
          isLoaded ? payload['scholarship']['program']['name'] : null
        }
      />
      <header className="App-header">header</header>
      {!isLoaded ? <div>loading</div> : <div>loaded</div>}
      {renderErrorMessage()}
      {renderApplicationCountdown()}
    </div>
  )
}

export default App
export { API_URL }
