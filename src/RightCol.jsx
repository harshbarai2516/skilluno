import React from "react";

export default function RightCol() {
  const rows = 10;

  return (
    <>
      <style>{`
        .qty-wrapper {
          display: flex;
          flex: 1;
          width: 100%;
          height: 100%;
          justify-content: center;
          align-items: stretch; /* stretch children vertically */
          box-sizing: border-box;
          padding: 0.1rem;
        }

        .qty-table {
          display: flex;
          flex-direction: row;
          width: 100%;
          height: 100%;
          gap: clamp(4px, 0.6vw, 12px);
        }

        .qty-col {
          display: flex;
          flex-direction: column;
          flex: 1;
          height: 100%;
          gap: clamp(4px, 0.6vw, 12px);
        }

        /* Header takes same height as NumberGrid header */
        .qty-header {
          background-color: #1a2d5a;
          color: #fff;
          font-weight: bold;
          font-size: clamp(9px, 1vw, 14px);
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 1fr; /* fixed ratio */
          height: clamp(20px, 3.2vh, 34px);
        }

        /* Each row fills remaining space equally */
        .qty-rows-wrapper {
          display: flex;
          flex-direction: column;
          flex: 1; /* take all remaining height after header */
          gap: clamp(4px, 0.6vw, 12px);
        }

        .qty-row {
          background-color: #f7e9b1;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: clamp(8px, 0.9vw, 13px);
          font-weight: bold;
          color: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1; /* each row equal height */
        }

        /* Mobile landscape adjustments */
        @media (max-width: 599px) {
          .qty-table {
            gap: 4px;
          }
          .qty-col {
            gap: 4px;
          }
          .qty-rows-wrapper {
            gap: 4px;
          }
        }
      `}</style>

      <div className="qty-wrapper">
        <div className="qty-table">
          {/* Quantity column */}
          <div className="qty-col">
            <div className="qty-header">Quantity</div>
            <div className="qty-rows-wrapper">
              {Array(rows).fill(0).map((_, idx) => (
                <div key={idx} className="qty-row">0</div>
              ))}
            </div>
          </div>

          {/* Amount column */}
          <div className="qty-col">
            <div className="qty-header">Amount</div>
            <div className="qty-rows-wrapper">
              {Array(rows).fill(0).map((_, idx) => (
                <div key={idx} className="qty-row">0</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
