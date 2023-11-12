import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Question from "./Question"

async function submit(urlName, answers) {
  console.log(answers)
  const res = await fetch(`http://localhost:3000/questions/${urlName}`, {
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json'
    },
    'body': JSON.stringify(answers)
  })


  const data = await res.json()
  console.log(data)
}

export default function Quiz() {
  const { name: urlName } = useParams()
  const [ name, setName ] = useState("Title")
  const [ questions, setQuestions ] = useState([])
  const [ canSubmit, setCanSubmit ] = useState(false)
  const [ answers, setAnswers ] = useState([])

  const getQuizData = async() => {
    const res = await fetch(`http://localhost:3000/questions/${urlName}`)
    const quizData = await res.json()

    setName(quizData.name)
    setQuestions(quizData.quiz)
  }

  useEffect(() => {
    getQuizData()
  }, [])

  useEffect(() => {
    answers.current = questions.map(() => null)
  }, [questions])

  function setAnswer(answer, i) {
    const newAnswers = answers.slice()
    newAnswers[i] = answer
    console.log(newAnswers)
    let allChosen = true
    newAnswers.forEach(ans => {
      if (ans === null)
      allChosen = false
    })
    if (allChosen) {
      setCanSubmit(true)
    }

    setAnswers(newAnswers)
  }

  const navigate = useNavigate()

  return (
    <>
      <h1>Quiz</h1>
      <h2>{ name }</h2>
      { questions.map((question, i) => 
        <Question
          question={question.question}
          choices={question.choices}
          setAnswer={(answer) => setAnswer(answer, i)}
        /> ) }
      <button
        disabled={!canSubmit}
        className="overconfidence-button"
        onClick={() => submit(urlName, answers).then(() => {
          navigate('/')
        })}
      >Submit</button>
    </>
  )
}

