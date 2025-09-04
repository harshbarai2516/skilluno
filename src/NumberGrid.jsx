import React, { useState, useMemo } from "react";

import { useEffect } from "react";

export default function NumberGrid({ selectedRangeState, checkedRanges = [], checkedIndividualRanges = [], typeFilters = { EVEN: false, ODD: false, FP: false }, refresh, onQuantitiesChange }) {
  // Track if we've been refreshed to ignore old state
  const [hasBeenRefreshed, setHasBeenRefreshed] = useState(false);

  // Track the last edited cell position for FP logic
  const [lastEditedPosition, setLastEditedPosition] = useState(null);

  // Clear all values when refresh changes
  useEffect(() => {
    setRowValues({});
    setCellValues({});
    setHeaderValues({});
    setInputDataObject({});
    setLastEditedPosition(null);
    setHasBeenRefreshed(true);
  }, [refresh]);

  // Reset last edited position when FP filter is turned off
  useEffect(() => {
    if (!typeFilters.FP) {
      setLastEditedPosition(null);
    }
  }, [typeFilters.FP]);
  const columns = ["B0", 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const blocks = Array.from({ length: 10 }, (_, i) => `F${i}`);

  const [rowValues, setRowValues] = useState({});
  const [cellValues, setCellValues] = useState({});
  const [headerValues, setHeaderValues] = useState({});
  const [inputDataObject, setInputDataObject] = useState({});

  // Convert range like "1000-1099" to group format "10-19"
  const groupForRange = (range) => {
    if (!range || !range.includes('-')) return null;
    
    const start = parseInt(range.split('-')[0]);
    if (isNaN(start)) return null;
    
    const groupStart = Math.floor(start / 100);
    return `${groupStart}-${groupStart + 9}`;
  };

  // Simple range-wise calculation for all target ranges
  const calculateQuantitiesAndAmounts = () => {
    const active = selectedRangeState;
    if (!active) return [];

    // Get ALL target ranges (active + checked ranges)
    const targets = targetRangesFor(active);
    const results = [];

    targets.forEach(range => {
      // Fix: Get the correct position for this range (0-9)
      const startNum = parseInt(range.split('-')[0]);
      const position = Math.floor((startNum % 1000) / 100); // 1000-1099 → 0, 1100-1199 → 1, 1200-1299 → 2, etc.

      // Sum values for this specific range
      let rangeSum = 0;
      Object.keys(cellValues).forEach(key => {
        if (key.startsWith(`${range}-`)) {
          const value = cellValues[key];
          const numValue = parseFloat(value) || 0;
          rangeSum += numValue;
        }
      });

      results.push({
        rangeSum: rangeSum,
        rangeAmount: rangeSum * 2,
        position: position,
        range: range
      });
    });

    return results;
  };

  // Update parent component when cell values OR checkboxes change
  useEffect(() => {
    if (onQuantitiesChange) {
      const results = calculateQuantitiesAndAmounts();
      // Send all results to parent
      results.forEach(result => {
        onQuantitiesChange(result);
      });
    }
  }, [cellValues, onQuantitiesChange, checkedRanges, checkedIndividualRanges, typeFilters, selectedRangeState]); // Added ALL dependencies

  // Create comprehensive input data object
  const updateInputDataObject = (key, value, num, rangeItem) => {
    setInputDataObject((prevInputData) => {
      const newInputData = { ...prevInputData };

      // Create a unique key that includes both the range and number
      // This ensures the same number in different ranges is stored separately
      const uniqueKey = `${rangeItem}-${num}`;

      // If value is empty, remove the key instead of storing empty value
      if (!value || value.trim() === '') {
        delete newInputData[uniqueKey];
      } else {
        newInputData[uniqueKey] = {
          value: value,
          number: num,
          range: rangeItem,
          timestamp: Date.now()
        };
      }

      console.log("Input Data Object Updated:", newInputData);

      // Store in session storage
      try {
        // Group by range first, then by number
        const rangeData = {};
        
        Object.values(newInputData).forEach(data => {
          if (data.value && data.value.trim() !== '') {
            if (!rangeData[data.range]) {
              rangeData[data.range] = {};
            }
            rangeData[data.range][data.number] = data.value;
          }
        });

        // Convert to a flat array for storage: number|value|range
        const editedValuesArray = [];
        Object.entries(rangeData).forEach(([range, numbers]) => {
          Object.entries(numbers).forEach(([number, value]) => {
            editedValuesArray.push(`${number}|${value}`);
          });
        });

        // Store the array as comma-separated string
        sessionStorage.setItem('editedValuesArray', editedValuesArray.join(','));
        
        // Also store the structured data for easier retrieval
        sessionStorage.setItem('editedValuesStructured', JSON.stringify(rangeData));
        
        // Store the count
        sessionStorage.setItem('editedValuesCount', editedValuesArray.length.toString());

        console.log("📦 Stored to sessionStorage:", {
          structured: rangeData,
          flatArray: editedValuesArray,
          count: editedValuesArray.length,
          totalEntries: Object.keys(newInputData).length,
          uniqueNumbers: new Set(editedValuesArray.map(item => item.split('|')[0])).size,
          uniqueRanges: Object.keys(rangeData).length
        });
      } catch (error) {
        console.error("Error storing to sessionStorage:", error);
      }

      return newInputData;
    });
  };

  // parse a range string like "1000-1099"
  const parseRange = (rangeKey) => {
    if (!rangeKey) return null;
    const parts = rangeKey.split("-").map((p) => Number(p));
    if (parts.length !== 2 || parts.some((n) => Number.isNaN(n))) return null;
    return { start: parts[0], end: parts[1] };
  };

  // compute numbers matrix for current selected range (same as before)
  const numbers = useMemo(() => {
    const out = [];
    if (!selectedRangeState) return out;
    const [start, end] = selectedRangeState.split("-").map(Number);
    for (let i = 0; i < 10; i++) {
      const row = [];
      for (let j = 0; j < 10; j++) {
        const num = start + i * 10 + j;
        if (num <= end) row.push(num);
      }
      out.push(row);
    }
    return out;
  }, [selectedRangeState]);

  const getNumberFor = (rangeKey, rowIdx, colIdx) => {
    const parsed = parseRange(rangeKey);
    if (!parsed) return undefined;
    const { start, end } = parsed;
    const num = start + rowIdx * 10 + colIdx;
    return num <= end ? num : undefined;
  };

  // Helper: get FP (Fixed Position) editable positions for a given cell
  const getFpEditPositions = (selectedRowIdx, selectedColIdx) => {
    const positions = new Set();

    // Original position
    positions.add(`${selectedRowIdx}-${selectedColIdx}`);

    // +5 offset positions (with modulo 10 wrapping)
    positions.add(`${selectedRowIdx}-${(selectedColIdx + 5) % 10}`);
    positions.add(`${(selectedRowIdx + 5) % 10}-${selectedColIdx}`);
    positions.add(`${(selectedRowIdx + 5) % 10}-${(selectedColIdx + 5) % 10}`);

    // Mirror positions (swap row and column)
    positions.add(`${selectedColIdx}-${selectedRowIdx}`);
    positions.add(`${selectedColIdx}-${(selectedRowIdx + 5) % 10}`);
    positions.add(`${(selectedColIdx + 5) % 10}-${selectedRowIdx}`);
    positions.add(`${(selectedColIdx + 5) % 10}-${(selectedRowIdx + 5) % 10}`);

    return positions;
  };

  // Helper: check if editing is allowed based on type filters
  const isEditingAllowed = (num, rowIdx, colIdx) => {
    // If no type filters are active, allow all editing
    if (!typeFilters.EVEN && !typeFilters.ODD && !typeFilters.FP && !typeFilters.CP) {
      return true;
    }

    // Check based on active filter (mutually exclusive)
    if (typeFilters.EVEN) {
      return num % 2 === 0; // Only allow even numbers
    }

    if (typeFilters.ODD) {
      return num % 2 !== 0; // Only allow odd numbers
    }

    if (typeFilters.FP) {
      // FP logic: ALL cells remain editable, FP only controls mirroring behavior
      return true;
    }

    if (typeFilters.CP) {
      // CP logic: ALL cells remain editable, CP only controls diagonal mirroring behavior
      return true;
    }

    return true;
  };

  // Helper: get checked individual ranges from props instead of localStorage
  const getCheckedIndividualRanges = () => {
    return Array.isArray(checkedIndividualRanges) ? checkedIndividualRanges : [];
  };

  // Helper: convert filter group (e.g., "30-39") to corresponding 100-range based on active range index
  const getMirrorRangeFor = (groupLabel, activeRange) => {
    const activeGroupStart = Math.floor(parseInt(activeRange.split('-')[0]) / 1000) * 10;
    const activeGroup = `${activeGroupStart}-${activeGroupStart + 9}`;

    if (groupLabel === activeGroup) return null; // Don't mirror to self

    // Find which 100-range index we're in (0-9)
    const activeStart = parseInt(activeRange.split('-')[0]);
    const indexInGroup = Math.floor((activeStart % 1000) / 100);

    // Build corresponding range in target group
    const groupStart = parseInt(groupLabel.split('-')[0]);
    const targetThousands = (groupStart / 10) * 1000;
    const targetStart = targetThousands + (indexInGroup * 100);

    return `${targetStart}-${targetStart + 99}`;
  };

  // Reset refresh flag when ranges are actively used again
  useEffect(() => {
    const individualChecked = getCheckedIndividualRanges();
    if (hasBeenRefreshed && (individualChecked.length > 0 || (checkedRanges && checkedRanges.length > 0))) {
      setHasBeenRefreshed(false);
    }
  }, [checkedRanges, checkedIndividualRanges, hasBeenRefreshed]);

  const targetRangesFor = (active) => {
    // If ANY checkboxes are checked (either filter groups or individual ranges), enable mirroring
    const anyCheckboxesChecked = (checkedRanges && checkedRanges.length > 0) || 
                                 (checkedIndividualRanges && checkedIndividualRanges.length > 0);

    // If NO boxes are checked anywhere, edits stay local
    if (!anyCheckboxesChecked) {
      return [active];
    }

    // After refresh, only use the active range until new ranges are explicitly checked
    if (hasBeenRefreshed) {
      return [active];
    }

    const targets = new Set([active]); // Always include active range

    // Add individual checked ranges from props
    const individualChecked = getCheckedIndividualRanges();
    individualChecked.forEach(range => {
      if (/^\d{4}-\d{4}$/.test(range)) {
        targets.add(range);
      }
    });

    // For each checked filter group from Filter component, add the corresponding aligned range
    (checkedRanges || []).forEach((checked) => {
      if (/^\d{2}-\d{2}$/.test(checked)) { // Filter group like "30-39"
        const mirrorRange = getMirrorRangeFor(checked, active);
        if (mirrorRange) {
          targets.add(mirrorRange);
        }
      } else if (/^\d{4}-\d{4}$/.test(checked)) { // Direct 100-range
        targets.add(checked);
      }
    });

    // NEW: Also mirror checked individual ranges to other filter groups
    individualChecked.forEach(checkedRange => {
      if (/^\d{4}-\d{4}$/.test(checkedRange)) {
        (checkedRanges || []).forEach((filterGroup) => {
          if (/^\d{2}-\d{2}$/.test(filterGroup)) {
            const mirrorRange = getMirrorRangeFor(filterGroup, checkedRange);
            if (mirrorRange) {
              targets.add(mirrorRange);
            }
          }
        });
      }
    });

    return Array.from(targets);
  };

  // Block (row) capsule change
  const handleBlockInputChange = (rowIdx, value) => {
    const active = selectedRangeState;
    if (!active) return;
    const targets = targetRangesFor(active);

    // store row value for every target range
    setRowValues((prev) => {
      const next = { ...prev };
      targets.forEach((r) => {
        next[`${r}-${rowIdx}`] = value;
        // Don't track block input data separately - only track individual cells
      });
      return next;
    });

    // apply to every cell in that row for every target range (respecting EVEN/ODD filters)
    setCellValues((prev) => {
      const next = { ...prev };
      const cellsToUpdate = new Map(); // Use Map to avoid duplicates by number

      targets.forEach((r) => {
        for (let col = 0; col < columns.length; col++) {
          const mappedNum = getNumberFor(r, rowIdx, col);
          if (mappedNum !== undefined && isEditingAllowed(mappedNum, rowIdx, col)) {
            next[`${r}-${rowIdx}-${mappedNum}`] = value;
            // Store by number to avoid duplicates
            cellsToUpdate.set(mappedNum, { value, number: mappedNum, range: r });
          }
        }
      });

      // fallback for current grid cells (keeps UI consistent, respecting type filters)
      numbers[rowIdx]?.forEach((num, colIdx) => {
        if (isEditingAllowed(num, rowIdx, colIdx)) {
          next[`${rowIdx}-${num}`] = value;
          // Only add if not already in the map
          if (!cellsToUpdate.has(num)) {
            cellsToUpdate.set(num, { value, number: num, range: active });
          }
        }
      });

      // Batch update all unique cells at once
      if (cellsToUpdate.size > 0) {
        const newInputData = { ...inputDataObject };

        // Remove any existing entries for these numbers first
        Object.keys(newInputData).forEach(key => {
          const data = newInputData[key];
          if (cellsToUpdate.has(data.number)) {
            delete newInputData[key];
          }
        });

        // Add new entries
        cellsToUpdate.forEach(({ value, number, range }, num) => {
          if (value && value.trim() !== '') {
            const uniqueKey = `${range}-${number}`;
            newInputData[uniqueKey] = { value, number, range };
          }
        });

        setInputDataObject(newInputData);

        // Store in session storage - batch update
        try {
          // Group by range first, then by number
          const rangeData = {};
          
          Object.values(newInputData).forEach(data => {
            if (data.value && data.value.trim() !== '') {
              if (!rangeData[data.range]) {
                rangeData[data.range] = {};
              }
              rangeData[data.range][data.number] = data.value;
            }
          });

          // Convert to a flat array for storage: number|value|range
          const editedValuesArray = [];
          Object.entries(rangeData).forEach(([range, numbers]) => {
            Object.entries(numbers).forEach(([number, value]) => {
              editedValuesArray.push(`${number}|${value}`);
            });
          });

          sessionStorage.setItem('editedValuesArray', editedValuesArray.join(','));
          sessionStorage.setItem('editedValuesStructured', JSON.stringify(rangeData));
          sessionStorage.setItem('editedValuesCount', editedValuesArray.length.toString());

          console.log("📦 Block Input - Stored to sessionStorage:", {
            array: editedValuesArray,
            count: editedValuesArray.length,
            uniqueNumbers: cellsToUpdate.size
          });
        } catch (error) {
          console.error("Error storing to sessionStorage:", error);
        }
      }

      return next;
    });
  };

  // Single cell change
  const handleCellInputChange = (rowIdx, num, value) => {
    const active = selectedRangeState;
    if (!active) return;

    let colIdx = numbers[rowIdx]?.indexOf(num);
    // Defensive: If colIdx is undefined, calculate it from numbers[rowIdx]
    if (typeof colIdx !== 'number' || colIdx < 0) {
      if (Array.isArray(numbers[rowIdx])) {
        colIdx = numbers[rowIdx].indexOf(num);
      }
    }

    // Check if editing is allowed based on type filters
    if (!isEditingAllowed(num, rowIdx, colIdx)) {
      return; // Block editing if not allowed
    }

    // --- FP LOGIC MIRROR ---
    // For FP, update lastEditedPosition to the cell being edited (like CP logic)
    if (typeFilters.FP) {
      setLastEditedPosition({ rowIdx, colIdx });
    }

    const targets = targetRangesFor(active);

    setCellValues((prev) => {
      const next = { ...prev };

      // If CP is active, handle diagonal pattern differently
      if (typeFilters.CP && value) {
        // FIRST: Clear all previous values when entering new value in CP mode
        targets.forEach((r) => {
          for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
              const clearNum = getNumberFor(r, row, col);
              if (clearNum !== undefined) {
                next[`${r}-${row}-${clearNum}`] = '';
                updateInputDataObject(`${r}-${clearNum}`, '', clearNum, r);
              }
            }
          }
        });

        // THEN: Apply diagonal pattern including the original cell
        const applyDiagonalPattern = (startRow, startCol) => {
          // Include the original cell first
          targets.forEach((r) => {
            const originalNum = getNumberFor(r, startRow, startCol);
            if (originalNum !== undefined) {
              next[`${r}-${startRow}-${originalNum}`] = value;
              updateInputDataObject(`${r}-${originalNum}`, value, originalNum, r);
            }
          });

          // 4 diagonal directions: up-left, up-right, down-left, down-right
          const directions = [
            [-1, -1], // up-left
            [-1, +1], // up-right  
            [+1, -1], // down-left
            [+1, +1]  // down-right
          ];

          directions.forEach(([rowDelta, colDelta]) => {
            let currentRow = startRow + rowDelta;
            let currentCol = startCol + colDelta;

            // Continue in this diagonal direction until boundary
            // Grid is 10x10 (rows 0-9, cols 0-9)
            while (currentRow >= 0 && currentRow < 10 && currentCol >= 0 && currentCol < 10) {
              targets.forEach((r) => {
                const diagonalNum = getNumberFor(r, currentRow, currentCol);
                if (diagonalNum !== undefined) {
                  next[`${r}-${currentRow}-${diagonalNum}`] = value;
                  updateInputDataObject(`${r}-${diagonalNum}`, value, diagonalNum, r);
                }
              });

              // Move to next diagonal position
              currentRow += rowDelta;
              currentCol += colDelta;
            }
          });
        };

        // Apply diagonal pattern from the edited cell position
        applyDiagonalPattern(rowIdx, colIdx);
      } else if (typeFilters.FP) {
        // Mirror value to all FP group cells
        const fpPositions = getFpEditPositions(rowIdx, colIdx);
        fpPositions.forEach((pos) => {
          const [fpRow, fpCol] = pos.split('-').map(Number);
          targets.forEach((r) => {
            const mappedNum = getNumberFor(r, fpRow, fpCol);
            if (mappedNum !== undefined) {
              next[`${r}-${fpRow}-${mappedNum}`] = value;
              updateInputDataObject(`${r}-${mappedNum}`, value, mappedNum, r);
            }
          });
        });
      } else {
        // Normal logic for other cases: only update the edited cell
        targets.forEach((r) => {
          const mappedNum = getNumberFor(r, rowIdx, colIdx);
          if (mappedNum !== undefined) {
            next[`${r}-${rowIdx}-${mappedNum}`] = value;
            updateInputDataObject(`${r}-${mappedNum}`, value, mappedNum, r);
          }
        });
      }

      // fallback key for active display
      next[`${rowIdx}-${num}`] = value;
      // Update input data object for fallback key
      updateInputDataObject(`${active}-${num}`, value, num, active);

      return next;
    });
  };

  // Header capsule change
  const handleHeaderInputChange = (colIdx, value) => {
    const active = selectedRangeState;
    if (!active) return;
    const targets = targetRangesFor(active);

    // store header value per range+col
    setHeaderValues((prev) => {
      const next = { ...prev };
      targets.forEach((r) => {
        next[`${r}-${colIdx}`] = value;
        // Don't track header input data separately - only track individual cells
      });
      return next;
    });

    // apply header value to every existing row cell at that column for every target range (respecting EVEN/ODD filters)
    setCellValues((prev) => {
      const next = { ...prev };
      const cellsToUpdate = new Map(); // Use Map to avoid duplicates by number

      targets.forEach((r) => {
        for (let rowIdx = 0; rowIdx < blocks.length; rowIdx++) {
          const mappedNum = getNumberFor(r, rowIdx, colIdx);
          if (mappedNum !== undefined && isEditingAllowed(mappedNum, rowIdx, colIdx)) {
            next[`${r}-${rowIdx}-${mappedNum}`] = value;
            // Store by number to avoid duplicates
            cellsToUpdate.set(mappedNum, { value, number: mappedNum, range: r });
          }
        }
      });

      // Also update fallback keys for active range display (respecting type filters)
      for (let rowIdx = 0; rowIdx < blocks.length; rowIdx++) {
        const numInActive = getNumberFor(active, rowIdx, colIdx);
        if (numInActive !== undefined && isEditingAllowed(numInActive, rowIdx, colIdx)) {
          next[`${rowIdx}-${numInActive}`] = value;
          // Only add if not already in the map
          if (!cellsToUpdate.has(numInActive)) {
            cellsToUpdate.set(numInActive, { value, number: numInActive, range: active });
          }
        }
      }

      // Batch update all unique cells at once
      if (cellsToUpdate.size > 0) {
        const newInputData = { ...inputDataObject };

        // Remove any existing entries for these numbers first
        Object.keys(newInputData).forEach(key => {
          const data = newInputData[key];
          if (cellsToUpdate.has(data.number)) {
            delete newInputData[key];
          }
        });

        // Add new entries
        cellsToUpdate.forEach(({ value, number, range }, num) => {
          if (value && value.trim() !== '') {
            const uniqueKey = `${range}-${number}`;
            newInputData[uniqueKey] = { value, number, range };
          }
        });

        setInputDataObject(newInputData);

        // Store in session storage - batch update
        try {
          // Group by range first, then by number
          const rangeData = {};
          
          Object.values(newInputData).forEach(data => {
            if (data.value && data.value.trim() !== '') {
              if (!rangeData[data.range]) {
                rangeData[data.range] = {};
              }
              rangeData[data.range][data.number] = data.value;
            }
          });

          // Convert to a flat array for storage: number|value|range
          const editedValuesArray = [];
          Object.entries(rangeData).forEach(([range, numbers]) => {
            Object.entries(numbers).forEach(([number, value]) => {
              editedValuesArray.push(`${number}|${value}`);
            });
          });

          sessionStorage.setItem('editedValuesArray', editedValuesArray.join(','));
          sessionStorage.setItem('editedValuesStructured', JSON.stringify(rangeData));
          sessionStorage.setItem('editedValuesCount', editedValuesArray.length.toString());

          console.log("📦 Header Input - Stored to sessionStorage:", {
            array: editedValuesArray,
            count: editedValuesArray.length,
            uniqueNumbers: cellsToUpdate.size
          });
        } catch (error) {
          console.error("Error storing to sessionStorage:", error);
        }
      }

      return next;
    });
  };

  return (
    <div className="number-grid-container">
      <div className="grid-wrapper">
        {/* Header row */}
        <div
          className="grid-header"
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
            margin: 0,
            gap: 0,
          }}
        >
          BLOCK
        </div>

        {columns.map((col, colIdx) => (
          <div
            key={col}
            className="grid-header"
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
            }}
          >
            {col}
            <div className="number-capsule" style={{ margin: 0 }}>
              <input
                type="number"
                className="capsule-input"
                placeholder=""
                value={headerValues[`${selectedRangeState}-${colIdx}`] || ""}
                onChange={(e) => handleHeaderInputChange(colIdx, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.target.blur(); // Remove focus on Enter
                  }
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  fontWeight: "bold",
                  border: "none",
                  outline: "none",
                  textAlign: "center",
                  background: "transparent",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 0,
                }}
              />
            </div>
          </div>
        ))}

        {/* Data rows */}
        {blocks.map((block, rowIdx) => (
          <React.Fragment key={block}>
            <div className="grid-cell grid-block-cell">
              <div className="number-text">{block}</div>
              <div className="number-capsule">
                <input
                  type="number"
                  className="capsule-input"
                  placeholder=""
                  value={rowValues[`${selectedRangeState}-${rowIdx}`] || ""}
                  onChange={(e) => handleBlockInputChange(rowIdx, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.target.blur(); // Remove focus on Enter
                    }
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    fontWeight: "bold",
                    border: "none",
                    outline: "none",
                    textAlign: "center",
                    background: "transparent",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 0,
                  }}
                />
              </div>
            </div>

            {numbers[rowIdx] &&
              numbers[rowIdx].map((num, colIdx) => {
                const value =
                  cellValues[`${selectedRangeState}-${rowIdx}-${num}`] ??
                  cellValues[`${selectedRangeState}-${num}`] ??
                  "";

                const isDisabled = !isEditingAllowed(num, rowIdx, colIdx);

                return (
                  <div key={num} className="grid-cell">
                    <div className="number-text">{num}</div>
                    <div className={`number-capsule ${isDisabled ? 'disabled' : ''}`}>
                      <input
                        type="number"
                        className="capsule-input"
                        placeholder=""
                        value={value}
                        disabled={isDisabled}
                        onChange={(e) => handleCellInputChange(rowIdx, num, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.target.blur(); // Remove focus on Enter
                          }
                        }}
                        style={{
                          width: "100%",
                          height: "100%",
                          fontWeight: "bold",
                          border: "none",
                          outline: "none",
                          textAlign: "center",
                          background: "transparent",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: 0,
                          opacity: isDisabled ? 0.4 : 1,
                          cursor: isDisabled ? 'not-allowed' : 'text',
                        }}
                      />
                    </div>
                  </div>
                );
              })}
          </React.Fragment>
        ))}
      </div>

      <style jsx='true'>{`

        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
        }

        input[type="number"] {
        -moz-appearance: textfield;
        }

        .number-grid-container {
          width: 100%;
          height: 100%;
          max-height: 100%;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          overflow-y: hidden;
          background: #f5f5f5;
        }

        .grid-wrapper {
          display: grid;
          grid-template-columns: repeat(${columns.length + 1}, minmax(0, 1fr));
          width: 100%;
          height: 100%;
          max-height: 100%;
          gap: 0;
          overflow-y: hidden;
        }

        .grid-header {
          font-weight: 800;
          text-align: center;
          color: #000 !important;
          font-size: calc(13px + 0.5vw); /* desktop default */
          display: flex;
          align-items: center;
          justify-content: center;
          background: #e0e0e0;
          border-radius: 4px;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .grid-cell {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          border-radius: 4px;
          overflow: hidden;
          min-height: 0;
          max-height: 100%;
          flex-shrink: 1;
        }

        .grid-block-cell {
          background: #e0e0e0;
        }

        .number-text {
          font-weight: 800;
          line-height: 1;
          font-size: calc(13px + 0.5vw); /* desktop default */
          color: #000 !important;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
          text-align: center;
          margin: 0;
        }

        .number-capsule {
          border-radius: 999px;
          border: 1.5px solid #6a1b9a;
          background-color: white;
          width: calc(60px + 2vw);   /* desktop default */
          height: calc(20px + 1vw);  /* desktop default */
          min-width: 30px;
          min-height: 10px;
          flex-shrink: 0;
          justify-content: center;
          align-items: center;
        }

        .number-capsule.disabled {
          border-color: #ccc;
          background-color: #f5f5f5;
          opacity: 0.6;
        }

        /* Laptops */
        @media (max-width: 1366px) {
          .number-text { font-size: calc(10px + 0.5vw); }
          .number-capsule { width: calc(45px + 2vw); height: calc(17px + 0.9vw); }
        }

        /* Large desktop */
        @media (min-width: 1600px) {
          .number-text {
            font-size: calc(17px + 0.5vw);
            margin-bottom: 4px;
          }
          .number-capsule {
            width: calc(40px + 1vw);
            height: calc(15px + 0.5vw);
          }
        }

        /* Desktop/Laptops */
        @media (min-width: 1025px) and (max-width: 1599px) {
          .number-capsule {
            width: calc(36px + 1vw);
            height: calc(15px + 0.5vw);
          }
        }
          .grid-header { font-size: calc(7px + 0.5vw); font-weight: 800; }
          .number-text { font-size: calc(8px + 0.5vw); font-weight: 800; }
          .number-capsule { width: calc(28px + 2vw); height: calc(9px + 0.9vw); border-width: 1.1px; }
        }

        /* Small phones */
        @media (max-width: 400px) {
          .grid-header { font-size: calc(6px + 0.5vw); font-weight: 800; }
          .number-text { font-size: calc(5px + 0.5vw); font-weight: 800; }
          .number-capsule { width: calc(22px + 2vw); height: calc(7px + 0.9vw); }
        }

        /* Landscape */
        @media (max-height: 500px) and (orientation: landscape) {
          .grid-header { font-size: calc(7px + 0.5vh); font-weight: 800; }
          .number-text { font-size: calc(6px + 0.5vh); font-weight: 800; }
          .number-capsule { width: calc(25px + 2vh); height: calc(9px + 0.9vh); }
        }

        /* High contrast */
        @media (forced-colors: active) {
          .grid-header { background: ButtonFace; color: #000 !important; font-weight: 800; }
          .grid-cell { background: Canvas; color: #000 !important; }
          .number-text { font-weight: 800; }
          .number-capsule { border-color: #000; background: Canvas; }
        }

        .capsule-input {
          font-size: 1rem; /* Default font size */
        }

        @media (max-width: 1200px) {
          .capsule-input {
            font-size: 0.9rem;
          }
        }

        @media (max-width: 992px) {
          .capsule-input {
            font-size: 0.6rem;
          }
        }

        @media (max-width: 768px) {
          .capsule-input {
            font-size: 0.5rem;
          }
        }

        @media (max-width: 576px) {
          .capsule-input {
            font-size: 0.5rem;
          }
        }

        @media (max-width: 400px) {
          .capsule-input {
            font-size: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}