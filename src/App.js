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

  function renderTopSection() {
    if (!isLoaded) return
    return (
      <section id="top-section">
        <div className="program-title">
          {payload['scholarship']['name']}
        </div>
        <div className="program-description">
          <p className="encourage-text">
            {payload['scholarship']['encourage_text'][0]['data']}
          </p>
          <p className="scholarship-desc">
            {payload['scholarship']['description'][0]['data']}
          </p>
          <button id="apply-button">Apply Now</button>
        </div>
        {payload['scholarship']['position'] ? (
          <span>Position: {payload['scholarship']['position']}</span>
        ) : null}
        <div className="sponsor-countdown-location">
          <div className="sponsor-container">
            <img src="/zeptolab.png" alt="Zeptolab Logo"></img>
            <div>Powered by:</div>
            <div>Zeptolab</div>
          </div>
          <br></br>
          {renderApplicationCountdown()}
          Location
        </div>
      </section>
    )
  }

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
      {renderErrorMessage()}
      {!isLoaded ? <div>loading</div> : <div>loaded</div>}
      <div id="content-container">{renderTopSection()}</div>
    </div>
  )
}

export default App
export { API_URL }
