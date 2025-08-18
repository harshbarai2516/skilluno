import React from 'react';
import './Sample.css'; // We'll create this CSS file

const App = () => {
  return (
    <div className="container">
      <div className="section top-section">
        <h2>Header Section (27%)</h2>
        <p>This section takes 27% of the viewport height.</p>
      </div>
      
      <div className="section main-section">
        <h2>Main Content (65%)</h2>
        <p>This is the primary content area taking 65% of the viewport height.</p>
      </div>
      
      <div className="section bottom-section">
        <h2>Footer (8%)</h2>
        <p>Footer area with 8% height.</p>
      </div>
    </div>
  );
};

export default App;


// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <div className="safearea">
//       <div className="section section1">Section 1 (27%)</div>
//       <div className="section section2">Section 2 (65%)</div>
//       <div className="section section3">Section 3 (8%)</div>
//     </div>
//   )
// }

// export default App
