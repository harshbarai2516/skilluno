import React from "react";

export default function BetPanel() {
  const bets = [
    { num: "122", type: "BOX", amt: "10" },
    { num: "122", type: "STR", amt: "10" },
    { num: "12", type: "SP", amt: "10" },
    { num: "12", type: "FP", amt: "10" },
    { num: "22", type: "BP", amt: "10" },
    { num: "12", type: "AP", amt: "10" },
  ];

  return (
    <div className="bet-panel">
      {/* Top controls */}
      <div className="bet-controls">
        <div className="bet-options">
          {["ALL", "BOX", "STR", "SP", "FP", "BP", "AP"].map((label, i) => (
            <label key={i} className="option">
              <input type="checkbox" defaultChecked /> {label}
            </label>
          ))}
        </div>
        <input type="text" placeholder="ADD NUMBER" className="add-number" />
      </div>

      {/* Bet Cards */}
      <div className="bet-cards">
        {bets.map((b, i) => (
          <div className="bet-card" key={i}>
            <div className="num">{b.num}</div>
            <div className="type">{b.type}</div>
            <div className="amt">{b.amt}</div>
            <div className="remove">X</div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .bet-panel {
          display: flex;
          flex-direction: column;
          width: 100%;
          background: #fff;
          border: 2px solid #b7410e;
          border-radius: 0.4em;
          overflow: hidden;
          box-sizing: border-box;
        }

        /* Top bar */
        .bet-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(180deg, #ff5722, #d84315);
          padding: 0.4em 0.6em;
          flex-wrap: nowrap;
          gap: 0.4em; /* ✅ enforced */
        }

        .bet-options {
          display: flex;
          flex-wrap: nowrap;
          gap: 0.4em;
          font-weight: bold;
          color: #fff;
          flex: 1 1 auto;
          min-width: 0;
          overflow: hidden;
        }

        .option {
          display: flex;
          align-items: center;
          font-size: calc(0.5vw + 8px);
          gap: 0.2em;
          white-space: nowrap;
        }

        .option input[type="checkbox"] {
          transform: scale(1);
          flex-shrink: 0;
        }

        .add-number {
          flex: 0 0 clamp(120px, 20%, 200px); /* ✅ reserved clean space */
          min-width: 0;
          padding: 0.3em 0.6em;
          border-radius: 0.3em;
          border: none;
          outline: none;
          font-size: calc(0.5vw + 8px);
        }

        /* Cards row */
        .bet-cards {
          display: flex;
          flex-wrap: nowrap;
          gap: 0.5em;
          padding: 0.6em;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .bet-cards::-webkit-scrollbar {
          display: none;
        }

        .bet-card {
          flex: 0 1 auto;
          min-width: 60px;
          padding: 0.4em;
          background: #fff;
          border: 2px solid #4caf50;
          border-radius: 0.3em;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: calc(0.5vw + 8px);
        }

        .num { font-weight: bold; }
        .type { color: #333; font-size: calc(0.4vw + 7px); }
        .amt { color: #000; }
        .remove { color: red; font-weight: bold; cursor: pointer; }

        /* ✅ Responsive tuning */
        @media (max-width: 1024px) {
          .option { font-size: calc(0.6vw + 7px); gap: 0.18em; }
          .option input[type="checkbox"] { transform: scale(0.9); }
          .add-number { flex: 0 0 clamp(110px, 22%, 180px); }
        }

        @media (max-width: 768px) {
          .option { font-size: calc(0.8vw + 7px); gap: 0.15em; }
          .option input[type="checkbox"] { transform: scale(0.8); }
          .add-number { flex: 0 0 clamp(100px, 25%, 160px); }
        }

        @media (max-width: 600px) {
          .option { font-size: calc(1vw + 6px); gap: 0.12em; }
          .option input[type="checkbox"] { transform: scale(0.75); }
          .add-number { flex: 0 0 clamp(90px, 28%, 150px); }
        }

        @media (max-width: 480px) {
          .option { font-size: calc(1vw + 5px); gap: 0.1em; }
          .option input[type="checkbox"] { transform: scale(0.7); }
          .add-number { flex: 0 0 clamp(85px, 30%, 140px); }
        }

        @media (max-width: 360px) {
          .option { font-size: calc(1vw + 4px); gap: 0.08em; }
          .option input[type="checkbox"] { transform: scale(0.65); }
          .add-number { flex: 0 0 clamp(80px, 32%, 130px); }
        }
      `}</style>
    </div>
  );
}
 