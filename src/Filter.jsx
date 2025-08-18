import React from "react";

const Filter = () => {
  // Base styles
  const baseStyles = {
    button: {
      flex: 1,
      padding: '2px 4px',
      fontSize: '12px',
      borderRadius: '0px',
      color: 'white',
      lineHeight: '1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '60%',
      boxSizing: 'border-box',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      border: 'none',
      cursor: 'pointer'
    },
    checkbox: {
      width: '20px',
      height: '12px',
      marginRight: '2px',
      cursor: 'pointer'
    },
    cell: (flex = 2) => ({
      flex,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '2px',
      height: '100%',
      boxSizing: 'border-box',
      minWidth: '0' // Prevent flex items from overflowing
    }),
    textSpan: {
      color: 'black',
      fontSize: '12px',
      textAlign: 'center',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    select: {
      backgroundColor: 'blue',
      color: '#fff',
      border: 'none',
      fontWeight: 'normal',
      minWidth: '80px',
      fontSize: '12px',
      padding: '2px 4px',
      borderRadius: '0px',
      height: '32px',
      lineHeight: '32px',
      textAlign: 'center',
      cursor: 'pointer'
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: '2px',
      width: '100%',
      height: '100%',
      boxSizing: 'border-box',
      flexWrap: 'nowrap',
      overflowX: 'auto',
      padding: '2px'
    }}>
      {/* Range filters */}
      {[{ label: 'All', bg: 'black' }, { label: '10-19', bg: 'blue' }, { label: '30-39', bg: 'green' }, { label: '50-59', bg: 'red' }]
        .map((btn, i) => (
          <div key={`range-${i}`} style={baseStyles.cell(2)}>
            <input type="checkbox" style={baseStyles.checkbox} />
            <button style={{ ...baseStyles.button, backgroundColor: btn.bg }}>{btn.label}</button>
          </div>
        ))}

      {/* Type filters */}
      {['EVEN', 'ODD', 'CP', 'FP'].map((txt, i) => (
        <div key={`type-${i}`} style={baseStyles.cell(1)}>
          <input type="checkbox" style={baseStyles.checkbox} />
          <span style={baseStyles.textSpan}>{txt}</span>
        </div>
      ))}

      {/* Action buttons */}
      {[{ label: '3D Game', bg: 'red' }, { label: 'Password', bg: 'black' }, { label: 'Logout', bg: 'black' }, { label: 'Statement', bg: 'red', bold: true }]
        .map((btn, i) => {
          if (btn.label === 'Password') {
            return [
              <div key="dropdown" style={baseStyles.cell(2)}>
                <select style={baseStyles.select}>
                  <option value="">Language</option>
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="mr">Marathi</option>
                </select>
              </div>,
              <div key={`action-${i}`} style={baseStyles.cell(2)}>
                <button style={{ 
                  ...baseStyles.button, 
                  backgroundColor: btn.bg, 
                  fontWeight: btn.bold ? 'bold' : 'normal' 
                }}>
                  {btn.label}
                </button>
              </div>
            ];
          }
          return (
            <div key={`action-${i}`} style={baseStyles.cell(2)}>
              <button style={{ 
                ...baseStyles.button, 
                backgroundColor: btn.bg, 
                fontWeight: btn.bold ? 'bold' : 'normal' 
              }}>
                {btn.label}
              </button>
            </div>
          );
        })}

      {/* Responsive Media Queries */}
      <style jsx>{`
        @media (max-width: 1440px) {
          /* Desktop adjustments */
          div[style*="flex-direction: row"] {
            gap: 1px;
          }
          button {
            font-size: 11px;
            padding: 1px 3px;
          }
          span {
            font-size: 11px;
          }
          select {
            font-size: 11px;
            min-width: 70px;
          }
        }

        @media (max-width: 1024px) {
          /* Tablet landscape */
          div[style*="flex-direction: row"] {
            gap: 1px;
          }
          button {
            font-size: 10px;
            padding: 1px 2px;
          }
          span {
            font-size: 10px;
          }
          select {
            font-size: 10px;
            min-width: 65px;
            height: 28px;
          }
        }

        @media (max-width: 999px) {
          /* Tablet portrait */
          div[style*="flex-direction: row"] {
            gap: 0.2px;
          }
          button {
            font-size: 7px;
            padding: 1px 2px;
          }
          span {
            font-size: 6px;
          }
          select {
            font-size: 9px;
            min-width: 40px;
            height: 15px;
          }
          input[type="checkbox"] {
            width: 18px;
            height: 10px;
          }
        }

        @media (max-width: 600px) {
          /* Large phones */
          button {
            font-size: 8px;
            padding: 0.5px 1px;
          }
          span {
            font-size: 8px;
          }
          select {
            font-size: 8px;
            min-width: 55px;
            height: 24px;
          }
          input[type="checkbox"] {
            width: 16px;
            height: 9px;
            margin-right: 1px;
          }
        }

        @media (max-width: 480px) {
          /* Medium phones */
          button {
            font-size: 7px;
          }
          span {
            font-size: 7px;
          }
          select {
            font-size: 7px;
            min-width: 50px;
            height: 22px;
          }
          input[type="checkbox"] {
            width: 14px;
            height: 8px;
          }
        }

        @media (max-width: 360px) {
          /* Small phones */
          button {
            font-size: 6px;
          }
          span {
            font-size: 6px;
          }
          select {
            font-size: 6px;
            min-width: 45px;
            height: 20px;
          }
          input[type="checkbox"] {
            width: 12px;
            height: 7px;
          }
        }

        @media (max-width: 320px) {
          /* Extra small phones */
          button {
            font-size: 5.5px;
          }
          span {
            font-size: 5.5px;
          }
          select {
            font-size: 5.5px;
            min-width: 40px;
            height: 18px;
          }
        }

        /* Landscape orientation adjustments */
        @media (orientation: landscape) and (max-height: 500px) {
          div[style*="flex-direction: row"] {
            height: 80%;
          }
          button, select {
            height: 70%;
          }
        }

        /* Print styles */
        @media print {
          div[style*="flex-direction: row"] {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Filter;