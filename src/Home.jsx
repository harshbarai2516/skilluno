import React, { useState, useEffect } from 'react';
import './App.css';
import Leftcol from './Leftcol';
import RightCol from './RightCol';
import NumberGrid from './NumberGrid'; 
import Filter from './Filter';
import Result from './Result';
import UpperRow from './Upperrow';
import Notification from './Notifcation';


const Home = () => {
  const [selectedRange, setSelectedRange] = useState('10-19');
  const [selectedRangeState, setSelectedRangeState] = useState("1000-1099");

  useEffect(() => {
    const setVH = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    };
    setVH();
    window.addEventListener("resize", setVH);
    return () => window.removeEventListener("resize", setVH);
  }, []);

  
  const [heights, setHeights] = useState({
    top: '21%',
    main: '72%',
    bottom: '7%'
  });

  useEffect(() => {
    const calculateHeights = () => {
      const windowHeight = window.innerHeight;
      setHeights({
        top: `${0.21 * windowHeight}px`,
        main: `${0.72 * windowHeight}px`,
        bottom: `${0.07 * windowHeight}px`
      });
    };

    calculateHeights();
    window.addEventListener('resize', calculateHeights);
    return () => window.removeEventListener('resize', calculateHeights);
  }, []);

  return (
    <div className="container">
      <div className="section top-section" style={{ height: heights.top }}>
        <div className="top-vertical-container">
          <div className="top-vertical-part part1"><Result/></div>
          <div className="top-vertical-part part2"><Notification /></div>
          <div className="top-vertical-part part3"><UpperRow /></div>
          <div className="top-vertical-part part4">
            <Filter setSelectedRange={setSelectedRange} setSelectedRangeState={setSelectedRangeState}/>
          </div>
        </div>
      </div>
      
      <div className="section main-section" style={{ height: heights.main }}>
        <div className="middle-container">
          <div className="middle-left">
            <div className="middle-content">
              <Leftcol selectedRange={selectedRange} selectedRangeState={selectedRangeState} setSelectedRangeState={setSelectedRangeState}/>
            </div>
          </div>
          <div className="middle-center">
            <div className="middle-content">
              <NumberGrid selectedRangeState={selectedRangeState} />
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
        <div className="footer-row">
          <div className="footer-col footer-col1">
             <button className="advance-draw-btn">Advance Draw F9</button>
          </div>
          <div className="footer-col footer-col2">
            <div className="footer-center-row">
              <div className="footer-center-col footer-center-col1">
                <span className="footer-text">Last Transaction:<br/>#22081690601 Pt(40)</span>
              </div>
              <div className="footer-center-col footer-center-col2">
                     <input type="text" placeholder="Barcode" className="barcode-input" />
              </div>
              <div className="footer-center-col footer-center-col3">
                  <button className="buy-now-btn">Buy Now (F6)</button>
              </div>
            </div>
          </div>
          <div className="footer-col footer-col3">
             <div className="section3-part-3">
                <button className="advance-sum-btn">0</button>
                <button className="advance-sum-btn">0</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;