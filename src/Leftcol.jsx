import React, { useState, useEffect } from "react";

export default function Leftcol({ selectedRange }) {
  const [ranges, setRanges] = useState([]);
  const [selectedRangeState, setSelectedRange] = useState("10-19");
  

  useEffect(() => {
    if (selectedRange === "10-19") {
      setRanges([
        "1000-1099",
        "1100-1199",
        "1200-1299",
        "1300-1399",
        "1400-1499",
        "1500-1599",
        "1600-1699",
        "1700-1799",
        "1800-1899",
        "1900-1999",
      ]);
    } else if (selectedRange === "30-39") {
      setRanges([
        "3000-3099",
        "3100-3199",
        "3200-3299",
        "3300-3399",
        "3400-3499",
        "3500-3599",
        "3600-3699",
        "3700-3799",
        "3800-3899",
        "3900-3999",
      ]);
    } else if (selectedRange === "50-59") {
      setRanges([
        "5000-5099",
        "5100-5199",
        "5200-5299",
        "5300-5399",
        "5400-5499",
        "5500-5599",
        "5600-5699",
        "5700-5799",
        "5800-5899",
        "5900-5999",
      ]);
    }
  }, [selectedRange]);

  return (
    <div className="left-col-container">
      <div className="range-list">
        <div className="range-item">
          <input type="checkbox" className="range-checkbox" />
          <span className="range-text">All</span>
        </div>
        {ranges.map((range) => (
          <div
            key={range}
            className={`range-item ${
              selectedRangeState === range ? "selected" : ""
            }`}
            onClick={() => {
              setSelectedRange(range);
              console.log(`Range selected: ${range}`);
            }}
          >
            <input type="checkbox" className="range-checkbox" />
            <span className="range-text">{range}</span>
          </div>
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
          grid-template-rows: repeat(${ranges.length + 1}, 1fr);
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
          color: #f2f0f0ff;
          background: linear-gradient(90deg, #e1e118ff 0%, #f3c01bff 100%);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .range-item.selected {
          background: red;
          color: white;
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