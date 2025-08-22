import React from "react";

export default function GameInfoPanel() {
  return (
    <div className="game-info">
      {/* Left clock */}
      <div className="clock">06:25</div>

      {/* Right info */}
      <div className="info-boxes">
        <div className="info-row">
          <div className="info-box blue">Play | 900</div>
          <div className="info-box blue">10:10:00 AM</div>
        </div>
        <div className="info-row">
          <div className="info-box green">Win | 0</div>
          <div className="info-box blue">PC4L4HDCAH1F</div>
        </div>
      </div>

      <style jsx>{`
        .game-info {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.4em;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          padding: 0.4em;       /* ✅ reduced */
          margin: 0;            /* ✅ removed margin */
          flex-shrink: 1;       /* ✅ allow shrinking */
          max-height: 100%;     /* ✅ stay within parent */
          overflow: hidden;
        }

        /* Clock */
        .clock {
          display: flex;
          align-items: center; /* Center content vertically */
          justify-content: center; /* Center content horizontally */
          background: #111;
          color: #32cd32;
          font-family: "Courier New", monospace;
          font-size: calc(1vw + 14px);
          font-weight: bold;
          padding: 0.3em 0.6em;
          border: 2px solid #ccc;
          border-radius: 0.4em;
          box-shadow: inset 0 0 8px #000;
          width: 30%; /* Increase width by 15% */
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Info section */
        .info-boxes {
          display: flex;
          flex-direction: column;
          gap: 0.4em;
          flex: 1 1 auto;
          min-width: 0;
          max-height: 100%;
          overflow: hidden;
        }

        .info-row {
          display: flex;
          gap: 0.4em;
          width: 100%;
          min-width: 0;
        }

        .info-box {
          flex: 1 1 0;
          text-align: center;
          padding: 0.3em;
          font-size: calc(0.5vw + 8px);
          font-weight: bold;
          border-radius: 0.4em;
          color: #fff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 80%; /* Reduce button width by 20% */
        }

        .blue {
          background: linear-gradient(180deg, #2196f3, #0d47a1);
        }

        .green {
          background: linear-gradient(180deg, #4caf50, #1b5e20);
        }

        /* ✅ Responsive Queries */
        @media (max-width: 1024px) {
          .clock { font-size: calc(1.1vw + 12px); max-width: 30%; }
          .info-box { font-size: calc(0.6vw + 7px); padding: 0.25em; max-width: 70%; }
        }

        @media (max-width: 768px) {
          .clock { font-size: calc(1.2vw + 11px); max-width: 30%; }
          .info-box { font-size: calc(0.7vw + 6px); padding: 0.24em; max-width: 70%; }
        }

        @media (max-width: 680px) {
          .clock { font-size: calc(1.3vw + 10px); max-width: 30%; }
          .info-box { font-size: calc(0.7vw + 5px); padding: 0.22em; max-width: 70%; }
        }

        @media (max-width: 480px) {
          .clock { font-size: calc(1.4vw + 9px); max-width: 30%; }
          .info-box { font-size: calc(0.8vw + 5px); padding: 0.2em; max-width: 70%; }
        }

        @media (max-width: 360px) {
          .clock { font-size: calc(1.5vw + 8px); max-width: 12%; }
          .info-box { font-size: calc(0.7vw + 4px); padding: 0.18em; max-width: 70%; }
        }
      `}</style>
    </div>
  );
}
