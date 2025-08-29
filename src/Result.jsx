import React, { useEffect, useState } from "react";

const fetchPreviousResults = async () => {
  try {
    const response = await fetch("https://api.goldbazar.co.in/api/results/previousResult");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching previous results:", error);
    return null;
  }
};

// Parse a result string like "1040, 1199, 1203" into number array
const parseResultString = (str) => {
  if (!str || typeof str !== 'string') return [];
  return str
    .split(',')
    .map(s => s.trim())
    .filter(s => s !== '')
    .map(s => {
      const n = parseInt(s, 10);
      return Number.isNaN(n) ? null : n;
    })
    .filter(n => n !== null);
};

export default function Result({ selectedRange = '10-19', timeData }) {
  const [results, setResults] = useState(null);
  const [group1State, setGroup1State] = useState(Array(10).fill(null));
  const [group2State, setGroup2State] = useState(Array(10).fill(null));
  const [group3State, setGroup3State] = useState(Array(10).fill(null));
  const [currentGroup, setCurrentGroup] = useState(Array(10).fill(null));

  useEffect(() => {
    const getResults = async () => {
      const data = await fetchPreviousResults();
      setResults(data);
      // parse results array into arrays of numbers and log it
      const parsed = Array.isArray(data?.results)
        ? data.results.map(item => ({
            ...item,
            parsed: parseResultString(item.result)
          }))
        : [];
      console.log("Previous Results (raw):", data?.results);
      console.log("Previous Results (parsed):", parsed);

  // Flatten all parsed number arrays and split into three groups of 10
  const flatNumbers = parsed.reduce((acc, it) => acc.concat(it.parsed || []), []);
  const group1 = flatNumbers.slice(0, 10);
  const group2 = flatNumbers.slice(10, 20);
  const group3 = flatNumbers.slice(20, 30);
  console.log("First 10 parsed numbers (group1):", group1);
  console.log("Next 10 parsed numbers (group2):", group2);
  console.log("Next 10 parsed numbers (group3):", group3);

  // store all groups into component state for rendering (use string values)
  setGroup1State(group1.map(n => (n !== undefined && n !== null) ? String(n) : null));
  setGroup2State(group2.map(n => (n !== undefined && n !== null) ? String(n) : null));
  setGroup3State(group3.map(n => (n !== undefined && n !== null) ? String(n) : null));
    };
    getResults();
  }, []);

  // Update currentGroup when selectedRange or group states change
  useEffect(() => {
    console.log("Selected Range in Result:", selectedRange);
    switch (selectedRange) {
      case '30-39':
        console.log("Displaying group2State");
        setCurrentGroup(group2State);
        break;
      case '50-59':
        console.log("Displaying group3State");
        setCurrentGroup(group3State);
        break;
      case '10-19':
      default:
        console.log("Displaying group1State (default)");
        setCurrentGroup(group1State);
        break;
    }
  }, [selectedRange, group1State, group2State, group3State]);

  return (
    <div className="kohinoor-container">
      <div className="kohinoor-title">Kohinoor</div>
      <div className="kohinoor-boxes">
        <div className="box red">{currentGroup[0] || '1085'} <span>2x</span></div>
        <div className="box blue">{currentGroup[1] || '1190'} <span>3x</span></div>
        <div className="box purple">{currentGroup[2] || '1251'} <span>1x</span></div>
        <div className="box green">{currentGroup[3] || '1339'} <span>1x</span></div>
        <div className="box violet">{currentGroup[4] || '1434'} <span>2x</span></div>
        <div className="box orange">{currentGroup[5] || '1502'} <span>3x</span></div>
        <div className="box darkpink">{currentGroup[6] || '1604'} <span>3x</span></div>
        <div className="box pink">{currentGroup[7] || '1765'} <span>2x</span></div>
        <div className="box teal">{currentGroup[8] || '1848'} <span>1x</span></div>
        <div className="box yellow">{currentGroup[9] || '1920'} <span>2x</span></div>
      </div>
      <div className="kohinoor-time">
        <span className="kohinoor-date">{timeData?.currentDate || new Date().toISOString().split('T')[0]}</span>
        <span className="kohinoor-time-small">{timeData?.currentTime?.replace(/:\d{2}(?=\s*(AM|PM|am|pm))/i, '') || "Loading..."}</span>
      </div>
 

      <style jsx ='true'>{`
        .kohinoor-container {
          display: flex;
          align-items: center;
          background: #000;
          padding: 0.3vw;
          color: white;
          font-family: Arial, sans-serif;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
          overflow: hidden;
        }
        .kohinoor-title {
          font-size: calc(2vw + 2px);
          font-weight: bold;
          margin-right: 0.5vw;
          flex-shrink: 0;
        }
        .kohinoor-boxes {
          display: flex;
          gap: 0.3vw;
          flex-wrap: nowrap;
          flex: 1;
          justify-content: space-between;
        }
        .box {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.3vw;
          padding: 0.2vw 0.4vw;
          border-radius: 0.3vw;
          font-weight: bold;
          font-size: calc(1.6vw + 2px);
          flex: 1;
          min-width: 0;
          height: 2.5vw;
          box-sizing: border-box;
        }
        .box span {
          background: black;
          color: red;
          border-radius: 0.3vw;
          font-size: calc(1vw + 2px);
          font-weight: bold;
          padding: 0.2vw 0.6vw;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 80%;
          margin: auto 0;
          text-shadow: 1px 1px 2px #181818ff, 0 0 1px #fff;
        }
        .red { background: #d32f2f; }
        .blue { background: #1976d2; }
        .purple { background: #8e24aa; }
        .green { background: #388e3c; }
        .violet { background: #5e35b1; }
        .orange { background: #f57c00; }
        .darkpink { background: #c2185b; }
        .pink { background: #ad1457; }
        .teal { background: #00796b; }
        .yellow { background: #fbc02d; }
        .kohinoor-time {
          font-size: calc(1.2vw + 2px);
          text-align: right;
          margin-left: 0.5vw;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        .kohinoor-date {
          display: block;
        }
        .kohinoor-time-small {
          display: block;
          line-height: 1.1;
          margin-top: -0.2vw;
        }

        /* Large tablets */
        @media (max-width: 1200px) {
          .kohinoor-title { font-size: calc(1.8vw + 2px); margin-right: 0.4vw; }
          .box { font-size: calc(1.4vw + 2px); height: 2.2vw; padding: 0.15vw 0.3vw; }
          .box span { font-size: calc(0.9vw + 2px); padding: 0.15vw 0.5vw; }
          .kohinoor-time { font-size: calc(1vw + 2px); margin-left: 0.4vw; }
          .kohinoor-boxes { gap: 0.25vw; }
        }

        /* Tablets */
        @media (max-width: 992px) {
          .kohinoor-title { font-size: calc(1.6vw + 2px); margin-right: 0.35vw; }
          .box { font-size: calc(1.3vw + 2px); height: 2vw; padding: 0.12vw 0.28vw; }
          .box span { font-size: calc(0.85vw + 2px); padding: 0.12vw 0.45vw; }
          .kohinoor-time { font-size: calc(0.9vw + 2px); margin-left: 0.35vw; }
          .kohinoor-boxes { gap: 0.22vw; }
        }

        /* Mobile large */
        @media (max-width: 768px) {
          .kohinoor-title { font-size: calc(2vw + 2px); margin-right: 0.3vw; }
          .box { font-size: calc(1.6vw + 2px); height: 3vw; padding: 0.15vw 0.35vw; }
          .box span { font-size: calc(1vw + 2px); padding: 0.15vw 0.4vw; }
          .kohinoor-time { font-size: calc(1.2vw + 2px); margin-left: 0.3vw; }
          .kohinoor-boxes { gap: 0.2vw; }
        }

        /* Mobile medium */
        @media (max-width: 576px) {
          .kohinoor-title { font-size: calc(2.2vw + 2px); margin-right: 0.25vw; }
          .box { font-size: calc(1.8vw + 2px); height: 3.2vw; padding: 0.15vw 0.3vw; }
          .box span { font-size: calc(1.1vw + 2px); padding: 0.12vw 0.35vw; }
          .kohinoor-time { font-size: calc(1.3vw + 2px); margin-left: 0.25vw; }
        }

        /* Mobile small */
        @media (max-width: 480px) {
          .kohinoor-title { font-size: calc(2.5vw + 2px); margin-right: 0.2vw; }
          .box { font-size: calc(2vw + 2px); height: 3.5vw; padding: 0.12vw 0.28vw; }
          .box span { font-size: calc(1.2vw + 2px); padding: 0.1vw 0.3vw; }
          .kohinoor-time { font-size: calc(1.4vw + 2px); margin-left: 0.2vw; }
        }

        /* Mobile extra small */
        @media (max-width: 360px) {
          .kohinoor-title { font-size: calc(2.8vw + 2px); margin-right: 0.2vw; }
          .box { font-size: calc(2.2vw + 2px); height: 3.8vw; padding: 0.1vw 0.25vw; }
          .box span { font-size: calc(1.3vw + 2px); padding: 0.1vw 0.25vw; }
          .kohinoor-time { font-size: calc(1.6vw + 2px); margin-left: 0.2vw; }
        }
      `}</style>
    </div>
  );
}
