import React from "react";

export default function Result() {
  return (
    <div className="kohinoor-container" style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      <div className="kohinoor-title">Kohinoor</div>
      <div className="kohinoor-boxes">
        <div className="box red">1085 <span>2x</span></div>
        <div className="box blue">1190 <span>3x</span></div>
        <div className="box purple">1251 <span>1x</span></div>
        <div className="box green">1339 <span>1x</span></div>
        <div className="box violet">1434 <span>2x</span></div>
        <div className="box orange">1502 <span>3x</span></div>
        <div className="box darkpink">1604 <span>3x</span></div>
        <div className="box pink">1765 <span>2x</span></div>
        <div className="box teal">1848 <span>1x</span></div>
        <div className="box yellow">1920 <span>2x</span></div>
      </div>
      <div className="kohinoor-time">
        2023-02-01<br />04:30 pm
      </div>

      <style>{`
        .kohinoor-container {
          display: flex;
          align-items: center;
          background: #000;
          padding: 4px;
          color: white;
          font-family: Arial, sans-serif;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
          overflow: hidden;
        }
        .kohinoor-title {
          font-size: 2vw;
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
          padding: 0;
          border-radius: 0.3vw;
          font-weight: bold;
          font-size: 2.2vw;
          flex: 1;
          min-width: 0;
          height: 2.8vw;
        }
        .box span {
          background: black;
          color: red;
          border-radius: 0.3vw;
          font-size: 1.5vw;
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
          font-size: 1.2vw;
          text-align: right;
          margin-left: 0.5vw;
          flex-shrink: 0;
        }

        /* Tablet/Small Desktop View */
        @media (max-width: 999px) {
          .kohinoor-container {
            width: 100% !important;
            max-width: 100% !important;
            overflow: hidden !important;
            padding: 1px !important;
          }
          .kohinoor-title {
            font-size: 1.9vw !important;
            margin-right: 0.4vw !important;
          }
          .kohinoor-boxes {
            gap: 0.22vw !important;
            overflow: hidden !important;
          }
          .box {
            font-size: 1.2vw !important;
            padding: 0.04vw 0.12vw !important;
            height: 1.5vw !important;
            min-width: 0 !important;
          }
          .box span {
            font-size: 1vw !important;
            padding: 0.04vw 0.18vw !important;
            height: 65% !important;
            min-width: 1.5vw !important;
          }
          .kohinoor-time {
            font-size: 0.7vw !important;
            margin-left: 0.4vw !important;
          }
        }

        /* 📱 Mobile View Only */
        @media (max-width: 768px) {
          .kohinoor-container {
            width: 100% !important;
            max-width: 100% !important;
            overflow: hidden !important;
            padding: 2px !important;
          }
          .kohinoor-title {
            font-size: 2.4vw !important;
            margin-right: 0.3vw !important;
          }
          .kohinoor-boxes {
            gap: 0.15vw !important;
            overflow: hidden !important;
          }
          .box {
            font-size: 2.2vw !important; /* smaller text */
            padding: 0.05vw 0.15vw !important;
            height: 4.2vw !important; /* smaller height */
            min-width: 0 !important;
          }
          .box span {
            font-size: 0.9vw !important; /* smaller multiplier */
            padding: 0.05vw 0.2vw !important; /* proportional padding */
            height: 55% !important;
            min-width: 1.8vw !important;
          }
          .kohinoor-time {
            font-size: 1.6vw !important;
            margin-left: 0.3vw !important;
          }
        }
      `}</style>
    </div>
  );
}
