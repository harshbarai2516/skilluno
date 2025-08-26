import React from "react";
import { useNavigate } from 'react-router-dom';

const Filter = ({ setSelectedRange }) => {
  const navigate = useNavigate();

  // Base styles (desktop-first, fully relative using vw)
  const baseStyles = {
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: '0.5vw',
      width: '100%',
      height: '100%',
      boxSizing: 'border-box',
      flexWrap: 'nowrap',
      overflow: 'hidden',
      padding: '0.3vw'
    },
    button: {
      flex: '0 0 auto',
      padding: '0.3vw 0.8vw',
      fontSize: '1vw',
      borderRadius: '0.3vw',
      color: 'white',
      lineHeight: '1.2',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '2vw',
      boxSizing: 'border-box',
      whiteSpace: 'nowrap',
      border: 'none',
      cursor: 'pointer',
      minWidth: '0'
    },
    checkbox: {
      width: '1vw',
      height: '1vw',
      marginRight: '0.4vw',
      cursor: 'pointer',
      flexShrink: 0
    },
    cell: (flex = 1) => ({
      flex: `${flex} 0 auto`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.4vw',
      height: '100%',
      boxSizing: 'border-box',
      padding: '0 0.2vw'
    }),
    textSpan: {
        color: 'black',
        fontSize: '1.25vw',
        textAlign: 'center',
        whiteSpace: 'nowrap',
        flexShrink: 0
      },
    select: {
      backgroundColor: 'blue',
      color: '#fff',
      border: 'none',
      fontWeight: 'normal',
      minWidth: '6vw',
      fontSize: '1vw',
      padding: '0.3vw 0.5vw',
      borderRadius: '0.3vw',
      height: '2vw',
      lineHeight: '1.2',
      cursor: 'pointer',
      flexShrink: 0
    }
  };

  const handleRangeClick = (range) => {
    setSelectedRange(range); // Update the range in the parent component
  };

  return (
    <div style={baseStyles.container}>
      {/* Range filters */}
      {[{ label: 'All', bg: 'black' }, { label: '10-19', bg: 'blue' }, { label: '30-39', bg: 'green' }, { label: '50-59', bg: 'red' }]
        .map((btn, i) => (
          <div key={`range-${i}`} style={baseStyles.cell(1.2)}>
            <input type="checkbox" style={baseStyles.checkbox} />
            <button
              style={{ ...baseStyles.button, backgroundColor: btn.bg }}
              onClick={() => handleRangeClick(btn.label)}
            >
              {btn.label}
            </button>
          </div>
        ))}

      {/* Type filters */}
      {['EVEN', 'ODD', 'CP', 'FP'].map((txt, i) => (
        <div key={`type-${i}`} style={baseStyles.cell(0.9)}>
          <input type="checkbox" style={baseStyles.checkbox} />
          <span className="type-filter-span" style={baseStyles.textSpan}>{txt}</span>
        </div>
      ))}

      {/* Action buttons */}
      {[{ label: '3D Game', bg: 'red' }, { label: 'Password', bg: 'black' }, { label: 'Logout', bg: 'black' }, { label: 'Statement', bg: 'red', bold: true }]
        .map((btn, i) => {
          if (btn.label === 'Password') {
            return [
              <div key="dropdown" style={baseStyles.cell(1.3)}>
                <select style={baseStyles.select}>
                  <option value="">Language</option>
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="mr">Marathi</option>
                </select>
              </div>,
              <div key={`action-${i}`} style={baseStyles.cell(1.2)}>
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
            <div key={`action-${i}`} style={baseStyles.cell(1.2)}>
              <button style={{ 
                ...baseStyles.button, 
                backgroundColor: btn.bg, 
                fontWeight: btn.bold ? 'bold' : 'normal' 
              }} onClick={() => {
                  if (btn.label === '3D Game') {
                    navigate('/threed'); // Navigate to Threed using useNavigate
                  }
                   if (btn.label === 'Logout') {
                    localStorage.clear(); // Clear all items from localStorage
                    navigate('/'); // Navigate to the home page
                  }
                }}>
                {btn.label}
              </button>
            </div>
          );
        })}

      {/* Responsive Media Queries */}
      <style jsx="true">{`
        /* Desktop is default (using vw for relative sizing) */
        button, select, span {
          font-weight: 700;
          font-size: 1.35vw;
        }
        .type-filter-span {
          font-size: 1.6vw;
        }

        @media (max-width: 1200px) {
          button, select {
            font-size: 1.25vw; font-weight: 700; padding: 0.25vw 0.6vw; height: 1.8vw;
          }
          span { font-size: 1.25vw; font-weight: 700; }
          .type-filter-span { font-size: 1.45vw; }
          input[type="checkbox"] { width: 0.9vw; height: 0.9vw; }
          div[style*="gap"] { gap: 0.45vw; }
        }

        @media (max-width: 992px) {
          button, select {
            font-size: 1.45vw; font-weight: 700; padding: 0.3vw 0.7vw; height: 2vw;
          }
          span { font-size: 1.45vw; font-weight: 700; }
          .type-filter-span { font-size: 1.6vw; }
          input[type="checkbox"] { width: 1.1vw; height: 1.1vw; }
          div[style*="gap"] { gap: 0.5vw; }
        }

        @media (max-width: 768px) {
          button, select {
            font-size: 1.75vw; font-weight: 700; padding: 0.35vw 0.8vw; height: 2.2vw;
          }
          span { font-size: 1.75vw; font-weight: 700; }
          .type-filter-span { font-size: 1.9vw; }
          input[type="checkbox"] { width: 1.3vw; height: 1.3vw; }
          div[style*="gap"] { gap: 0.6vw; }
        }

        @media (max-width: 576px) {
          button, select {
            font-size: 2.05vw; font-weight: 700; padding: 0.4vw 0.9vw; height: 2.4vw;
          }
          span { font-size: 2.05vw; font-weight: 700; }
          .type-filter-span { font-size: 2.2vw; }
          input[type="checkbox"] { width: 1.5vw; height: 1.5vw; }
          div[style*="gap"] { gap: 0.7vw; }
        }

        @media (max-width: 480px) {
          button, select {
            font-size: 2.35vw; font-weight: 700; padding: 0.45vw 1vw; height: 2.6vw;
          }
          span { font-size: 2.35vw; font-weight: 700; }
          .type-filter-span { font-size: 2.5vw; }
          input[type="checkbox"] { width: 1.7vw; height: 1.7vw; }
          div[style*="gap"] { gap: 0.8vw; }
        }

        @media (max-width: 360px) {
          button, select {
            font-size: 2.65vw; font-weight: 700; padding: 0.5vw 1.2vw; height: 2.8vw;
          }
          span { font-size: 2.65vw; font-weight: 700; }
          .type-filter-span { font-size: 2.8vw; }
          input[type="checkbox"] { width: 1.9vw; height: 1.9vw; }
          div[style*="gap"] { gap: 0.9vw; }
        }
      `}</style>
    </div>
  );
};

export default Filter;
