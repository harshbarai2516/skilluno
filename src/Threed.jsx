import React from "react";
import ButtonsBar from "./Buttonsbar";
import GameInfoPanel from "./Gameinfo";
import Card from "./Card";
import BetPanel from "./Betpanel";
import Navbar from "./Navbar";
import BetBoard from "./BetBoard";
import demoImage from './assets/demo.png'

export default function Threed() {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

      <div className="threed-container">
        <div className="top-section"><Navbar/></div>
        <div className="bottom-section">
          <div className="bottom-top">
            <div className="part-1"></div>
            <div className="part-2">  <img src={demoImage} alt="Demo"       style={{
        width: "100%",
        height: "100%",
        objectFit: "contain", // Ensures the image fits without cropping
      }} />  </div>
            <div className="part-3"><GameInfoPanel/></div>
          </div>
          <div className="bottom-bottom">
            <div className="part-1"><BetPanel/></div>
            <div className="part-2"><Card/></div>
            <div className="part-3"><ButtonsBar/></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html, body {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .threed-container {
          display: flex;
          flex-direction: column;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
        }

        .top-section {
            height: 7dvh;   /* ✅ use dynamic viewport height */
            min-height: 40px; /* fallback to prevent collapse */
            width: 100%;
            background-color: red;
          }

        
        .bottom-section {
          display: flex;
          flex-direction: row; /* Divides the section horizontally */
          height: 93%;
          width: 100%;
          background-color: blue;
        }

        .bottom-top {
          display: flex;
          flex-direction: column;
          flex: 3; /* 30% of the width */
          background-color: lightblue;
          overflow: hidden;
        }

        .bottom-top > .part-1 {
          flex: 45;
          background-color: #99ccff;
        }

        .bottom-top > .part-2 {
          flex: 40;
          background-color: #99ccff;
        }

        .bottom-top > .part-3 {
          flex: 15;
          background-color: #99ff99;
        }

        .bottom-bottom {
          display: flex;
          flex-direction: column;
          flex: 7; /* 70% of the width */
          background-color: darkblue;
          overflow: hidden;
        }

        .bottom-bottom > .part-1 {
          flex: 60;
          background-color: #f7f6f6ff;
        }

        .bottom-bottom > .part-2 {
          flex: 30;
          background-color: #4ecdc4;
        }

        .bottom-bottom > .part-3 {
          flex: 10;
          background-color: #1a535c;
        }

        /* Responsive adjustments */
        @media (max-width: 1024px), (max-width: 820px), (max-width: 680px), (max-width: 560px), (max-width: 440px), (max-width: 360px) {
          .bottom-section {
            display: flex;
            flex-direction: row; /* Divides the section horizontally */
            height: 93%;
            width: 100%;
          }

          .bottom-top {
            flex: 3; /* 30% of the width */
          }

          .bottom-bottom {
            flex: 7; /* 70% of the width */
          }
        }
      `}</style>
    </>
  );
}
