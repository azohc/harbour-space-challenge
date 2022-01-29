import React from 'react'
import { useEffect, useState } from 'react'

function Countdown(props) {
  const calculateTimeLeftToCloseApplications = () => {
    const difference = +new Date(props.deadline) - +new Date()
    if (difference > 0) {
      const timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
      return timeLeft
    } else {
      return {}
    }
  }

  const [
    timeLeftToCloseApplications,
    setTimeLeftToCloseApplications,
  ] = useState(calculateTimeLeftToCloseApplications())

  useEffect(() => {
    setTimeout(() => {
      setTimeLeftToCloseApplications(() =>
        calculateTimeLeftToCloseApplications()
      )
    }, 1000)
  })

  const timerComponents = []
  if (Object.keys(timeLeftToCloseApplications).length) {
    Object.keys(timeLeftToCloseApplications).forEach(interval => {
      if (!timeLeftToCloseApplications[interval]) {
        return
      }

      timerComponents.push(
        <span
          data-testid="countdown-span"
          key={timerComponents.length}
        >
          {timeLeftToCloseApplications[interval]} {interval}{' '}
        </span>
      )
    })
  }

  return (
    <div>
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span>Time's up!</span>
      )}
    </div>
  )
}

export default Countdown
