// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Threed from './Threed';

function App() {
  return (
      <>
        <div className="rotate-overlay">
          Please rotate your device to landscape mode to use this app.
        </div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/threed" element={<Threed />} />
          </Routes>
        </BrowserRouter>
        <style jsx global>{`
          @media (orientation: portrait) {
            .rotate-overlay {
              display: flex;
            }
          }
          @media (orientation: landscape) {
            .rotate-overlay {
              display: none;
            }
          }
          .rotate-overlay {
            position: fixed;
            z-index: 9999;
            inset: 0;
            background: #111;
            color: #fff;
            font-size: 2rem;
            align-items: center;
            justify-content: center;
            text-align: center;
            display: none;
          }
        `}</style>
      </>
  );
}

export default App;