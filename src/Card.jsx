import React from "react";

export default function Card() {

  const [previousResult, setPreviousResult] = React.useState(null);

  const fetchPreviousResult = async() => {
    try {
      const response = await fetch('https://api.goldbazar.co.in/api/results/3dPreviousResult');
      const data = await response.json();
      console.log('Previous Result:', data);
      setPreviousResult(data);
    } catch (error) {
      console.error('Error fetching previous result:', error);
    }
  }

  React.useEffect(() => {
    fetchPreviousResult();
  }, [previousResult]);

  return (
    <div className="card-row">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="card">
          <div className="card-time">9:40:00 AM</div>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1em'}}>
          <div className="card-letters" >
            <span className="letter a">A</span>
            <span className="letter b">B</span>
            <span className="letter c">C</span>
          </div>

          {/* You had three number rows – keeping them, styled identically */}
          <div className="card-numbers" >
            <span>1</span>
            <span>8</span>
            <span>7</span>
          </div>
          <div className="card-numbers" >
            <span>1</span>
            <span>8</span>
            <span>7</span>
          </div>
          <div className="card-numbers" >
            <span>1</span>
            <span>8</span>
            <span>7</span>
          </div>
          </div>
          <div className="card-footer">N</div>
        </div>
      ))}

      <style jsx='true'>{`
        /* ===== Row (parent) ===== */
        .card-row {
          display: flex;
          flex-wrap: nowrap;
          justify-content: space-between;
          align-items: stretch;
          gap: 0.6em;
          width: 100%;
          height: 100%;         /* fill its parent */
          min-height: 0;        /* allow children to shrink vertically */
          padding: 0.6em;       /* trimmed to avoid vertical overflow */
          box-sizing: border-box;
          overflow: hidden;     /* no scrollbars from rounding issues */
        }

        /* ===== Card ===== */
        .card {
          flex: 1 1 0;          /* equal widths, allow shrink */
          min-width: 0;         /* prevent horizontal overflow */
          height: 100%;          /* ✅ use 90% of row height across all sizes */
          max-height: 100%;
          box-sizing: border-box;

          background: linear-gradient(180deg, #deaaaaff, #dcdcdc);
          border-radius: 0.5em;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between; /* stable vertical distribution */
          padding: 0.35em 0.4em;
        }

        /* ===== Time bar (never cut) ===== */
        .card-time {
          font-weight: bold;
          font-size: calc(0.6vw + 8px); /* Default font size */
          margin-bottom: 0.2em;
          white-space: nowrap; /* Ensure text stays in one line */
          overflow: hidden; /* Prevent overflow */
          text-overflow: ellipsis; /* Add ellipsis if text overflows */
          background-color: #121111ff; /* Add a different background color */
          width: 100%; /* Ensure it occupies the full width of the card */
          text-align: center; /* Center the text */
          margin: 0; /* Remove any extra margin */
          padding: 0.2em; /* Add slight padding for better appearance */
        }

        /* Adjustments for smaller screens */
        @media (max-width: 1024px) {
          .card-time {
            font-size: calc(0.6vw + 8.4px); /* Increase by 20% */
          }
        }

        @media (max-width: 999px) {
          .card-time {
            font-size: calc(0.36vw + 8.4px); /* Increase by 20% */
          }
        }

        @media (max-width: 768px) {
          .card-time {
            font-size: calc(0.36vw + 7.2px); /* Increase by 20% */
          }
        }

        @media (max-width: 480px) {
          .card-time {
            font-size: calc(0.36vw + 6px); /* Increase by 20% */
          }
        }

        @media (max-width: 360px) {
          .card-time {
            font-size: calc(0.24vw + 4.8px); /* Increase by 20% */
          }
        }

        /* Rows (letters & numbers) */
        .card-letters,
        .card-numbers {
          font-size: clamp(10.8px, 0.96vw + 6px, 19.2px); /* Increase by 20% */
        }

        .card-footer {
          font-size: clamp(10.8px, 0.96vw + 6px, 19.2px); /* Increase by 20% */
        }

        /* ===== Rows (letters & numbers) ===== */
        .card-letters,
        .card-numbers {
          display: flex;
          flex-direction: column;
          gap: 0.45em;
          align-items: center;
          justify-content: center;
          white-space: nowrap;
          color: #000;
          font-weight: 700;
          line-height: 1.1;
          font-size: clamp(9px, 0.8vw + 5px, 16px);
        }

        .letter.a { color: #e67e22; }
        .letter.b { color: #27ae60; }
        .letter.c { color: #e74c3c; }

        /* ===== Footer (N) ===== */
        .card-footer {
          font-weight: 800;
          color: #e74c3c;
          line-height: 1.1;
          font-size: clamp(9px, 0.8vw + 5px, 16px);
          padding-bottom: 0.1em;
        }

        /* ===== Breakpoints (tighten spacing to protect height) ===== */

        /* <= 1024px (tablets) */
        @media (max-width: 1024px) {
          .card-row { padding: 0.5em; gap: 0.5em; }
          .card     { padding: 0.3em 0.35em; }
          .card-time { min-height: 1.7em; }
        }

        /* <= 820px (small tablets / big phones) */
        @media (max-width: 820px) {
          .card-row { padding: 0.45em; gap: 0.45em; }
          .card     { padding: 0.28em 0.32em; }
          .card-time { min-height: 1.6em; }
        }

        /* <= 768px (large phones) */
        @media (max-width: 768px) {
          .card-row { padding: 0.4em; gap: 0.4em; }
          .card     { padding: 0.25em 0.3em; }
          .card-time { min-height: 1.55em; }
        }

        /* <= 600px (medium phones) */
        @media (max-width: 600px) {
          .card-row { padding: 0.35em; gap: 0.35em; }
          .card     { padding: 0.22em 0.28em; }
          .card-time { min-height: 1.5em; }
        }

        /* <= 480px (small phones) */
        @media (max-width: 480px) {
          .card-row { padding: 0.3em; gap: 0.3em; }
          .card     { padding: 0.2em 0.26em; }
          .card-time { min-height: 1.45em; }
        }

        /* <= 360px (extra-small phones) */
        @media (max-width: 360px) {
          .card-row { padding: 0.25em; gap: 0.25em; }
          .card     { padding: 0.18em 0.24em; }
          .card-time { min-height: 1.4em; }
        }

        /* >= 1025px (desktop) */
        @media (min-width: 1025px) {
          .card-letters {
            /* Add desktop-specific styles for card-letters here */
            font-size: 1.2em;
            gap: 1.5em; /* Example: Adjust gap for desktop */
          }

          .card-numbers {
            /* Add desktop-specific styles for card-numbers here */
            gap: 1.5em; 
            font-size: 1.2em; /* Example: Increase font size for desktop */
          }
        }
      `}</style>
    </div>
  );
}
