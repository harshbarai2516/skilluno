import React from "react";

export default function RightCol() {
  const rows = 10;
  const columns = [
    { title: "Quantity", color: "#1a2d5a" },
    { title: "Amount", color: "#1a5a3a" }
  ];

  return (
    <div className="right-col-container">
      <div className="qty-grid">
        {columns.map((col) => (
          <div key={col.title} className="qty-column">
            <div 
              className="qty-header"
              style={{ backgroundColor: col.color }}
            >
              {col.title}
            </div>
            <div className="qty-rows">
              {Array(rows).fill(0).map((_, idx) => (
                <div key={idx} className="qty-cell">
                  0
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .right-col-container {
          width: 100%;
          height: 100%;
          background: #f5f5f5;
          display: flex;
          box-sizing: border-box;
          overflow: hidden;
          padding: 1px;
        }

        .qty-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          width: 100%;
          height: 100%;
          gap: 3px;
          overflow: hidden;
        }

        .qty-column {
          display: flex;
          flex-direction: column;
          height: 100%;
          gap: 3px;
        }

        .qty-header {
          color: white;
          font-weight: bold;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: calc(8px + 0.3vw);
          height: calc(20px + 0.5vh);
          flex-shrink: 0;
        }

        .qty-rows {
          display: grid;
          grid-template-rows: repeat(${rows}, 1fr);
          height: 100%;
          gap: 3px;
          overflow: hidden;
        }

        .qty-cell {
          background-color: #f7e9b1;
          border: 1px solid #e0d5a4;
          border-radius: 3px;
          font-size: calc(7px + 0.3vw);
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        /* Tablet and small desktop */
        @media (max-width: 1024px) {
          .qty-grid, .qty-column, .qty-rows {
            gap: 2.5px;
          }
          .qty-header {
            font-size: calc(7px + 0.3vw);
          }
          .qty-cell {
            font-size: calc(6px + 0.3vw);
          }
        }

        /* Mobile landscape */
        @media (max-width: 768px) and (orientation: landscape) {
          .qty-grid, .qty-column, .qty-rows {
            gap: 2px;
          }
          .qty-header {
            height: calc(18px + 0.5vh);
            font-size: calc(6px + 0.3vw);
          }
          .qty-cell {
            font-size: calc(5px + 0.3vw);
            border-radius: 2px;
          }
        }

        /* Mobile portrait */
        @media (max-width: 768px) and (orientation: portrait) {
          .qty-grid, .qty-column, .qty-rows {
            gap: 2px;
          }
          .qty-header {
            font-size: calc(6px + 0.3vw);
          }
          .qty-cell {
            font-size: calc(5px + 0.3vw);
          }
        }

        /* Small mobile devices */
        @media (max-width: 480px) {
          .qty-grid, .qty-column, .qty-rows {
            gap: 1.5px;
          }
          .qty-header {
            font-size: calc(5px + 0.3vw);
            height: calc(16px + 0.5vh);
          }
          .qty-cell {
            font-size: calc(4px + 0.3vw);
          }
        }

        /* Extra small mobile devices */
        @media (max-width: 360px) {
          .qty-grid, .qty-column, .qty-rows {
            gap: 1px;
          }
          .qty-header {
            font-size: calc(4px + 0.3vw);
          }
          .qty-cell {
            font-size: calc(3px + 0.3vw);
          }
        }

        /* High contrast mode support */
        @media (forced-colors: active) {
          .qty-header {
            forced-color-adjust: none;
            background-color: ButtonText !important;
            color: ButtonFace !important;
          }
          .qty-cell {
            forced-color-adjust: none;
            background-color: Canvas;
            color: CanvasText;
            border-color: ButtonText;
          }
        }
      `}</style>
    </div>
  );
}