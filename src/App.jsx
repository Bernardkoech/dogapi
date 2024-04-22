
 import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import SingleDog from './Pages/SingleDog'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/:name" element={<SingleDog />}></Route>
      </Routes>
    </div>
  )
}

export default App
