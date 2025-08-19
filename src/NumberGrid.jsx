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
          padding: 0;
          box-sizing: border-box;
          overflow: hidden;
          background: #f5f5f5;
        }

        .grid-wrapper {
          display: grid;
          grid-template-columns: repeat(${columns.length + 1}, minmax(0, 1fr));
          gap: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .grid-header {
          font-weight: bold;
          text-align: center;
          color: #000;
          font-size: calc(12px + 0.5vw);
          display: flex;
          align-items: center;
          justify-content: center;
          background: #e0e0e0;
          border-radius: 4px;
          padding: 2px 0;
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
          padding: 2px 0;
          min-height: 0;
        }

        .number-text {
          font-weight: bold;
          margin: 0 0 3px 0;
          line-height: 1;
          font-size: calc(11px + 0.5vw);
          color: #000;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
          text-align: center;
          flex-shrink: 1;
        }

        .number-capsule {
          border-radius: 999px;
          border: 1.5px solid #6a1b9a;
          background-color: white;
          width: calc(50px + 2vw);
          height: calc(15px + 1vw);
          min-width: 30px;
          min-height: 12px;
          flex-shrink: 0;
          margin-top: 0;
        }

        /* Large desktop */
        @media (min-width: 1600px) {
          .number-text {
            font-size: calc(13px + 0.5vw);
            margin-bottom: 4px;
          }
          .number-capsule {
            width: calc(60px + 2vw);
            height: calc(20px + 1vw);
          }
        }

        /* Laptops */
        @media (max-width: 1366px) {
          .number-text {
            font-size: calc(10px + 0.5vw);
            margin-bottom: 3px;
          }
          .number-capsule {
            width: calc(45px + 2vw);
            height: calc(18px + 1vw);
          }
        }

        /* Large tablets and small laptops */
        @media (max-width: 1024px) {
          .grid-header {
            font-size: calc(10px + 0.5vw);
          }
          .number-text {
            font-size: calc(9px + 0.5vw);
            margin-bottom: 3px;
          }
          .number-capsule {
            width: calc(40px + 2vw);
            height: calc(16px + 1vw);
          }
        }

        /* Tablets */
        @media (max-width: 768px) {
          .grid-header {
            font-size: calc(9px + 0.5vw);
          }
          .number-text {
            font-size: calc(8px + 0.5vw);
            margin-bottom: 2.5px;
          }
          .number-capsule {
            width: calc(35px + 2vw);
            height: calc(14px + 1vw);
            border-width: 1.3px;
          }
        }

        /* Large phones */
        @media (max-width: 600px) {
          .grid-header {
            font-size: calc(8px + 0.5vw);
          }
          .number-text {
            font-size: calc(7px + 0.5vw);
            margin-bottom: 2px;
          }
          .number-capsule {
            width: calc(38px + 2vw);
            height: calc(12px + 1vw);
          }
        }

        /* Medium phones */
        @media (max-width: 480px) {
          .grid-header {
            font-size: calc(7px + 0.5vw);
          }
          .number-text {
            font-size: calc(6px + 0.5vw);
            margin-bottom: 1.5px;
          }
          .number-capsule {
            width: calc(28px + 2vw);
            height: calc(10px + 1vw);
            border-width: 1.1px;
          }
        }

        /* Small phones */
        @media (max-width: 400px) {
          .grid-header {
            font-size: calc(6px + 0.5vw);
          }
          .number-text {
            font-size: calc(5px + 0.5vw);
            margin-bottom: 1px;
          }
          .number-capsule {
            width: calc(22px + 2vw);
            height: calc(8px + 1vw);
          }
        }

        /* Landscape orientation */
        @media (max-height: 500px) and (orientation: landscape) {
          .grid-header {
            font-size: calc(7px + 0.5vh);
          }
          .number-text {
            font-size: calc(6px + 0.5vh);
            margin-bottom: 1px;
          }
          .number-capsule {
            width: calc(25px + 2vh);
            height: calc(10px + 1vh);
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