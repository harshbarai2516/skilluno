import React from "react";

export default function BottomSection() {
  return (
    <div className="bottom-section-container">
      {/* First row - Transaction info, input, and button */}
      <div className="top-row">
        <div className="transaction-info">
          Last Transaction: <br /> #542223451215
        </div>
        <input
          type="text"
          placeholder="Barcode"
          className="barcode-input"
        />
        <button className="buy-now-btn">
          Buy Now F(9)
        </button>
      </div>

      {/* Second row - Total sum boxes */}
      <div className="totals-row">
        <div className="total-box">
          <div className="total-label">Total Quantity</div>
          <div className="total-value">0</div>
        </div>
        <div className="total-box">
          <div className="total-label">Total Amount</div>
          <div className="total-value">$0.00</div>
        </div>
      </div>

      <style jsx>{`
        .bottom-section-container {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 8px;
          box-sizing: border-box;
          background-color: #f0f0f0;
          overflow: hidden;
        }

        .top-row {
          display: flex;
          align-items: center;
          width: 100%;
          gap: 10px;
          margin-bottom: 10px;
          overflow: hidden;
        }

        .transaction-info {
          font-size: 12px;
          color: #333;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .barcode-input {
          flex: 1;
          min-width: 0;
          padding: 8px 12px;
          border: 3px solid #6a1b9a; /* Thick border */
          border-radius: 4px;
          font-size: 14px;
          outline: none;
        }

        .buy-now-btn {
          background-color: #6a1b9a;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 8px 16px;
          font-size: 14px;
          font-weight: bold;
          cursor: pointer;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .totals-row {
          display: flex;
          width: 100%;
          gap: 10px;
          height: 60%;
        }

        .total-box {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: white;
          border-radius: 6px;
          border: 2px solid #ddd;
          padding: 10px;
        }

        .total-label {
          font-size: 14px;
          font-weight: bold;
          color: #555;
          margin-bottom: 8px;
        }

        .total-value {
          font-size: 20px;
          font-weight: bold;
          color: #6a1b9a;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .transaction-info {
            font-size: 10px;
          }
          .barcode-input {
            padding: 6px 10px;
            font-size: 12px;
          }
          .buy-now-btn {
            padding: 6px 12px;
            font-size: 12px;
          }
          .total-label {
            font-size: 12px;
          }
          .total-value {
            font-size: 16px;
          }
        }

        @media (max-width: 480px) {
          .top-row {
            gap: 6px;
          }
          .transaction-info {
            font-size: 9px;
          }
          .barcode-input {
            padding: 4px 8px;
            font-size: 11px;
            border-width: 2px;
          }
          .buy-now-btn {
            padding: 4px 8px;
            font-size: 11px;
          }
        }
      `}</style>
    </div>
  );
}