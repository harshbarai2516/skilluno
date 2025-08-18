import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="safearea">
      <div className="section section1">Section 1 (27%)</div>
      <div className="section section2">Section 2 (65%)</div>
      <div className="section section3">Section 3 (8%)</div>
    </div>
  )
}

export default App
