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

      <style jsx ='true'>{`
        :root {
          --gap-main: clamp(6px, 1vw, 12px);
          --pad-box: clamp(4px, 0.6vw, 10px) clamp(10px, 1vw, 16px);
          --font-box: clamp(23px, 0.6vw + 8px, 15px);
          --font-center: clamp(25px, 0.5vw + 9px, 16px);
          --font-radio: clamp(25px, 0.5vw + 8px, 14px);
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
            flex-basis: clamp(156px, 26.4%, 288px); /* Increase by 20% */
          }
        }

        @media (max-width: 980px) {
          :root {
            --font-radio: clamp(12.4px, 1.44vw, 12px); /* Increase by 20% */
            --font-center: clamp(12.6px, 1.68vw, 13.2px); /* Increase by 20% */
            --font-box: clamp(20.6px, 1.56vw, 13.2px); /* Increase by 20% */
          }
        }

        @media (max-width: 820px) {
          .nav-left {
            flex-basis: clamp(144px, 31.2%, 264px); /* Increase by 20% */
          }
          .nav-right {
            flex-basis: clamp(168px, 31.2%, 312px); /* Increase by 20% */
          }
        }

        @media (max-width: 680px) {
          :root {
            --font-radio: clamp(8.4px, 1.44vw, 12px); /* Increase by 20% */
            --font-center: clamp(9.6px, 1.68vw, 13.2px); /* Increase by 20% */
            --font-box: clamp(9.6px, 1.56vw, 13.2px); /* Increase by 20% */
          }
        }

        @media (max-width: 560px) {
          :root {
            --gap-main: clamp(4.8px, 0.96vw, 9.6px); /* Increase by 20% */
          }
        }

        @media (max-width: 440px) {
          :root {
            --font-radio: clamp(9.6px, 2.88vw, 13.2px); /* Increase by 20% */
            --font-center: clamp(12px, 3.12vw, 14.4px); /* Increase by 20% */
            --font-box: clamp(10.8px, 2.76vw, 14.4px); /* Increase by 20% */
          }
        }

        @media (max-height: 500px) and (orientation: landscape) {
          :root {
            --font-box: clamp(9.6px, 0.96vw, 14.4px); /* Increase by 20% */
            --font-center: clamp(10.8px, 1.08vw, 15.6px); /* Increase by 20% */
            --font-radio: clamp(8.4px, 0.84vw, 13.2px); /* Increase by 20% */
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