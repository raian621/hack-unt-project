import React from 'react'
import LessonNode from "./LessonNode"

export default function Section({ name, lessons }) {
  console.log(lessons)
  return (
    <div className="section">
      <h1>{ name }</h1>
      <div className="section-content">
        { lessons.map(lesson => {
          return <LessonNode name={lesson.name} urlName={lesson.urlName}/>
        })}
      </div>
    </div>
  )
}