import React, { useEffect, useState } from "react";
import ButtonsBar from "./Buttonsbar";
import GameInfoPanel from "./Gameinfo";
import Card from "./Card";
import BetPanel from "./Betpanel";
import Navbar from "./Navbar";
import demoImage from "./assets/demo.png";
import backgroundImage from "./assets/bgi.jpg";

export default function Threed() {
  const [displayNumbers, setDisplayNumbers] = useState(Array(12).fill("-"));
  const [finalResults, setFinalResults] = useState(Array(12).fill("-"));
  const [isAnimating, setIsAnimating] = useState(true);

  // ✅ yahan pe bets state parent me rakha
  const [bets, setBets] = useState([]);

  // ✅ Buy button ka handler
  const handleBuy = async () => {
    if (bets.length === 0) {
      alert("⚠️ Please add at least one bet!");
      return;
    }

    // ticket result banana
    const tck_result = bets.map(b => `${b.type}|${b.num}|${b.amt}`).join(", ");
    console.log("🎟️ Posting Ticket:", tck_result);

    try {
      const res = await fetch("https://api.goldbazar.co.in/api/record/insert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tck_result,
          bets
        })
      });

      if (!res.ok) throw new Error("❌ Failed to post ticket");

      const data = await res.json();
      console.log("✅ Ticket Saved:", data);
      alert("🎉 Ticket purchased successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Error while buying ticket");
    }
  };

  // -------- Result API Fetch --------
  const showResult = async () => {
    try {
      const response = await fetch(
        "https://api.goldbazar.co.in/api/results/upcoming"
      );
      const data = await response.json();
      console.log("3D Previous Result:", data);

      let processedResults = Array(12).fill("");

      if (data?.results && data.results.length > 0) {
        data.results.forEach((item) => {
          if (item.straight && typeof item.straight === "string") {
            const digits = item.straight.split(""); // ["3","8","4"]

            let col = 0;
            if (item.game === "A") col = 0;
            if (item.game === "B") col = 1;
            if (item.game === "C") col = 2;

            digits.forEach((digit, row) => {
              processedResults[row * 4 + col] = digit;
            });
          }
        });
      }

      setFinalResults(processedResults);
    } catch (error) {
      console.error("Error fetching 3D previous result:", error);
    }
  };

  useEffect(() => {
    showResult();
  }, []);

  // -------- Spinning animation --------
  useEffect(() => {
    if (!finalResults || finalResults.every((val) => val === "-")) return;

    setIsAnimating(true);

    let intervalId = setInterval(() => {
      const randomNums = Array(12).fill("").map((_, i) => {
        if ((i + 1) % 4 === 0) return ""; // Jackpot column blank
        return Math.floor(Math.random() * 10).toString();
      });
      setDisplayNumbers(randomNums);
    }, 100);

    const timer = setTimeout(() => {
      clearInterval(intervalId);
      setDisplayNumbers(finalResults);
      setIsAnimating(false);
    }, 5000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timer);
    };
  }, [finalResults]);

  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />

      <div className="threed-container">
        <div className="top-section">
          <Navbar />
        </div>

        <div className="bottom-section">
          <div className="bottom-top">
            <div className="part-1">
              <div className="image-container">
                <img src={demoImage} alt="Demo" className="board-image" />
                <div className="overlay-grid">
                  {displayNumbers.map((num, i) => (
                    <div
                      key={i}
                      className={`overlay-box ${
                        isAnimating ? "bg-gray-200" : "bg-white"
                      }`}
                    >
                      {num}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="part-3">
              <GameInfoPanel />
            </div>
          </div>

          <div className="bottom-bottom">
            <div className="part-1">
              {/* ✅ BetPanel ko parent ka setBets de rahe hain */}
              <BetPanel setBets={setBets} />
            </div>
            <div className="part-2">
              <Card />
            </div>
            <div className="part-3">
              {/* ✅ ButtonsBar ko buy ka handler de rahe hain */}
              <ButtonsBar onBuy={handleBuy} />
            </div>
          </div>
        </div>
      </div>

      {/* ------- CSS Styles ------- */}
      <style jsx="true">{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        html,
        body {
          width: 100%;
          height: 100%;
          overflow: hidden;
          position: relative;
        }
        .threed-container {
          display: flex;
          flex-direction: column;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          position: relative;
          background-image: url(${backgroundImage});
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-attachment: fixed;
        }
        .top-section {
          height: 7dvh;
          min-height: 40px;
          width: 100%;
          background-color: transparent;
          z-index: 2;
          position: relative;
        }
        .bottom-section {
          display: flex;
          flex-direction: row;
          height: 93%;
          width: 100%;
          background-color: transparent;
          z-index: 1;
          position: relative;
        }
        .bottom-top {
          display: flex;
          flex-direction: column;
          flex: 3;
          background-color: transparent;
          overflow: hidden;
        }
        .bottom-top > .part-1 {
          flex: 85;
          background-color: transparent;
        }
        .bottom-top > .part-3 {
          flex: 15;
          background-color: transparent;
        }
        .bottom-bottom {
          display: flex;
          flex-direction: column;
          flex: 7;
          background-color: transparent;
          overflow: hidden;
        }
        .bottom-bottom > .part-1 {
          flex: 60;
          background-color: transparent;
        }
        .bottom-bottom > .part-2 {
          flex: 30;
          background-color: transparent;
        }
        .bottom-bottom > .part-3 {
          flex: 10;
          background-color: transparent;
        }
        .image-container {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .board-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        .overlay-grid {
          position: absolute;
          top: 44%;
          left: 21%;
          width: 60%;
          height: 30%;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: repeat(3, 1fr);
          color: black;
        }
        .overlay-box {
          background: rgba(255, 255, 255, 0.9);
          border: 2px solid #ffd700;
          border-radius: 8px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: bold;
          font-size: 20px;
          transition: all 0.2s ease-in-out;
        }
        .overlay-box:hover {
          background: #ffeb3b;
          transform: scale(1.05);
        } 
      `}</style>
    </>
  );
}
