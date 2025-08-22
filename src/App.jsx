// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Threed from './Threed';

function App() {
  return (
    <>
      {/* Overlay shown only in portrait */}
      <div className="rotate-overlay">
        Please rotate your device to landscape mode to use this app.
      </div>

      {/* Actual App content */}
      <div className="app-wrapper">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/threed" element={<Threed />} />
          </Routes>
        </BrowserRouter>
      </div>

      {/* Orientation-based styles */}
      <style jsx="true" global="true">{`
        /* Portrait mode: block the app, show overlay */
        @media (orientation: portrait) {
          .app-wrapper {
            display: none !important;
          }
        }

        /* Landscape mode: show app, hide overlay */
        @media (orientation: landscape) {
          .app-wrapper {
            display: block !important;
          }
          .rotate-overlay {
            display: none !important;
          }
        }

        .rotate-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #111;
          color: #fff;
          font-size: 2rem;
          font-weight: 600;
          display: none;
          align-items: center;
          justify-content: center;
          text-align: center;
          line-height: 1.4;
          padding: 20px;
        }
      `}</style>
    </>
  );
}

export default App;
