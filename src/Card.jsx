import React from "react";

export default function Card() {
  const [previousResult, setPreviousResult] = React.useState([]);

  const fetchPreviousResult = async () => {
    try {
      const response = await fetch(
        "https://api.goldbazar.co.in/api/results/3dPreviousResult"
      );
      const data = await response.json();

      if (
        Array.isArray(data.results) &&
        JSON.stringify(data.results) !== JSON.stringify(previousResult)
      ) {
        // console.log("Previous Result Updated:", data.results);
        setPreviousResult(data.results);
      }
    } catch (error) {
      console.error("Error fetching previous result:", error);
    }
  };

  React.useEffect(() => {
    fetchPreviousResult();
    const interval = setInterval(fetchPreviousResult, 5000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Group by draw_time
  const groupedResults = previousResult.reduce((acc, item) => {
    if (!acc[item.draw_time]) {
      acc[item.draw_time] = [];
    }
    acc[item.draw_time].push(item);
    return acc;
  }, {});

  return (
    <div className="card-row">
      {Object.entries(groupedResults).map(([time, results]) => (
        <div key={time} className="card">
          <div className="card-time">{time}</div>

          <div className="card-body">
            <div className="card-letters">
              {results.map((r) => (
                <span
                  key={r.id}
                  className={`letter ${r.game.toLowerCase()}`}
                >
                  {r.game}
                </span>
              ))}
            </div>

            <div className="card-numbers">
              {results.map((r) => (
                <span key={r.id}>{r.straight}</span>
              ))}
            </div>
          </div>

          <div className="card-footer">N</div>
        </div>
      ))}

      <style jsx="true">{`
        .card-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6em;
          justify-content: flex-start;
        }
        .card {
          width: 120px;
          background: #fff;
          border-radius: 0.5em;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0.4em;
        }
        .card-time {
          font-weight: bold;
          font-size: 0.9em;
          margin-bottom: 0.3em;
          background-color: #111;
          color: #fff;
          padding: 0.2em 0.4em;
          border-radius: 0.2em;
          width: 100%;
          text-align: center;
        }
        .card-body {
          display: flex;
          flex-direction: row;
          gap: 1em;
          justify-content: center;
          align-items: center;
        }
        .card-letters,
        .card-numbers {
          display: flex;
          flex-direction: column;
          gap: 0.4em;
          color: #333;
          align-items: center;
          font-weight: 700;
          font-size: 1.1em;
        }
        .card-footer {
          margin-top: 0.3em;
          font-weight: bold;
          color: red;
        }
        .letter.a {
          color: #e67e22;
        }
        .letter.b {
          color: #27ae60;
        }
        .letter.c {
          color: #e74c3c;
        }
      `}</style>
    </div>
  );
}
