import React from "react";

export default function Navbar() {
  return (
    <div className="navbar">
      {/* Left section */}
      <div className="nav-left">
        <div className="input-box" title="Name">
          Name | user_16
        </div>
      </div>

      {/* Center section (must always be ONE line) */}
      <div className="nav-center" aria-label="bet-controls">
        <span className="amusement-text">For Amusement Only</span>
        <div className="radio-buttons">
          <label><input type="radio" name="bet" defaultChecked />10</label>
          <label><input type="radio" name="bet" />20</label>
          <label><input type="radio" name="bet" />50</label>
          <label><input type="radio" name="bet" />100</label>
          <label><input type="radio" name="bet" />500</label>
          <label><input type="radio" name="bet" />1000</label>
        </div>
      </div>

      {/* Right section */}
      <div className="nav-right">
        <div className="balance-box" title="Balance">
          Balance | ₹9,86,655.0
        </div>
        <button className="close-btn" aria-label="Close">×</button>
      </div>

      <style jsx>{`
        :root {
          --gap-main: clamp(6px, 1vw, 12px);
          --pad-box: clamp(4px, 0.6vw, 10px) clamp(10px, 1vw, 16px);
          --font-box: clamp(10px, 0.6vw + 8px, 15px);
          --font-center: clamp(10px, 0.5vw + 9px, 16px);
          --font-radio: clamp(9px, 0.5vw + 8px, 14px);
          --btn-size: clamp(22px, 2.2vh, 28px);
        }

        .navbar {
          display: flex;
          align-items: stretch; /* Ensure children stretch to fill height */
          justify-content: space-between; /* Maintain spacing between items */
          width: 100%;
          height: 100%; /* Take full height of parent */
          background: #111;
          color: #fff;
          padding: 0 var(--gap-main);
          gap: var(--gap-main);
          box-sizing: border-box;
          overflow: hidden;
          font-family: Arial, sans-serif;
        }

        /* Shared row behavior */
        .nav-left, .nav-center, .nav-right {
          display: flex;
          align-items: center;
          gap: var(--gap-main);
          min-width: 0;
          white-space: nowrap;
          height: 100%; /* Ensure child elements stretch to fill the height */
        }

        /* Reserve predictable slices */
        .nav-left {
          flex: 0 1 clamp(140px, 22%, 280px);
        }
        .nav-right {
          flex: 0 1 clamp(160px, 24%, 320px);
          justify-content: flex-end;
        }
        .nav-center {
          flex: 1 1 auto;
          justify-content: center;
          overflow: hidden;
        }

        .input-box, .balance-box {
          background: #333;
          padding: var(--pad-box);
          border: 1px solid #666;
          border-radius: 0.35em;
          font-size: var(--font-box);
          line-height: 1;
          color: #ddd;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }

        .amusement-text {
          color: #ffe600;
          font-weight: 700;
          font-size: var(--font-center);
          letter-spacing: 0.2px;
          margin-right: clamp(6px, 1vw, 16px);
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .radio-buttons {
          display: flex;
          align-items: center;
          gap: clamp(4px, 0.7vw, 10px);
          flex-wrap: nowrap;
          overflow: hidden;
          min-width: 0;
        }
        .radio-buttons label {
          display: flex;
          align-items: center;
          gap: 0.25em;
          font-size: var(--font-radio);
          line-height: 1;
          min-width: 0;
        }
        .radio-buttons input[type="radio"] {
          accent-color: #00aaff;
          transform: scale(0.95);
          flex-shrink: 0;
        }

        .close-btn {
          width: var(--btn-size);
          height: var(--btn-size);
          min-width: var(--btn-size);
          min-height: var(--btn-size);
          border-radius: 50%;
          border: none;
          background: #ffcc00;
          color: #111;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: clamp(12px, 1.4vh, 16px);
          cursor: pointer;
        }

        /* ===================== Responsive Tweaks ===================== */
        @media (max-width: 1024px) {
          .nav-left, .nav-right {
            justify-content: center;
          }
          .nav-left { flex-basis: clamp(130px, 24%, 240px); }
          .nav-right { flex-basis: clamp(150px, 26%, 280px); }
          .radio-buttons input[type="radio"] { transform: scale(0.9); }
        }

        @media (max-width: 820px) {
          .nav-left, .nav-right {
            justify-content: center;
          }
          .nav-left { flex-basis: clamp(120px, 26%, 220px); }
          .nav-right { flex-basis: clamp(140px, 26%, 260px); }
          .amusement-text { letter-spacing: 0; }
          .radio-buttons { gap: clamp(3px, 0.6vw, 8px); }
          .radio-buttons input[type="radio"] { transform: scale(0.85); }
        }

        @media (max-width: 680px) {
          .nav-left, .nav-right {
            justify-content: center;
          }
          :root {
            --font-radio: clamp(7px, 1.2vw, 10px);
            --font-center: clamp(8px, 1.4vw, 11px);
            --font-box: clamp(8px, 1.3vw, 11px);
          }
          .nav-left {
            flex-basis: clamp(90px, 24%, 160px);
          }
          .nav-right {
            flex-basis: clamp(110px, 24%, 180px);
          }
          .radio-buttons {
            gap: clamp(2px, 0.4vw, 5px);
          }
          .radio-buttons input[type="radio"] {
            transform: scale(0.7);
          }
        }

        @media (max-width: 560px) {
          .nav-left, .nav-right {
            justify-content: center;
          }
          :root { --gap-main: clamp(4px, 0.8vw, 8px); }
          .nav-left { flex-basis: clamp(100px, 30%, 180px); }
          .nav-right { flex-basis: clamp(120px, 30%, 200px); }
          .radio-buttons { gap: clamp(2px, 0.5vw, 6px); }
          .radio-buttons input[type="radio"] { transform: scale(0.75); }
        }

        @media (max-width: 440px) {
          .nav-left, .nav-right {
            justify-content: center;
          }
          :root { --font-radio: clamp(8px, 2.4vw, 11px); --font-center: clamp(10px, 2.6vw, 12px); --font-box: clamp(9px, 2.3vw, 12px); }
          .nav-left { flex-basis: clamp(92px, 30%, 160px); }
          .nav-right { flex-basis: clamp(108px, 32%, 170px); }
          .radio-buttons input[type="radio"] { transform: scale(0.7); }
        }

        @media (max-width: 360px) {
          .nav-left, .nav-right {
            justify-content: center;
          }
          :root { --gap-main: 4px; }
          .radio-buttons { gap: 2px; }
          .radio-buttons input[type="radio"] { transform: scale(0.65); }
        }

        /* Extra small devices */
        @media (max-width: 320px) {
          .amusement-text {
            display: none; /* Hide on very small screens */
          }
        }

        /* Landscape mode optimization */
        @media (max-height: 500px) and (orientation: landscape) {
          :root {
            --font-box: clamp(8px, 0.8vw, 12px);
            --font-center: clamp(9px, 0.9vw, 13px);
            --font-radio: clamp(7px, 0.7vw, 11px);
          }
        }

        @media (max-width: 1024px), (max-width: 820px), (max-width: 680px), (max-width: 560px), (max-width: 440px), (max-width: 360px) {
          .navbar {
            align-items: stretch; /* Ensure children stretch to fill height */
            justify-content: space-between; /* Maintain spacing between items */
          }
        }
      `}</style>
    </div>
  );
}