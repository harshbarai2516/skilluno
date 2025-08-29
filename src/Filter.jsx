
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Filter = ({ 
  setSelectedRange, 
  setSelectedRangeState, 
  onCheckedRangesChange, 
  typeFilters, 
  onTypeFiltersChange, 
  refresh 
}) => {
  const navigate = useNavigate();

  // Manage checkbox state
  const [checkedRanges, setCheckedRanges] = useState({
    "10-19": false,
    "30-39": false,
    "50-59": false,
  });

  // Reset checkboxes when refresh changes
  useEffect(() => {
    setCheckedRanges({
      "10-19": false,
      "30-39": false,
      "50-59": false,
    });
  }, [refresh]);

  // Derived "All" checked state
  const allChecked = Object.values(checkedRanges).every(Boolean);

  // Update parent whenever selection changes
  useEffect(() => {
    if (onCheckedRangesChange) {
      const active = Object.entries(checkedRanges)
        .filter(([_, val]) => val)
        .map(([key]) => key);
      onCheckedRangesChange(active);   // ✅ send up to Home
    }
  }, [checkedRanges, onCheckedRangesChange]);

  // Handle range button click
  const handleRangeClick = (range) => {
    setSelectedRange(range);
    if (range === "30-39") {
      setSelectedRangeState("3000-3099");
    } else if (range === "10-19") {
      setSelectedRangeState("1000-1099");
    } else if (range === "50-59") {
      setSelectedRangeState("5000-5099");
    }
  };

  // Toggle a single checkbox
  const toggleCheckbox = (range) => {
    setCheckedRanges((prev) => ({
      ...prev,
      [range]: !prev[range],
    }));
  };

  // Toggle All checkbox
  const toggleAll = () => {
    const newValue = !allChecked;
    setCheckedRanges({
      "10-19": newValue,
      "30-39": newValue,
      "50-59": newValue,
    });
  };

  // Toggle type filters (EVEN/ODD/FP/CP - mutually exclusive)
  const toggleTypeFilter = (type) => {
    if (!typeFilters || !onTypeFiltersChange) return;
    
    let newFilters;
    
    if (type === "EVEN") {
      // If EVEN is clicked, toggle EVEN and turn off others
      newFilters = {
        EVEN: !typeFilters.EVEN,
        ODD: false,
        FP: false,
        CP: false
      };
    } else if (type === "ODD") {
      // If ODD is clicked, toggle ODD and turn off others
      newFilters = {
        EVEN: false,
        ODD: !typeFilters.ODD,
        FP: false,
        CP: false
      };
    } else if (type === "FP") {
      // If FP is clicked, toggle FP and turn off others
      newFilters = {
        EVEN: false,
        ODD: false,
        FP: !typeFilters.FP,
        CP: false
      };
    } else if (type === "CP") {
      // If CP is clicked, toggle CP and turn off others
      newFilters = {
        EVEN: false,
        ODD: false,
        FP: false,
        CP: !typeFilters.CP
      };
    }
    
    onTypeFiltersChange(newFilters);
  };

  // Base styles (your original styles preserved)
  const baseStyles = {
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      gap: "0.5vw",
      width: "100%",
      height: "100%",
      boxSizing: "border-box",
      flexWrap: "nowrap",
      overflow: "hidden",
      padding: "0.3vw",
    },
    button: {
      flex: "0 0 auto",
      padding: "0.3vw 0.8vw",
      fontSize: "1vw",
      borderRadius: "0.3vw",
      color: "white",
      lineHeight: "1.2",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "2vw",
      boxSizing: "border-box",
      whiteSpace: "nowrap",
      border: "none",
      cursor: "pointer",
      minWidth: "0",
    },
    checkbox: {
      width: "1vw",
      height: "1vw",
      marginRight: "0.4vw",
      cursor: "pointer",
      flexShrink: 0,
    },
    cell: (flex = 1) => ({
      flex: `${flex} 0 auto`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.4vw",
      height: "100%",
      boxSizing: "border-box",
      padding: "0 0.2vw",
    }),
    textSpan: {
      color: "black",
      fontSize: "1.25vw",
      textAlign: "center",
      whiteSpace: "nowrap",
      flexShrink: 0,
    },
    select: {
      backgroundColor: "blue",
      color: "#fff",
      border: "none",
      fontWeight: "normal",
      minWidth: "6vw",
      fontSize: "1vw",
      padding: "0.3vw 0.5vw",
      borderRadius: "0.3vw",
      height: "2vw",
      lineHeight: "1.2",
      cursor: "pointer",
      flexShrink: 0,
    },
  };

  return (
    <div style={baseStyles.container}>
      {/* Range Filters with Checkboxes */}
      <div style={baseStyles.cell(1.2)}>
        <input
          type="checkbox"
          style={baseStyles.checkbox}
          checked={allChecked}
          onChange={toggleAll}
        />
        <button
          style={{ ...baseStyles.button, backgroundColor: "black" }}
        >
          All
        </button>
      </div>

      {[
        { label: "10-19", bg: "blue" },
        { label: "30-39", bg: "green" },
        { label: "50-59", bg: "red" },
      ].map((btn, i) => (
        <div key={`range-${i}`} style={baseStyles.cell(1.2)}>
          <input
            type="checkbox"
            style={baseStyles.checkbox}
            checked={checkedRanges[btn.label]}
            onChange={() => toggleCheckbox(btn.label)}
          />
          <button
            style={{ ...baseStyles.button, backgroundColor: btn.bg }}
            onClick={() => handleRangeClick(btn.label)}
          >
            {btn.label}
          </button>
        </div>
      ))}

      {/* Type Filters */}
      {["EVEN", "ODD", "CP", "FP"].map((txt, i) => (
        <div key={`type-${i}`} style={baseStyles.cell(0.9)}>
          <input 
            type="checkbox" 
            style={baseStyles.checkbox}
            checked={(typeFilters && typeFilters[txt]) || false}
            onChange={() => {
              if (txt === "EVEN" || txt === "ODD" || txt === "FP" || txt === "CP") {
                toggleTypeFilter(txt);
              }
            }}
          />
          <span className="type-filter-span" style={baseStyles.textSpan}>
            {txt}
          </span>
        </div>
      ))}

      {/* Action Buttons */}
      {[{ label: "3D Game", bg: "red" }, { label: "Password", bg: "black" }, { label: "Logout", bg: "black" }, { label: "Statement", bg: "red", bold: true }].map((btn, i) => {
        if (btn.label === "Password") {
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
              <button
                style={{
                  ...baseStyles.button,
                  backgroundColor: btn.bg,
                  fontWeight: btn.bold ? "bold" : "normal",
                }}
              >
                {btn.label}
              </button>
            </div>,
          ];
        }
        return (
          <div key={`action-${i}`} style={baseStyles.cell(1.2)}>
            <button
              style={{
                ...baseStyles.button,
                backgroundColor: btn.bg,
                fontWeight: btn.bold ? "bold" : "normal",
              }}
              onClick={() => {
                if (btn.label === "3D Game") {
                  navigate("/threed");
                }
                if (btn.label === "Logout") {
                  // Clear all storage
                  localStorage.clear();
                  sessionStorage.clear();
                  // Redirect to login
                  navigate("/", { replace: true });
                }
              }}
            >
              {btn.label}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Filter;
