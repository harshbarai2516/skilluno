import React from "react";

export default function NumberGrid({ selectedRangeState }) {
  const columns = ["B0", 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const numbers = [];
  const blocks = Array.from({ length: 10 }, (_, i) => `F${i}`);

  if (selectedRangeState) {
    const [start, end] = selectedRangeState.split("-").map(Number);
    for (let i = 0; i < 10; i++) {
      const row = [];
      for (let j = 0; j < 10; j++) {
        const num = start + i * 10 + j;
        if (num <= end) {
          row.push(num);
        }
      }
      numbers.push(row);
    }
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
            {numbers[rowIdx] && numbers[rowIdx].map((num) => (
              <div key={num} className="grid-cell">
                <div className="number-text">{num}</div>
                <div className="number-capsule">
                  <input
                    type="number"
                    className="capsule-input"
                    placeholder=""
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.target.blur(); // Remove focus on Enter
                      }
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      fontWeight: "bold",
                      border: "none",
                      outline: "none",
                      textAlign: "center",
                      background: "transparent",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 0,
                    }}
                  />
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>

      <style jsx='true'>{`
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
          font-weight: 800;
          text-align: center;
          color: #000 !important;
          font-size: calc(13px + 0.5vw); /* desktop default */
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
          font-weight: 800;
          line-height: 1;
          font-size: calc(13px + 0.5vw); /* desktop default */
          color: #000 !important;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
          text-align: center;
          margin: 0;
        }

        .number-capsule {
          border-radius: 999px;
          border: 1.5px solid #6a1b9a;
          background-color: white;
          width: calc(60px + 2vw);   /* desktop default */
          height: calc(20px + 1vw);  /* desktop default */
          min-width: 30px;
          min-height: 10px;
          flex-shrink: 0;
          justify-content: center;
          align-items: center;
        }

        /* Laptops */
        @media (max-width: 1366px) {
          .number-text { font-size: calc(10px + 0.5vw); }
          .number-capsule { width: calc(45px + 2vw); height: calc(17px + 0.9vw); }
        }

        /* Large desktop */
        @media (min-width: 1600px) {
          .number-text {
            font-size: calc(17px + 0.5vw);
            margin-bottom: 4px;
          }
          .number-capsule {
            width: calc(40px + 1vw);
            height: calc(15px + 0.5vw);
          }
        }

        /* Desktop/Laptops */
        @media (min-width: 1025px) and (max-width: 1599px) {
          .number-capsule {
            width: calc(36px + 1vw);
            height: calc(15px + 0.5vw);
          }
        }
          .grid-header { font-size: calc(7px + 0.5vw); font-weight: 800; }
          .number-text { font-size: calc(8px + 0.5vw); font-weight: 800; }
          .number-capsule { width: calc(28px + 2vw); height: calc(9px + 0.9vw); border-width: 1.1px; }
        }

        /* Small phones */
        @media (max-width: 400px) {
          .grid-header { font-size: calc(6px + 0.5vw); font-weight: 800; }
          .number-text { font-size: calc(5px + 0.5vw); font-weight: 800; }
          .number-capsule { width: calc(22px + 2vw); height: calc(7px + 0.9vw); }
        }

        /* Landscape */
        @media (max-height: 500px) and (orientation: landscape) {
          .grid-header { font-size: calc(7px + 0.5vh); font-weight: 800; }
          .number-text { font-size: calc(6px + 0.5vh); font-weight: 800; }
          .number-capsule { width: calc(25px + 2vh); height: calc(9px + 0.9vh); }
        }

        /* High contrast */
        @media (forced-colors: active) {
          .grid-header { background: ButtonFace; color: #000 !important; font-weight: 800; }
          .grid-cell { background: Canvas; color: #000 !important; }
          .number-text { font-weight: 800; }
          .number-capsule { border-color: #000; background: Canvas; }
        }

        .capsule-input {
          font-size: 1rem; /* Default font size */
        }

        @media (max-width: 1200px) {
          .capsule-input {
            font-size: 0.9rem;
          }
        }

        @media (max-width: 992px) {
          .capsule-input {
            font-size: 0.6rem;
          }
        }

        @media (max-width: 768px) {
          .capsule-input {
            font-size: 0.5rem;
          }
        }

        @media (max-width: 576px) {
          .capsule-input {
            font-size: 0.5rem;
          }
        }

        @media (max-width: 400px) {
          .capsule-input {
            font-size: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}
