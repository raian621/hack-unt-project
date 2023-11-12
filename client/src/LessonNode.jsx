import React from 'react'

export default function LessonNode({ name, urlName }) {
  console.log(name)
  return (
    <a href={`/lesson/${urlName}`} className="lesson">
      <div className="lesson-icon"></div>
      <p>{ name }</p>
    </a>
  )
} 