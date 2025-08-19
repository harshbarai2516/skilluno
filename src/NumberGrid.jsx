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
        <div className="grid-header">BLOCK</div>
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
          max-height: 100%;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          overflow-y: hidden;
          background: #f5f5f5;
        }

        .grid-wrapper {
          display: grid;
          grid-template-columns: repeat(${columns.length + 1}, minmax(0, 1fr));
          width: 100%;
          height: 100%;
          max-height: 100%;
          gap: 0;
          overflow-y: hidden;
        }

        .grid-header {
          font-weight: bold;
          text-align: center;
          color: #000 !important;
          font-size: calc(12px + 0.5vw);
          display: flex;
          align-items: center;
          justify-content: center;
          background: #e0e0e0;
          border-radius: 4px;
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
          min-height: 0;
          max-height: 100%;
          flex-shrink: 1;
        }

        .number-text {
          font-weight: bold;
          line-height: 1;
          font-size: calc(11px + 0.5vw);
          color: #000 !important;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
          text-align: center;
          margin: 0px;
        }

        .number-capsule {
          border-radius: 999px;
          border: 1.5px solid #6a1b9a;
          background-color: white;
          width: calc(50px + 2vw);
          height: calc(14px + 0.9vw);
          min-width: 30px;
          min-height: 10px;
          flex-shrink: 0;
        }

        /* Desktop */
        @media (min-width: 1367px) {
          .number-text { font-size: calc(13px + 0.5vw); }
          .number-capsule { width: calc(60px + 2vw); height: calc(20px + 1vw); }
        }

        /* Laptops */
        @media (max-width: 1366px) {
          .number-text { font-size: calc(10px + 0.5vw); }
          .number-capsule { width: calc(45px + 2vw); height: calc(17px + 0.9vw); }
        }

        /* Large tablets */
        @media (max-width: 1024px) {
          .grid-header { font-size: calc(10px + 0.5vw); }
          .number-text { font-size: calc(9px + 0.5vw); }
          .number-capsule { width: calc(40px + 2vw); height: calc(15px + 0.9vw); }
        }

        /* Tablets */
        @media (max-width: 768px) {
          .grid-header { font-size: calc(9px + 0.5vw); }
          .number-text { font-size: calc(8px + 0.5vw); }
          .number-capsule { width: calc(35px + 2vw); height: calc(13px + 0.9vw); border-width: 1.3px; }
        }

        /* Large phones */
        @media (max-width: 600px) {
          .grid-header { font-size: calc(8px + 0.5vw); }
          .number-text { font-size: calc(7px + 0.5vw); }
          .number-capsule { width: calc(38px + 2vw); height: calc(11px + 0.9vw); }
        }

        /* Medium phones */
        @media (max-width: 480px) {
          .grid-header { font-size: calc(7px + 0.5vw); }
          .number-text { font-size: calc(6px + 0.5vw); }
          .number-capsule { width: calc(28px + 2vw); height: calc(9px + 0.9vw); border-width: 1.1px; }
        }

        /* Small phones */
        @media (max-width: 400px) {
          .grid-header { font-size: calc(6px + 0.5vw); }
          .number-text { font-size: calc(5px + 0.5vw); }
          .number-capsule { width: calc(22px + 2vw); height: calc(7px + 0.9vw); }
        }

        /* Landscape */
        @media (max-height: 500px) and (orientation: landscape) {
          .grid-header { font-size: calc(7px + 0.5vh); }
          .number-text { font-size: calc(6px + 0.5vh); }
          .number-capsule { width: calc(25px + 2vh); height: calc(9px + 0.9vh); }
        }

        /* High contrast */
        @media (forced-colors: active) {
          .grid-header { background: ButtonFace; color: #000 !important; }
          .grid-cell { background: Canvas; color: #000 !important; }
          .number-capsule { border-color: #000; background: Canvas; }
        }
      `}</style>
    </div>
  );
}
