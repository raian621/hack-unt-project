import React from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';

import './LessonNode.css'

export default function LessonNode({ name, urlName, score }) {
  console.log(score)
  return (
    <a href={`/lesson/${urlName}`} className="lesson">
      <CircularProgressbar 
        value={score}
        text={`${Math.round(score)}%`}
        strokeWidth={4}
        styles={buildStyles({
          "pathColor": "var(--line-color)",
          "textColor": "var(--line-color)",
          "trailColor": '#aaaaaa99',
        })}
      />
      <p>{ name }</p>
    </a>
  )
} 