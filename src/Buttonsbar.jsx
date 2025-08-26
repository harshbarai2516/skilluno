import React from "react";

export default function ButtonsBar() {
  return (
    <div className="button-bar">
      <button className="btn btn-report">Report</button>
      <button className="btn btn-advance">Advance</button>
      <button className="btn btn-clear">Clear</button>
      <button className="btn btn-print">Print</button>

      <style jsx='true'>{`
        .button-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1vw;
          padding: 1vh 1vw;
          width: 100%;
          box-sizing: border-box;
        }

        .btn {
          flex: 1 1 auto; /* allow shrinking and growing */
          min-width: 0; /* prevents overflow */
          text-align: center;
          padding: 0.62em; /* Reduced height */
          font-size: calc(0.8vw + 10px);
          font-weight: bold;
          color: #fff;
          border: none;
          border-radius: 0.5em;
          cursor: pointer;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
          transition: transform 0.2s ease, opacity 0.2s ease;
          width: 80%; /* Use 80% of parent width */
        }

        .btn:hover {
          transform: scale(1.03);
          opacity: 0.9;
        }

        .btn-report {
          background: linear-gradient(180deg, #ff7a00, #e65100);
        }

        .btn-advance {
          background: linear-gradient(180deg, #007bff, #004080);
        }

        .btn-clear {
          background: linear-gradient(180deg, #ff5722, #b71c1c);
        }

        .btn-print {
          background: linear-gradient(180deg, #4caf50, #1b5e20);
        }

        /* Tablets */
        @media (max-width: 1024px) {
          .btn {
            font-size: calc(1vw + 9px);
            padding: 0.25em; /* Reduced height */
          }
        }

          @media (max-width: 999px) {
          .btn {
            font-size: calc(1vw + 9px);
            padding: 0.15em; /* Reduced height */
          }
        }

        /* Large phones */
        @media (max-width: 768px) {
          .btn {
            font-size: calc(1.2vw + 8px);
            padding: 0.12em; /* Reduced height */
          }
        }

        /* Medium phones */
        @media (max-width: 600px) {
          .btn {
            font-size: calc(1.4vw + 7px);
            padding: 0.12em; /* Reduced height */
          }
        }

        /* Small phones */
        @media (max-width: 480px) {
          .btn {
            font-size: calc(1.6vw + 6px);
            padding: 0.4em; /* Reduced height */
          }
        }

        /* Extra small phones */
        @media (max-width: 360px) {
          .btn {
            font-size: calc(1.8vw + 5px);
            padding: 0.35em; /* Reduced height */
          }
        }
      `}</style>
    </div>
  );
}
