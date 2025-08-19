import React from "react";

export default function Result() {
  return (
    <div className="kohinoor-container">
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
          padding: 0.3vw;
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
          padding: 0.2vw 0.4vw;
          border-radius: 0.3vw;
          font-weight: bold;
          font-size: 1.6vw;
          flex: 1;
          min-width: 0;
          height: 2.5vw;
          box-sizing: border-box;
        }
        .box span {
          background: black;
          color: red;
          border-radius: 0.3vw;
          font-size: 1vw;
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

        /* Large tablets */
        @media (max-width: 1200px) {
          .kohinoor-title { font-size: 1.8vw; margin-right: 0.4vw; }
          .box { font-size: 1.4vw; height: 2.2vw; padding: 0.15vw 0.3vw; }
          .box span { font-size: 0.9vw; padding: 0.15vw 0.5vw; }
          .kohinoor-time { font-size: 1vw; margin-left: 0.4vw; }
          .kohinoor-boxes { gap: 0.25vw; }
        }

        /* Tablets */
        @media (max-width: 992px) {
          .kohinoor-title { font-size: 1.6vw; margin-right: 0.35vw; }
          .box { font-size: 1.3vw; height: 2vw; padding: 0.12vw 0.28vw; }
          .box span { font-size: 0.85vw; padding: 0.12vw 0.45vw; }
          .kohinoor-time { font-size: 0.9vw; margin-left: 0.35vw; }
          .kohinoor-boxes { gap: 0.22vw; }
        }

        /* Mobile large */
        @media (max-width: 768px) {
          .kohinoor-title { font-size: 2vw; margin-right: 0.3vw; }
          .box { font-size: 1.6vw; height: 3vw; padding: 0.15vw 0.35vw; }
          .box span { font-size: 1vw; padding: 0.15vw 0.4vw; }
          .kohinoor-time { font-size: 1.2vw; margin-left: 0.3vw; }
          .kohinoor-boxes { gap: 0.2vw; }
        }

        /* Mobile medium */
        @media (max-width: 576px) {
          .kohinoor-title { font-size: 2.2vw; margin-right: 0.25vw; }
          .box { font-size: 1.8vw; height: 3.2vw; padding: 0.15vw 0.3vw; }
          .box span { font-size: 1.1vw; padding: 0.12vw 0.35vw; }
          .kohinoor-time { font-size: 1.3vw; margin-left: 0.25vw; }
        }

        /* Mobile small */
        @media (max-width: 480px) {
          .kohinoor-title { font-size: 2.5vw; margin-right: 0.2vw; }
          .box { font-size: 2vw; height: 3.5vw; padding: 0.12vw 0.28vw; }
          .box span { font-size: 1.2vw; padding: 0.1vw 0.3vw; }
          .kohinoor-time { font-size: 1.4vw; margin-left: 0.2vw; }
        }

        /* Mobile extra small */
        @media (max-width: 360px) {
          .kohinoor-title { font-size: 2.8vw; margin-right: 0.2vw; }
          .box { font-size: 2.2vw; height: 3.8vw; padding: 0.1vw 0.25vw; }
          .box span { font-size: 1.3vw; padding: 0.1vw 0.25vw; }
          .kohinoor-time { font-size: 1.6vw; margin-left: 0.2vw; }
        }
      `}</style>
    </div>
  );
}
