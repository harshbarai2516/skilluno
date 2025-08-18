import React, { useState } from "react";

export default function Leftcol() {
  const ranges = [
    "All",
    "1000-1099", "1100-1199", "1200-1299",
    "1300-1399", "1400-1499", "1500-1599",
    "1600-1699", "1700-1799", "1800-1899",
    "1900-1999"
  ];
  const [selected, setSelected] = useState("1000-1099");

  const checkboxStyle = {
    width: '40px', // doubled from 20px
    height: '24px', // doubled from 12px
    marginRight: '2px'
  };

  const labelStyle = {
    fontSize: '1.3em', // Increase font size for labels
    fontWeight: 'bold',
    marginLeft: '4px',
    color: '#222',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  };

  return (
    <>
      <style>{`
        .range-wrapper {
          display: flex;
          flex: 1;
          width: 100%;
          height: 100%;
          justify-content: center;
          align-items: center;
          background: #fff8dc;
          box-sizing: border-box;
        }

        .range-container {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
          justify-content: stretch;
          align-items: center;
          padding: 0;
          box-sizing: border-box;
          overflow: hidden;
        }

        .range-list {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
          justify-content: stretch;
          align-items: center;
          gap: 0.1rem;
          overflow: hidden;
          box-sizing: border-box;
        }

        .range-item {
          flex: 1;
          background: linear-gradient(90deg, #ffeb8a 0%, #ffd700 100%);
          border: 1px solid #e6c200;
          border-radius: 3px;
          font-size: clamp(8px, 1vw, 12px);
          font-weight: bold;
          color: #333;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          width: 100%;
          box-sizing: border-box;
          transition: box-shadow 0.2s, transform 0.1s;
          text-align: center;
          padding: 0;
          margin: 0;
        }

        .range-item:hover {
          transform: scale(1.02);
        }

        .range-item.selected {
          background: linear-gradient(90deg, #ffe066 0%, #ffcc00 100%);
          border-color: #ffbf00;
          box-shadow: 0 2px 8px rgba(255,215,0,0.2);
        }

        .range-item input {
          margin-right: 2px;
          accent-color: #ffd700;
          transform: scale(0.7);
        }

        /* Mobile - Fix overflow and sizing */
        @media (max-width: 767px) {
          .range-wrapper {
            width: 100% !important;
            max-width: 100% !important;
            overflow: hidden !important;
            box-sizing: border-box !important;
          }
          .range-container {
            width: 100% !important;
            max-width: 100% !important;
            padding: 0 !important;
            overflow: hidden !important;
            box-sizing: border-box !important;
          }
          .range-list {
            gap: 0.05rem !important;
            width: 100% !important;
            max-width: 100% !important;
            overflow: hidden !important;
            box-sizing: border-box !important;
          }
          .range-item {
            font-size: clamp(6px, 1.2vw, 9px) !important;
            padding: 0 !important;
            min-height: clamp(12px, 2.5vw, 16px) !important;
            width: 100% !important;
            max-width: 100% !important;
            overflow: hidden !important;
            white-space: nowrap !important;
            text-overflow: ellipsis !important;
            box-sizing: border-box !important;
            border-radius: 2px !important;
          }
          .range-item input {
            transform: scale(0.5) !important;
            margin-right: 1px !important;
          }
        }

        /* Extra-small mobile fix */
        @media (max-width: 400px) {
          .range-item {
            font-size: clamp(5px, 2vw, 8px) !important;
            padding: 0 !important;
          }
          .range-item input {
            transform: scale(0.4) !important;
          }
        }
      `}</style>

      <div className="range-wrapper">
        <div className="range-container">
          <div className="range-list">
            {ranges.map((range) => (
              <label
                key={range}
                className={`range-item ${selected === range ? "selected" : ""}`}
                onClick={() => setSelected(range)}
              >
                <input
                  type="checkbox"
                  checked={selected === range}
                  onChange={() => setSelected(range)}
                  style={{ pointerEvents: "none", ...checkboxStyle }}
                />
                <span style={{ flex: 1, textAlign: "center", ...labelStyle }}>{range}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
