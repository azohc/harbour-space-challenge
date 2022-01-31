import React from 'react'
import './Ellipsis.css'

function Ellipsis() {
  return (
    <div data-testid="loading-spinner" className="lds-ellipsis">
      <div key="1"></div>
      <div key="2"></div>
      <div key="3"></div>
      <div key="4"></div>
    </div>
  )
}

export default Ellipsis
