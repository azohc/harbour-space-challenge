import React from 'react'
import './TextCard.css'

function TextCard(props) {
  function renderSingleOrMultipleElements() {
    if (props.multiMap && Object.keys(props.multiMap)) {
      const elementPairs = []
      let i = 0
      for (const key of Object.keys(props.multiMap)) {
        elementPairs.push(
          <div key={i++} id="pair-container">
            <div id="title">{key}</div>
            <div id="text">{props.multiMap[key]}</div>
          </div>
        )
      }
      return <div id="container-multi">{elementPairs}</div>
    } else {
      return (
        <div id="container">
          <div id="title">{props.title}</div>
          <div id="subtitle">{props.subtitle}</div>
          <div id="text">{props.text}</div>
        </div>
      )
    }
  }

  return renderSingleOrMultipleElements()
}

export default TextCard
