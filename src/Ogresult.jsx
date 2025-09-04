import { filter } from "framer-motion/client";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";


const Ogresult = () => {
  const [filteredResults, setFilteredResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchResults() {
      try {
        const res = await fetch("https://api.goldbazar.co.in/api/results/2DAllResult");
        if (!res.ok) throw new Error("Failed to fetch results");
        const data = await res.json();
        console.log("API Response:", data);
        
        console.log("Raw API data:", data);
        console.log("Type of data:", typeof data);
        // Try to extract the array from the object
        let resultArray = [];
        if (data && typeof data === 'object') {
          // Try common keys: 'results', 'data', or first array value
          if (Array.isArray(data.results)) {
            resultArray = data.results;
          } else if (Array.isArray(data.data)) {
            resultArray = data.data;
          } else {
            // Try to find the first array property in the object
            for (const key in data) {
              if (Array.isArray(data[key])) {
                resultArray = data[key];
                break;
              }
            }
          }
        }
        console.log("Extracted resultArray:", resultArray);
        if (resultArray.length === 0) {
          console.log("No array found in API response.");
          setFilteredResults([]);
          return;
        }
        console.log("First API result:", resultArray[0]);
        console.log("Keys of first result:", Object.keys(resultArray[0]));
        // Try to filter by result_time24 if it exists and is in correct format
        const now = new Date();
        const now24 = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        const filtered = resultArray.filter(row => {
          if (!row.result_time24) return false;
          // Only include times from 09:00 up to (but not including) current time
          const isInRange = row.result_time24 >= "09:00" && row.result_time24 < now24;
          console.log("Comparing:", row.result_time24, ">= 09:00 and <", now24, "?", isInRange);
          return isInRange;
        });
        if (filtered.length > 0) {
          setFilteredResults(filtered);
          console.log("Filtered by result_time24:", filtered);
        } else {
          setFilteredResults(resultArray);
          console.log("No valid result_time24 filter, showing all results.");
        }
        
      } catch (err) {
        console.error("Error fetching results:", err);
        // Show some dummy data if API fails
        setFilteredResults([
          { time: "09:00", date: "2025-09-02", result: { "1000": "12", "3000": "34", "5000": "56" } },
          { time: "09:15", date: "2025-09-02", result: { "1000": "78", "3000": "90", "5000": "12" } }
        ]);
      }
    }
    fetchResults();
  }, []);

  // Remove the complex filtering for now


    return (
        <>
            <style>
                {`
          .ogreult-container {
            width: 100vw;
            max-width: 100vw;
            max-height: 85vh;
            overflow-x: hidden;
            overflow-y: auto;
            margin: 0 auto;
            padding: 18px 8px 18px 8px;
            font-family: Arial, sans-serif;
            border-collapse: collapse;
            box-sizing: border-box;
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 2px 16px rgba(0,0,0,0.07);
          }

          .ogreult-table {
            width: 100%;
            border-collapse: collapse;
            text-align: center;
            box-sizing: border-box;
            table-layout: fixed;
            word-break: break-word;
          }

          .ogreult-table th, .ogreult-table td {
            border: 1px solid #ddd;
            padding: 8px;
          }

          .ogreult-table th {
            background-color: #f4f4f4;
            font-weight: bold;
          }

          /* Sub-header row inside Result */
          .result-subheader th {
            background-color: #fafafa;
            font-size: 14px;
          }

          /* Responsive for tablets */
          @media (max-width: 768px) {
            .ogreult-table th, .ogreult-table td {
              font-size: 13px;
              padding: 6px;
            }
          }

          /* Responsive for small mobiles */

          @media (max-width: 680px) {
            .ogreult-container {
              max-height: 70vh;
              overflow-y: auto;
            }
          }

          @media (max-width: 768px) {
            .ogreult-container {
              width: 100vw;
              margin: 0 auto;
              padding: 8px 0;
            }
            .ogreult-table {
              width: 100vw;
              min-width: 0;
              table-layout: fixed;
              word-break: break-word;
            }
          }

          @media (max-width: 480px) {
            .ogreult-container {
              width: 100vw;
              margin: 0 auto;
              padding: 4px 0;
            }
            .ogreult-table, .ogreult-table thead, .ogreult-table tbody, .ogreult-table th, .ogreult-table td, .ogreult-table tr {
              display: block;
              width: 100vw;
              min-width: 0;
              box-sizing: border-box;
              word-break: break-word;
            }
            .ogreult-table thead tr {
              display: none; /* hide headers */
            }
            .ogreult-table tr {
              margin-bottom: 15px;
              border: 1px solid #ddd;
              padding: 10px;
              border-radius: 6px;
            }
            .ogreult-table td {
              text-align: right;
              padding-left: 50%;
              position: relative;
              word-break: break-word;
            }
            .ogreult-table td::before {
              content: attr(data-label);
              position: absolute;
              left: 10px;
              width: 45%;
              text-align: left;
              font-weight: bold;
            }
          }
        `}
            </style>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            padding: '10px 28px',
            marginTop: '15px',
            fontSize: '1rem',
            background: '#1976d2',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            transition: 'background 0.2s',
          }}
          onMouseOver={e => (e.currentTarget.style.background = '#1565c0')}
          onMouseOut={e => (e.currentTarget.style.background = '#1976d2')}
        >
          2D Game
        </button>
      </div>
      <div className="ogreult-container">
        <table className="ogreult-table">
          <thead>
            <tr>
              <th rowSpan="2">Draw Time</th>
              <th rowSpan="2">Draw Date</th>
              <th colSpan="3">Result</th>
            </tr>
            <tr className="result-subheader">
              <th>1000</th>
              <th>3000</th>
              <th>5000</th>
            </tr>
          </thead>
          <tbody>
            {filteredResults.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', color: '#888' }}>No results available for the selected time range.</td>
              </tr>
            ) : (
              filteredResults.map((row, i) => (
                <tr key={i}>
                  <td data-label="Draw Time">{row.result_time24 || row.drawTime}</td>
                  <td data-label="Draw Date">{
                    (row.result_date || row.drawDate || "").slice(0, 10)
                  }</td>
                  <td data-label="1000">{row.result.slice(0,58) ?? "-"}</td>
                  <td data-label="3000">{row.result.slice(59,118) ?? "-"}</td>
                  <td data-label="5000">{row.result.slice(119, 178) ?? "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
        </>
    );
};

export default Ogresult;
