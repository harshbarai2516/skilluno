import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="safearea">
      {/* Your app content goes here */}
      <h1>Responsive SafeArea</h1>
      <p>This area is safe and responsive on all devices.</p>
    </div>
  )
}

export default App
