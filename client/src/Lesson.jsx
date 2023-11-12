import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Lesson() {
  let { name: urlName } = useParams();

  const [name, setName] = useState('Title')
  const [content, setContent] = useState([])

  const getLessonData = async() => {
    const res = await fetch(`http://localhost:3000/content/${urlName}`)
    const lessonData = await res.json()
    console.log(lessonData)
    setName(lessonData.name)
    setContent(lessonData.content)
  }

  useEffect(() => { getLessonData() }, [])

  return (
    <div className="lesson-reading">
      <h1>{ name }</h1>

      { content.map((paragraph, i) => <p key={i}>{ paragraph }</p>) }

      <a className="overconfidence-button" href={`/quiz/${urlName}`}>Take quiz</a>
    </div>
  )
}