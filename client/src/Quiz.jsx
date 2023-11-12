import { useParams } from "react-router-dom"

export default function Quiz() {
  const { urlName } = useParams()



  return (
    <>
      <h1>Quiz</h1>
      <h2>{ urlName }</h2>
    </>
  )
}