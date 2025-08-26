import React from "react";

const UpperRow = () => {
  const [usernameLocal, setUsernameLocal] = React.useState("");
  React.useEffect(() => {
    const storedUsername = localStorage.getItem("balance");
    if (storedUsername) {
      setUsernameLocal(storedUsername); 
    }
  }, []);



  return (
    <div className="upper-row-container">
      <div className="upper-row-flex">
        {/* Time Boxes */}
        <div className="info-box">
          <span className="info-label">CT:</span>
          <span className="info-value">10:35:02</span>
        </div>
        <div className="info-box">
          <span className="info-label">CS:</span>
          <span className="info-value">10:45 am</span>
        </div>
        <div className="info-box">
          <span className="info-value highlight">09:58</span>
          <span className="info-suffix">RT</span>
        </div>
        <div className="info-box">
          <span className="info-value">17080</span>
          <span className="info-suffix">PT</span>
        </div>

        {/* Action Buttons */}
        <div className="action-btn green">RESULT (F1)</div>
        <div className="action-btn green">ACCOUNT(F2)</div>
        <div className="action-btn green">REPRINT (F3)</div>
        <div className="action-btn green">CANCEL (F4)</div>
        <div className="action-btn green">REFRESH (F5)</div>

        {/* Bonus Box */}
        <div className="bonus-box">
          <span className="bonus-label">Global<br/> Bonus:</span>
          <span className="bonus-value">{usernameLocal}</span>
        </div>
      </div>

      <style jsx="true">{`
        .upper-row-container {
          width: 100%;
          height: 100%;
          padding: 2px;
          box-sizing: border-box;
          overflow: hidden;
          background: #f5f5f5;
        }

        .upper-row-flex {
          display: flex;
          flex-wrap: nowrap;
          align-items: stretch;
          width: 100%;
          height: 100%;
          overflow: hidden;
          gap: 4px;
        }

        /* Common Box Styles */
        .info-box, .action-btn, .bonus-box {
          flex: 1 1 auto;
          background: #ffd900;
          border-radius: 16px;
          padding: 0 4px;
          font-weight: bold;
          color: #000;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          box-sizing: border-box;
          min-width: 0;
          border: 1px solid #0e0d0d;
        }

        /* Info Box Specific */
        .info-box {
          flex-grow: 0.8;
        }

        .info-label {
          background: #000;
          color: #fff;
          font-weight: 800;
          border-radius: 8px;
          padding: 1px 3px;
          margin-right: 3px;
          font-size: calc(10px + 0.3vw);
          flex-shrink: 0;
        }

        .info-value {
          font-size: calc(12px + 0.4vw);
          font-weight: 800;
          flex-shrink: 0;
        }

        .info-value.highlight {
          font-weight: 900;
        }

        .info-suffix {
          font-size: calc(10px + 0.3vw);
          font-weight: 700;
          margin-left: 3px;
          color: #0c0c0c;
          flex-shrink: 0;
        }

        /* Action Buttons */
        .action-btn {
          background: #a6ff4d;
          cursor: pointer;
          transition: all 0.2s;
          flex-grow: 1;
          font-size: calc(12px + 0.4vw);
          font-weight: 800;
        }

        .action-btn:hover {
          filter: brightness(1.05);
        }

        /* Bonus Box */
        .bonus-box {
          flex-grow: 1.2;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: #ffd900;
        }

        .bonus-label {
          font-weight: 800;
          font-size: calc(10px + 0.3vw);
          flex-shrink: 0;
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .bonus-value {
          background: #fff;
          color: #ff0000;
          padding: 1px 5px;
          border-radius: 8px;
          border: 1px solid #000;
          font-size: calc(12px + 0.3vw);
          min-width: 25px;
          text-align: center;
          flex-shrink: 0;
          font-weight: 800;
        }

        /* Desktop only: Increase Global Bonus size */
        @media (min-width: 992px) {
          .bonus-label {
            font-size: calc(16px + 0.7vw);
            font-weight: 900;
          }
          .bonus-value {
            font-size: calc(18px + 0.8vw);
            min-width: 35px;
            padding: 2px 10px;
            font-weight: 900;
          }
        }

        /* Responsive Adjustments */
        @media (max-width: 1440px) {
          .info-label, .bonus-label {
            font-size: calc(9px + 0.2vw);
            font-weight: 800;
          }
          .info-value {
            font-size: calc(10px + 0.3vw);
            font-weight: 800;
          }
        }

        @media (max-width: 1200px) {
          .bonus-label {
            display: inline-block;
            font-size: calc(10px + 0.2vw);
            font-weight: 800;
          }
          .bonus-value {
            font-size: calc(12px + 0.3vw);
            font-weight: 800;
          }
          .info-label {
            font-size: calc(9px + 0.2vw);
            font-weight: 800;
          }
          .info-value {
            font-size: calc(10px + 0.3vw);
            font-weight: 800;
          }
          .info-suffix {
            font-size: calc(9px + 0.2vw);
            font-weight: 700;
          }
          .action-btn {
            font-size: calc(10px + 0.3vw);
            font-weight: 800;
          }
        }

        @media (max-width: 992px) {
          .info-suffix {
            margin-left: 2px;
            font-size: calc(8px + 0.2vw);
            font-weight: 700;
          }
          .action-btn {
            font-size: calc(8px + 0.3vw);
            font-weight: 800;
          }
          .info-label, .bonus-label {
            font-size: calc(8px + 0.2vw);
            font-weight: 800;
          }
          .info-value {
            font-size: calc(9px + 0.3vw);
            font-weight: 800;
          }
        }

        @media (max-width: 768px) {
          .info-box, .action-btn {
            font-size: calc(6px + 0.22vw);
            font-weight: 700;
          }
          .bonus-label {
            font-size: calc(5.5px + 0.08vw);
            font-weight: 800;
          }
          .bonus-value {
            font-size: calc(4px + 0.15vw);
            font-weight: 800;
          }
          .info-label {
            font-size: calc(5px + 0.15vw);
            font-weight: 800;
          }
          .info-value {
            font-size: calc(6.5px + 0.22vw);
            font-weight: 800;
          }
          .info-suffix {
            font-size: calc(6px + 0.15vw);
            font-weight: 700;
          }
        }

        @media (max-width: 576px) {
          .info-label {
            display: none;
          }
          .info-value, .action-btn {
            font-size: calc(5px + 0.3vw);
            font-weight: 800;
          }
          .bonus-value {
            min-width: 20px;
            font-size: calc(7px + 0.2vw);
            font-weight: 800;
          }
          .bonus-label {
            font-size: calc(5px + 0.2vw);
            font-weight: 800;
          }
        }

        @media (max-width: 480px) {
          .info-suffix {
            margin-left: 1px;
            font-size: calc(6px + 0.2vw);
            font-weight: 700;
          }
        }

        /* Landscape orientation */
        @media (orientation: landscape) and (max-height: 500px) {
          .info-box, .action-btn {
            font-size: calc(7px + 0.3vh);
            font-weight: 800;
          }
        }

        /* High contrast mode */
        @media (forced-colors: active) {
          .info-box, .action-btn, .bonus-box {
            forced-color-adjust: none;
            border-color: ButtonText;
          }
          .info-label {
            background: ButtonText;
            color: ButtonFace;
          }
          .action-btn.green {
            background: Highlight;
            color: HighlightText;
          }
        }
      `}</style>
    </div>
  );
};

export default UpperRow;