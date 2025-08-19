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
          font-size: calc(10px + 0.4vw);
          display: flex;
          align-items: center;
          justify-content: center;
          background: #e0e0e0;
          border-radius: 4px;
          padding: 0;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .grid-cell {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-evenly; /* Better vertical distribution */
          background: #ffffff;
          border-radius: 4px;
          overflow: hidden;
          padding: 0;
          min-height: 0; /* Allows proper flex distribution */
        }

        .number-text {
          font-weight: bold;
          margin: 0;
          line-height: 1.1; /* Tighter line height */
          font-size: calc(9px + 0.4vw);
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
          border: 1.2px solid #6a1b9a;
          background-color: white;
          width: calc(38.5px + 1.65vw); /* 10% wider */
          height: calc(14.7px + 0.945vh); /* 5% taller */
          min-width: 26.4px; /* 10% wider */
          min-height: 11.55px; /* 5% taller */
          flex-shrink: 0;
          margin-top: 0;
        }

        /* Large tablets and small laptops */
        @media (max-width: 1024px) {
          .grid-wrapper {
            gap: 0;
          }
          .grid-header {
            font-size: calc(9px + 0.4vw);
          }
          .number-text {
            font-size: calc(8px + 0.4vw);
          }
          .number-capsule {
            width: calc(25.3px + 1.65vw); /* 10% wider */
            height: calc(12.6px + 0.945vh); /* 5% taller */
            min-width: 24.2px; /* 10% wider */
            min-height: 10.5px; /* 5% taller */
          }
        }

        /* Tablets */
        @media (max-width: 768px) {
          .grid-wrapper {
            gap: 0;
          }
          .grid-header {
            font-size: calc(8px + 0.4vw);
            padding: 0;
          }
          .number-text {
            font-size: calc(7px + 0.4vw);
            line-height: 1;
          }
          .number-capsule {
            width: calc(22px + 1.65vw); /* 10% wider */
            height: calc(9.45px + 0.945vh); /* 5% taller */
            min-width: 22px; /* 10% wider */
            min-height: 9.45px; /* 5% taller */
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
            width: calc(19.8px + 1.65vw); /* 10% wider */
            height: calc(8.4px + 0.945vh); /* 5% taller */
            min-width: 19.8px; /* 10% wider */
            min-height: 8.4px; /* 5% taller */
          }
        }

        /* Medium phones */
        @media (max-width: 480px) {
          .grid-wrapper {
            gap: 0;
          }
          .number-capsule {
            width: calc(17.6px + 1.65vw); /* 10% wider */
            height: calc(12.35px + 0.945vh); /* 5% taller */
            min-width: 17.6px; /* 10% wider */
            min-height: 7.35px; /* 5% taller */
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
            width: calc(15.4px + 1.65vw); /* 10% wider */
            height: calc(6.3px + 0.945vh); /* 5% taller */
            min-width: 15.4px; /* 10% wider */
            min-height: 6.3px; /* 5% taller */
          }
        }

        /* Extra small phones */
        @media (max-width: 320px) {
          .grid-wrapper {
            gap: 0;
          }
          .number-capsule {
            width: calc(13.2px + 1.65vw); /* 10% wider */
            height: calc(5.25px + 0.945vh); /* 5% taller */
            min-width: 13.2px; /* 10% wider */
            min-height: 5.25px; /* 5% taller */
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
            height: calc(6px + 0.6vh);
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