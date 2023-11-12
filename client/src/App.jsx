import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './Dashboard'
import Lesson from './Lesson'
import Quiz from './Quiz'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Dashboard/>}/>
        <Route path="lesson/:name" element={<Lesson/>}/>
        <Route path="quiz/:name" element={<Quiz/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
