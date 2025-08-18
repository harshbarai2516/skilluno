import React from "react";

export default function NumberGrid() {
  const columns = ["B0", 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const numbers = [];
  const blocks = Array.from({ length: 10 }, (_, i) => `F${i}`);

  for (let i = 0; i < 10; i++) {
    const row = [];
    for (let j = 0; j < 10; j++) {
      row.push(1000 + i * 10 + j);
    }
    numbers.push(row);
  }

  return (
    <div className="number-grid-container">
      <div className="grid-wrapper">
        {/* Header row */}
        <div className="grid-header" style={{ color: "#1565c0" }}>BLOCK</div>
        {columns.map((col) => (
          <div key={col} className="grid-header">{col}</div>
        ))}

        {/* Data rows */}
        {blocks.map((block, rowIdx) => (
          <React.Fragment key={block}>
            <div className="grid-cell">
              <div className="number-text">{block}</div>
              <div className="number-capsule"></div>
            </div>
            {numbers[rowIdx].map((num) => (
              <div key={num} className="grid-cell">
                <div className="number-text">{num}</div>
                <div className="number-capsule"></div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>

      <style jsx>{`
        .number-grid-container {
          width: 100%;
          height: 100%;
          padding: 1px;
          box-sizing: border-box;
          overflow: hidden;
          background: #f5f5f5;
        }

        .grid-wrapper {
          display: grid;
          grid-template-columns: repeat(${columns.length + 1}, minmax(0, 1fr));
          gap: 3px;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .grid-header {
          font-weight: bold;
          text-align: center;
          color: #000;
          font-size: calc(10px + 0.4vw);
          display: flex;
          align-items: center;
          justify-content: center;
          background: #e0e0e0;
          border-radius: 4px;
          padding: 3px;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .grid-cell {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          border-radius: 4px;
          overflow: hidden;
          padding: 2px;
        }

        .number-text {
          font-weight: bold;
          margin: 0;
          line-height: 1.2;
          font-size: calc(9px + 0.4vw);
          color: #000;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
          text-align: center;
        }

        .number-capsule {
          border-radius: 999px;
          border: 1.2px solid #6a1b9a;
          background-color: white;
          width: calc(24px + 1.5vw);
          height: calc(10px + 0.8vh);
          margin-top: 2px;
          min-width: 24px;
          min-height: 10px;
        }

        /* Large tablets and small laptops */
        @media (max-width: 1024px) {
          .grid-wrapper {
            gap: 2.5px;
          }
          .grid-header {
            font-size: calc(9px + 0.4vw);
          }
          .number-text {
            font-size: calc(8px + 0.4vw);
          }
          .number-capsule {
            width: calc(22px + 1.5vw);
            height: calc(9px + 0.8vh);
            min-width: 22px;
            min-height: 9px;
          }
        }

        /* Tablets */
        @media (max-width: 768px) {
          .grid-wrapper {
            gap: 2px;
          }
          .grid-header {
            font-size: calc(8px + 0.4vw);
            padding: 2px;
          }
          .number-text {
            font-size: calc(7px + 0.4vw);
          }
          .number-capsule {
            width: calc(20px + 1.5vw);
            height: calc(8px + 0.8vh);
            min-width: 20px;
            min-height: 8px;
            border-width: 1.1px;
          }
        }

        /* Large phones */
        @media (max-width: 600px) {
          .grid-header {
            font-size: calc(7px + 0.4vw);
          }
          .number-text {
            font-size: calc(6px + 0.4vw);
          }
          .number-capsule {
            width: calc(18px + 1.5vw);
            height: calc(7px + 0.8vh);
            min-width: 18px;
            min-height: 7px;
            margin-top: 1px;
          }
        }

        /* Medium phones */
        @media (max-width: 480px) {
          .grid-wrapper {
            gap: 1.5px;
          }
          .number-capsule {
            width: calc(16px + 1.5vw);
            height: calc(6px + 0.8vh);
            min-width: 16px;
            min-height: 6px;
            border-width: 1px;
          }
        }

        /* Small phones */
        @media (max-width: 400px) {
          .grid-header {
            font-size: calc(6px + 0.4vw);
          }
          .number-text {
            font-size: calc(5px + 0.4vw);
          }
          .number-capsule {
            width: calc(14px + 1.5vw);
            height: calc(5px + 0.8vh);
            min-width: 14px;
            min-height: 5px;
          }
        }

        /* Extra small phones */
        @media (max-width: 320px) {
          .grid-wrapper {
            gap: 1px;
          }
          .number-capsule {
            width: calc(12px + 1.5vw);
            height: calc(4px + 0.8vh);
            min-width: 12px;
            min-height: 4px;
          }
        }

        /* Landscape orientation */
        @media (max-height: 500px) and (orientation: landscape) {
          .grid-header {
            font-size: calc(6px + 0.4vh);
          }
          .number-text {
            font-size: calc(5px + 0.4vh);
          }
          .number-capsule {
            height: calc(6px + 0.5vh);
            min-height: 6px;
          }
        }

        /* High contrast mode */
        @media (forced-colors: active) {
          .grid-header {
            background: ButtonFace;
            color: ButtonText;
          }
          .grid-cell {
            background: Canvas;
            color: CanvasText;
          }
          .number-capsule {
            border-color: ButtonText;
            background: Canvas;
          }
        }
      `}</style>
    </div>
  );
}