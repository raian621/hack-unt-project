import React from 'react'
import LessonNode from "./LessonNode"

export default function Section({ name, lessons }) {
  return (
    <div className="section">
      <h2>{ name }</h2>
      <div className="section-content">
        { lessons.map(lesson => {
          return <LessonNode name={lesson.name} urlName={lesson.urlName} score={lesson.score}/>
        })}
      </div>
    </div>
  )
}