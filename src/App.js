import { useState, useEffect } from 'react'
import './App.css'

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

  return (
    <div className="App">
      <header className="App-header">header</header>
      {!isLoaded ? <div>loading</div> : <div>loaded</div>}
      {error.length !== 0 ? (
        <div data-testid="api-error">Failed to load content</div>
      ) : null}
    </div>
  )
}

export default App
export { API_URL }
