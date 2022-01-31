import { useState, useEffect } from 'react'
import './App.css'
import Countdown from './components/Countdown'
import NavBar from './components/NavBar'
import TextCard from './components/TextCard'

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
    const scholarship = payload['scholarship']
    const scholarship_start_date =
      scholarship['scholarship_start_date']
    return (
      <section id="top-section">
        <div className="program-title">{scholarship['name']}</div>
        <div className="program-description">
          <p className="encourage-text">
            {scholarship['encourage_text'][0]['data']}
          </p>
          <p className="scholarship-desc">
            {scholarship['description'][0]['data']}
          </p>
          <button id="apply-button">Apply Now</button>
        </div>
        {scholarship['position'] ? (
          <span>Position: {scholarship['position']}</span>
        ) : null}
        <div className="sponsor-countdown-location">
          <div className="sponsor-container">
            <img src="/zeptolab.png" alt="Zeptolab Logo"></img>
            <div className="powered-by">Powered by:</div>
            <div className="sponsor">Zeptolab</div>
          </div>
          <TextCard
            title={'Application closes in'}
            subtitle={renderApplicationCountdown()}
          />
          <TextCard
            multiMap={{
              Location: scholarship['location']['name'],
              Duration: `${scholarship['duration']} year`,
              'Start Date': formatDateString(
                new Date(scholarship_start_date).toDateString()
              ),
              'End Date': formatDateString(
                new Date(
                  new Date(scholarship_start_date).setFullYear(
                    new Date(scholarship_start_date).getFullYear() + 1
                  )
                ).toDateString()
              ),
            }}
          />
        </div>
      </section>
    )
  }

  function formatDateString(dateStr) {
    const parsed = dateStr
      .replace(/Mon |Tue |Wed |Thu |Fri |Sat |Sun/, '')
      .split(' ')

    return `${parsed[1]} ${parsed[0]} ${parsed[2]}`
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
