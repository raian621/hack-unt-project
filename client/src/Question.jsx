import { useState } from "react"

export default function Question({ question, choices, setAnswer }) {
  const [clicked, setClicked] = useState(-1)

  return (
    <div className="question">
      <h3>{ question }</h3>
      { choices.map((choice, i) => {
        return (
          <div className="answer-choices">
            <input 
              name={i}
              type="checkbox"
              value={i}
              key={i}
              checked={i==clicked}
              onChange={() => {
                setClicked(i)
                setAnswer(choice)
              }}
            />
            <label htmlFor={i}>{ choice }</label>
          </div>
        )
      })}
    </div>
  )
}