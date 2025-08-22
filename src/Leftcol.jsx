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

  return (
    <div className="left-col-container">
      <div className="range-list">
        {ranges.map((range) => (
          <label
            key={range}
            className={`range-item ${selected === range ? "selected" : ""}`}
          >
            <input
              type="checkbox"
              checked={selected === range}
              onChange={() => setSelected(range)}
              className="range-checkbox"
            />
            <span className="range-text">{range}</span>
          </label>
        ))}
      </div>

      <style jsx="true">{`
        .left-col-container {
          width: 100%;
          height: 100%;
          background: #fff8dc;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          overflow: hidden;
          padding: 1px 0;
        }

        .range-list {
          display: grid;
          grid-template-rows: repeat(${ranges.length}, 1fr);
          width: 100%;
          height: 100%;
          gap: 3px;
          overflow: hidden;
        }

        .range-item {
          display: flex;
          align-items: center;
          background: linear-gradient(90deg, #ffeb8a 0%, #ffd700 100%);
          border: 1px solid #e6c200;
          border-radius: 4px;
          color: #333;
          cursor: pointer;
          transition: all 0.2s ease;
          overflow: hidden;
          padding: 0 6px;
        }

        .range-item:hover {
          transform: scale(1.01);
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .range-item.selected {
          background: linear-gradient(90deg, #ffe066 0%, #ffcc00 100%);
          border-color: #ffbf00;
          box-shadow: 0 0 0 2px rgba(255,215,0,0.5);
        }

        .range-checkbox {
          width: 14px;
          height: 14px;
          margin-right: 6px;
          accent-color: #ffcc00;
          cursor: pointer;
          flex-shrink: 0;
        }

        .range-text {
          font-weight: bold;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: calc(11px + 0.3vw);
          text-align: center;
          width: 100%;
        }

        /* Tablet and small desktop */
        @media (max-width: 1024px) {
          .range-list {
            gap: 2.5px;
          }
          .range-checkbox {
            width: 18px;
            height: 18px;
            margin-right: 6px;
            accent-color: #ffcc00;
            cursor: pointer;
            flex-shrink: 0;
          }
        }

        /* Mobile landscape */
        @media (max-width: 768px) and (orientation: landscape) {
          .range-list {
            gap: 2px;
          }
          .range-item {
            padding: 0 4px;
          }
          .range-checkbox {
            width: 12px;
            height: 12px;
            margin-right: 4px;
          }
          .range-text {
            font-size: calc(8px + 0.3vw);
          }
        }

        /* Mobile portrait */
        @media (max-width: 768px) and (orientation: portrait) {
          .range-list {
            gap: 2px;
          }
          .range-checkbox {
            width: 12px;
            height: 12px;
            margin-right: 4px;
          }
          .range-text {
            font-size: calc(8px + 0.3vw);
          }
        }

        /* Small mobile devices */
        @media (max-width: 480px) {
          .range-list {
            gap: 1.5px;
          }
          .range-item {
            padding: 0 3px;
            border-radius: 3px;
          }
          .range-checkbox {
            width: 11px;
            height: 11px;
            margin-right: 3px;
          }
          .range-text {
            font-size: calc(6px + 0.3vw);
          }
        }

        /* Extra small mobile devices */
        @media (max-width: 360px) {
          .range-list {
            gap: 1px;
          }
          .range-item {
            padding: 0 2px;
          }
          .range-checkbox {
            width: 10px;
            height: 10px;
            margin-right: 2px;
          }
          .range-text {
            font-size: calc(5.5px + 0.3vw);
          }
        }

        /* High contrast mode support */
        @media (forced-colors: active) {
          .range-item {
            forced-color-adjust: none;
            border-color: ButtonText;
          }
          .range-item.selected {
            background: Highlight;
            color: HighlightText;
          }
          .range-checkbox {
            forced-color-adjust: none;
          }
        }
      `}</style>
    </div>
  );
}