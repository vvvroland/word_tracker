import { useState } from 'react'
import './App.css'
import { Route, Routes, Navigate, Link } from 'react-router-dom'
import Library from './views/Library'
import SingleStat from './views/SingleStat'
import Edit from './views/Edit'
import New from './views/New'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        
      <Routes>
      <Route path='/' element={<Navigate to="/stories"/>} />
      <Route path='/stories' element={<Library />} />
      <Route path='/stories/:id/single' element={<SingleStat />} />
      <Route path='/stories/:id/edit' element={<Edit />} />
      <Route path='/stories/new' element={<New />} />
      </Routes>
      </div>
    </>
  )
}

export default App
