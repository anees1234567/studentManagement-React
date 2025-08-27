import { useState } from 'react'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { globalRouter } from './Routes/GlobalRouter'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <RouterProvider  router={globalRouter}/>
    </>
  )
}

export default App
