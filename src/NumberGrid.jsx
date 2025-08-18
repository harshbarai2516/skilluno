


import React from "react";

export default function NumberGrid() {
  const columns = ["B0", 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const numbers = [];
  const blocks = Array.from({ length: 10 }, (_, i) => `F${i}`);

  for (let i = 0; i < 10; i++) {
    const row = [];
    for (let j = 0; j < 10; j++) {
      row.push(1000 + i * 10 + j);
    }
    numbers.push(row);
  }

  return (
    <>
      <style>{`
  .numbergrid-wrapper {
    display: flex;
    flex: 1;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding: 0.2rem;
    overflow: hidden;
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(${columns.length + 1}, minmax(0, 1fr));
    gap: clamp(1px, 0.3vw, 6px);
    width: 100%;
    height: 100%;
  }

  .header {
    font-weight: bold;
    text-align: center;
    color: #000;
    line-height: 1.1;
    margin-bottom: 1px;
    font-size: clamp(10px, 1.1vw, 15px);
    white-space: nowrap;
  }

  .cell {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .num-text {
    font-weight: 900;
    margin: 0;
    line-height: 1;
    font-size: clamp(11px, 1vw, 14px);
    color: #000;
    white-space: nowrap;
  }

  .capsule {
    border-radius: 999px;
    border: 1.5px solid #6a1b9a;
    background-color: white;
    width: clamp(22px, 4.3vw, 43px);
    height: clamp(11px, 1.3vh, 13px);
    max-height: clamp(22px, 3.2vh, 13px);
    margin-top: 1px;
  }

  /* Desktop adjustments */
  @media (min-width: 1024px) {
    .grid-container {
      gap: 2px; /* tighter and more compact */
    }
    .num-text {
      font-size: clamp(12px, 1.3vw, 17px);
    }
    .capsule {
      width: clamp(38px, 9vw, 64px); /* bigger for desktop */
      height: clamp(20px, 2.4vh, 24px);
      max-height: clamp(30px, 4vh, 24px);
    }
  }



  /* Mobile optimizations - ensure proper fit */
  @media (max-width: 768px) {
    .numbergrid-wrapper {
      padding: 0.1rem !important;
      overflow: hidden !important;
      width: 100% !important;
      height: 100% !important;
    }
    .grid-container {
      gap: 1px !important;
      width: 100% !important;
      height: 100% !important;
      overflow: hidden !important;
    }
    .header {
      font-size: clamp(7px, 2vw, 10px) !important;
      margin-bottom: 0 !important;
    }
    .num-text {
      font-size: clamp(7px, 1.8vw, 10px) !important;
    }
    .capsule {
      width: clamp(15px, 3.5vw, 25px) !important;
      height: clamp(8px, 1.8vw, 12px) !important;
      max-height: clamp(15px, 2.5vw, 12px) !important;
      border-width: 1px !important;
      margin-top: 0 !important;
    }
    .cell {
      overflow: hidden !important;
    }
  }
`}</style>

      <div className="numbergrid-wrapper">
        <div className="grid-container">
          {/* Header row */}
          <div className="header" style={{ color: "#1565c0" }}>BLOCK</div>
          {columns.map((col) => (
            <div key={col} className="header">{col}</div>
          ))}

          {/* Data rows */}
          {blocks.map((block, rowIdx) => (
            <React.Fragment key={block}>
              <div className="cell">
                <div className="num-text">{block}</div>
                <div className="capsule"></div>
              </div>
              {numbers[rowIdx].map((num) => (
                <div key={num} className="cell">
                  <div className="num-text">{num}</div>
                  <div className="capsule"></div>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
}




















// import React from "react";

// const NumberGrid = () => {
//   const columns = ['B0', 1, 2, 3, 4, 5, 6, 7, 8, 9];
//   const blocks = Array.from({ length: 10 }, (_, i) => `F${i}`);
//   const numbers = [];
//   for (let i = 0; i < 10; i++) {
//     const row = [];
//     for (let j = 0; j < 10; j++) {
//       row.push(1000 + i * 10 + j);
//     }
//     numbers.push(row);
//   }

//   return (
//     <div className="numbergrid-wrapper">
//       <div className="numbergrid-flex">
//         <table className="numbergrid-table">
//           <thead>
//             <tr>
//               <th className="header">BLOCK</th>
//               {columns.map((col) => (
//                 <th key={col} className="header">{col}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {blocks.map((block, rowIdx) => (
//               <tr key={block}>
//                 <td className="cell">
//                   <div className="cell-content">
//                     <div className="num-text">{block}</div>
//                     <div className="capsule"></div>
//                   </div>
//                 </td>
//                 {numbers[rowIdx].map((num) => (
//                   <td key={num} className="cell">
//                     <div className="cell-content">
//                       <div className="num-text">{num}</div>
//                       <div className="capsule"></div>
//                     </div>
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <style>{`
//         .numbergrid-wrapper {
//           width: 100%;
//           height: 100%;
//           display: flex;
//           align-items: stretch;
//           justify-content: center;
//         }
//         .numbergrid-flex {
//           flex: 1;
//           display: flex;
//           flex-shrink: 1;
//           overflow: hidden;
//         }
//         .numbergrid-table {
//           border-collapse: collapse;
//           width: 100%;
//           height: 100%;
//           table-layout: fixed;
//         }
//         .header {
//           background: #ddd;
//           font-weight: bold;
//           text-align: center;
//           color: #000;
//           font-size: min(1.1vw, 13px);
//           white-space: nowrap;
//           padding: 0;
//         }
//         .cell {
//           border: 1px solid #ccc;
//           background: #f0f0f0;
//           padding: 0;
//           font-size: min(1vw, 11px);
//           text-align: center;
//           white-space: nowrap;
//           overflow: hidden;
//           text-overflow: ellipsis;
//         }
//         .cell-content {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           gap: 1px; /* tighter spacing between text and capsule */
//         }
//         .num-text {
//           font-weight: 900;
//           margin: 0;
//           line-height: 1;
//           font-size: min(1vw, 10px);
//           color: #000;
//         }
//         .capsule {
//           border-radius: 999px;
//           border: 1px solid #6a1b9a;
//           background-color: transparent;
//           width: 70%; /* increased width for all screens */
//           height: calc(1.2em);
//           max-height: none;
//         }
//         @media (min-width: 1025px) {
//           .capsule {
//             height: calc(1.8em); /* strictly larger height for desktop */
//           }
//         }
//         @media (max-width: 1024px) {
//           .header {
//             font-size: min(1.5vw, 12px);
//           }
//           .cell {
//             font-size: min(1.2vw, 10px);
//           }
//           .num-text {
//             font-size: min(1.1vw, 9px);
//           }
//           .capsule {
//             width: 70%;
//             height: calc(1.3em);
//           }
//         }
//         @media (max-width: 768px) {
//           .numbergrid-wrapper {
//             padding: 0 !important;
//           }
//           .header {
//             font-size: min(2.5vw, 10px) !important;
//           }
//           .cell {
//             font-size: min(2vw, 9px) !important;
//           }
//           .num-text {
//             font-weight: 700 !important;
//             font-size: min(1.8vw, 8px) !important;
//           }
//           .capsule {
//             width: 70% !important;
//             height: calc(1.2em) !important;
//           }
//         }
//         @media (max-width: 480px) {
//           .header {
//             font-size: min(3vw, 9px) !important;
//           }
//           .cell {
//             font-size: min(2.5vw, 8px) !important;
//           }
//           .num-text {
//             font-size: min(2vw, 7px) !important;
//           }
//           .capsule {
//             width: 70% !important;
//             height: calc(1em) !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default NumberGrid;
