import React from "react";
import { motion } from "framer-motion";

export default function BetBoard({ values }) {
   values = { A: "A2", B: "B6", C: "C4", J: "N" }

  return (
    <div className="bet-board">
      <div className="cards-row">
        {/* A */}
        <motion.div
          className="card"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="label a">A</div>
          <div className="value">{values.A}</div>
        </motion.div>

        {/* B */}
        <motion.div
          className="card"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="label b">B</div>
          <div className="value">{values.B}</div>
        </motion.div>

        {/* C */}
        <motion.div
          className="card"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="label c">C</div>
          <div className="value">{values.C}</div>
        </motion.div>

        {/* Jackpot */}
        <motion.div
          className="card"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="label jackpot">Jackpot</div>
          <div className="value">{values.J}</div>
        </motion.div>
      </div>

      {/* Bottom row */}
      <div className="mirror-row">
        <span>{values.A}</span>
        <span>{values.B}</span>
        <span>{values.C}</span>
        <span>{values.J}</span>
      </div>

      {/* Action bar */}
      <div className="action-bar">Place Bet Please</div>

      <style jsx='true'>{`
        .bet-board {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          max-width: 800px;
          margin: auto;
          font-family: Arial, sans-serif;
        }

        .cards-row {
          display: flex;
          justify-content: center;
          gap: 1em;
          width: 100%;
        }

        .card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          background: #f5f5f5;
          border: 2px solid #ddd;
          border-radius: 0.5em;
          padding: 0.5em 1em;
          min-width: 70px;
          min-height: 100px;
          position: relative;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          flex-shrink: 1;
        }

        .label {
          position: absolute;
          top: -20px;
          background: orange;
          padding: 0.2em 0.6em;
          border-radius: 0.4em 0.4em 0 0;
          font-weight: bold;
          font-size: 0.9em;
          color: #000;
        }

        .label.a { background: #ffcc00; }
        .label.b { background: #ff9933; }
        .label.c { background: #ff6600; }
        .label.jackpot { background: #cc0000; color: #fff; }

        .value {
          font-size: 1.5em;
          font-weight: bold;
          color: #b22222;
          margin-top: 0.6em;
        }

        .mirror-row {
          display: flex;
          justify-content: space-evenly;
          width: 100%;
          font-weight: bold;
          color: green;
          margin: 0.8em 0;
          font-size: 1.4em;
        }

        .action-bar {
          background: linear-gradient(to right, #9acd32, #32cd32);
          width: 100%;
          text-align: center;
          padding: 0.6em 0;
          color: #000;
          font-weight: bold;
          border-radius: 0.3em;
          font-size: 1.2em;
        }

        /* ✅ Tablets */
        @media (max-width: 1024px) {
          .value { font-size: 1.3em; }
          .mirror-row { font-size: 1.2em; }
          .action-bar { font-size: 1.1em; }
        }

        /* ✅ Large phones */
        @media (max-width: 768px) {
          .cards-row { gap: 0.6em; }
          .card { min-width: 60px; min-height: 90px; }
          .value { font-size: 1.2em; }
          .mirror-row { font-size: 1.1em; }
          .action-bar { font-size: 1em; }
        }

        /* ✅ Small phones */
        @media (max-width: 480px) {
          .cards-row { gap: 0.4em; }
          .card { min-width: 50px; min-height: 80px; padding: 0.4em; }
          .label { font-size: 0.7em; }
          .value { font-size: 1em; }
          .mirror-row { font-size: 1em; }
          .action-bar { font-size: 0.9em; }
        }

        /* ✅ Extra small phones */
        @media (max-width: 360px) {
          .card { min-width: 45px; min-height: 70px; }
          .label { font-size: 0.6em; }
          .value { font-size: 0.9em; }
          .mirror-row { font-size: 0.9em; }
          .action-bar { font-size: 0.8em; }
        }
      `}</style>
    </div>
  );
}
