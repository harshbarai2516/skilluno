import React, { useState, useEffect } from 'react';
import './App.css';
import Leftcol from './Leftcol';
import RightCol from './RightCol';
import NumberGrid from './NumberGrid'; 


const App = () => {
  const [heights, setHeights] = useState({
    top: '27%',
    main: '65%',
    bottom: '8%'
  });

  useEffect(() => {
    const calculateHeights = () => {
      const windowHeight = window.innerHeight;
      setHeights({
        top: `${0.27 * windowHeight}px`,
        main: `${0.65 * windowHeight}px`,
        bottom: `${0.08 * windowHeight}px`
      });
    };

    calculateHeights();
    window.addEventListener('resize', calculateHeights);
    return () => window.removeEventListener('resize', calculateHeights);
  }, []);

  return (
    <div className="container">
      <div className="section top-section" style={{ height: heights.top }}>
        <div className="section-content">
          <h2>Header Section (27%)</h2>
          <p>This section takes 27% of the viewport height.</p>
        </div>
      </div>
      
      <div className="section main-section" style={{ height: heights.main }}>
        <div className="middle-container">
          <div className="middle-left">
            <div className="middle-content">
              <Leftcol />
            </div>
          </div>
          <div className="middle-center">
            <div className="middle-content">
              <NumberGrid />
            </div>
          </div>
          <div className="middle-right">
            <div className="middle-content">
             <RightCol />
            </div>
          </div>
        </div>
      </div>
      
      <div className="section bottom-section" style={{ height: heights.bottom }}>
        <div className="section-content">
          <h2>Footer (8%)</h2>
          <p>Footer area with 8% height.</p>
        </div>
      </div>
    </div>
  );
};

export default App;