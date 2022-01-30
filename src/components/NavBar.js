import React from 'react'
import './NavBar.css'

function NavBar(props) {
  function renderProgramName() {
    if (props['programName']) {
      return (
        <span
          data-testid="program-name"
          className="program-name"
        >{`/${props.programName}`}</span>
      )
    }
  }
  return (
    <div id="navbar">
      <div className="left-title">
        <span className="harbour-space">HARBOUR SPACE</span>
        {renderProgramName()}
      </div>
      <button
        id="menu-button"
        onClick={() => console.log('coming soon')}
      >
        <svg
          width="18px"
          height="18px"
          viewBox="0 0 18 18"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#fff"
            d="M17 5H1a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2zm0 5H1a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2zm0 5H1a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2z"
          />
        </svg>
      </button>
    </div>
  )
}

export default NavBar
