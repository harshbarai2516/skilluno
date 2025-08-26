import React from "react";

const Notification = () => {
  return (
    <div className="notification-bar">
      <span>Welcome to the Kohinoor Game</span>

      <style jsx ='true'>{`
        .notification-bar {
          width: 100%;
          background: #0d0d0eff;
          color: #fff;
          text-align: center;
          font-weight: bold;
          font-size: 1.5vw;
          padding: 0.8vw;
          border-radius: 0.5vw;
          box-sizing: border-box;
          margin-bottom: 0.3vw;
        }

        /* Large tablets */
        @media (max-width: 1200px) {
          .notification-bar {
            font-size: 1.3vw;
            padding: 0.7vw;
            border-radius: 0.45vw;
          }
        }

        /* Tablets */
        @media (max-width: 992px) {
          .notification-bar {
            font-size: 1.5vw;
            padding: 0.6vw;
            border-radius: 0.4vw;
          }
        }

        /* Mobile large */
        @media (max-width: 768px) {
          .notification-bar {
            font-size: 2vw;
            padding: 0.8vw;
            border-radius: 0.5vw;
          }
        }

        /* Mobile medium */
        @media (max-width: 576px) {
          .notification-bar {
            font-size: 2.3vw;
            padding: 1vw;
            border-radius: 0.6vw;
          }
        }

        /* Mobile small */
        @media (max-width: 480px) {
          .notification-bar {
            font-size: 2.6vw;
            padding: 1.2vw;
            border-radius: 0.7vw;
          }
        }

        /* Extra small devices */
        @media (max-width: 360px) {
          .notification-bar {
            font-size: 3vw;
            padding: 1.4vw;
            border-radius: 0.8vw;
          }
        }
      `}</style>
    </div>
  );
};

export default Notification;
