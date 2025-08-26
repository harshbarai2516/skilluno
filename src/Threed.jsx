import React from "react";
import ButtonsBar from "./Buttonsbar";
import GameInfoPanel from "./Gameinfo";
import Card from "./Card";
import BetPanel from "./Betpanel";
import Navbar from "./Navbar";
import BetBoard from "./BetBoard";
import demoImage from './assets/demo.png';
import backgroundImage from './assets/bgi.jpg'; // Import the background image

export default function Threed() {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

      <div className="threed-container">
        <div className="top-section"><Navbar /></div>
        <div className="bottom-section">
          <div className="bottom-top">
            <div className="part-1">
              <img src={demoImage} alt="Demo"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }} /> 
            </div>
            <div className="part-3"><GameInfoPanel /></div>
          </div>
          <div className="bottom-bottom">
            <div className="part-1"><BetPanel /></div>
            <div className="part-2"><Card /></div>
            <div className="part-3"><ButtonsBar /></div>
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
          position: relative;
        }

        .threed-container {
          display: flex;
          flex-direction: column;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          position: relative;
          background-image: url(${backgroundImage}); /* Use imported image */
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
          z-index: 2; /* Ensure navbar stays above background */
          position: relative;
        }

        .bottom-section {
          display: flex;
          flex-direction: row;
          height: 93%;
          width: 100%;
          background-color: transparent;
          z-index: 1; /* Ensure content stays above background */
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

        /* Add overlay to improve readability if needed */
        .bottom-top::before,
        .bottom-bottom::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.3); /* Semi-transparent overlay */
          z-index: -1; /* Place behind content */
        }

        /* Responsive adjustments */
        @media (max-width: 1024px) {
          .threed-container {
            background-size: cover;
            background-position: center;
          }
        }

        @media (max-width: 768px) {
          .bottom-section {
            flex-direction: column;
          }
          
          .bottom-top {
            flex: 4;
          }
          
          .bottom-bottom {
            flex: 6;
          }
        }

        @media (max-width: 480px) {
          .threed-container {
            background-size: cover;
            background-position: center top;
          }
          
          .bottom-section {
            flex-direction: column;
          }
        }

        /* Landscape orientation */
        @media (max-height: 500px) and (orientation: landscape) {
          .threed-container {
            background-size: cover;
            background-position: center;
          }
        }
      `}</style>
    </>
  );
}