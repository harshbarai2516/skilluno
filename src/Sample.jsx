import React from "react";

export default function Sample() {
  return (
    <div style={styles.container}>
      {/* Top Semi-Circle */}
      <div style={styles.top}>
        {/* Lights around semi-circle */}
        {[...Array(18)].map((_, i) => {
          const angle = (Math.PI * i) / 18; // distribute around arc
          const x = 140 * Math.sin(angle) + 140;
          const y = 90 - 90 * Math.cos(angle);
          return (
            <div
              key={i}
              style={{
                ...styles.light,
                top: `${y}px`,
                left: `${x}px`,
                animationDelay: `${i * 0.1}s`
              }}
            ></div>
          );
        })}

        {/* Stars inside semi-circle */}
        <div style={styles.starContainer}>
          <span style={{ ...styles.star, fontSize: "30px" }}>★</span>
          <span style={{ ...styles.star, fontSize: "25px", margin: "0 5px" }}>★</span>
          <span style={{ ...styles.star, fontSize: "30px" }}>★</span>
        </div>

        {/* Black Screen */}
        <div style={styles.screen}></div>
      </div>

      {/* Labels A, B, C, Jackpot */}
      <div style={styles.labels}>
        <div style={styles.label}>A</div>
        <div style={styles.label}>B</div>
        <div style={styles.label}>C</div>
        <div style={styles.label}>JACKPOT</div>
      </div>

      {/* Slot Grid 4x3 */}
      <div style={styles.grid}>
        {[...Array(12)].map((_, i) => (
          <div key={i} style={styles.box}></div>
        ))}
      </div>

      {/* Place Bet Button */}
      <div style={styles.betButton}>Place Bet Please</div>
    </div>
  );
}

/* CSS-in-JS Styles */
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "transparent",
    padding: "20px",
    position: "relative"
  },
  top: {
    width: "300px",
    height: "200px",
    background: "#b40000",
    borderRadius: "150px 150px 0 0",
    border: "10px solid #ffcc00",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  screen: {
    width: "200px",
    height: "100px",
    background: "black",
    border: "6px solid #ff66cc",
    borderRadius: "10px",
    zIndex: 5
  },
  light: {
    position: "absolute",
    width: "15px",
    height: "15px",
    background: "#ffcc00",
    borderRadius: "50%",
    boxShadow: "0 0 10px #ffcc00, 0 0 20px #ffcc00",
    animation: "blink 1s infinite alternate"
  },
  starContainer: {
    position: "absolute",
    top: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 6
  },
  star: {
    color: "gold",
    textShadow: "0 0 5px #fff, 0 0 10px #ff0"
  },
  labels: {
    display: "grid",
    gridTemplateColumns: "repeat(4, auto)",
    gap: "10px",
    marginTop: "10px"
  },
  label: {
    background: "#ffcc99",
    color: "#b40000",
    fontWeight: "bold",
    padding: "5px 15px",
    borderRadius: "15px",
    textAlign: "center"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 60px)",
    rowGap: "2px", // Set minimal gap between vertical boxes
    columnGap: "10px", // No gap between horizontal boxes
    marginTop: "0px"
  },
  box: {
    width: "60px",
    height: "60px",
    background: "linear-gradient(to bottom, #d9d9d9, white)",
    border: "4px solid #ffcc00",
    borderRadius: "8px",
    boxShadow: "inset 0 2px 5px rgba(0, 0, 0, 0.3)"
  },
  betButton: {
    marginTop: "20px",
    width: "250px",
    background: "linear-gradient(to right, #0099ff, #00cc66)",
    padding: "10px",
    borderRadius: "10px",
    textAlign: "center",
    fontWeight: "bold",
    color: "black",
    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.3)"
  }
};

/* Keyframe Animation (Add this in your index.css or global CSS) */
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
@keyframes blink {
  0% { opacity: 1; }
  100% { opacity: 0.4; }
}
`, styleSheet.cssRules.length);
