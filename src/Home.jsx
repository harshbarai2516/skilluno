import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './App.css';
import Leftcol from './Leftcol';
import RightCol from './RightCol';
import NumberGrid from './NumberGrid';
import Filter from './Filter';
import Result from './Result';
import UpperRow from './Upperrow';
import Notification from './Notifcation';
import AdvanceDraw from './AdvanceDraw';
import { useLocation } from "react-router-dom";



const Home = () => {
  const [selectedRange, setSelectedRange] = useState('10-19');
  const [selectedRangeState, setSelectedRangeState] = useState("1000-1099");
  const [checkedRanges, setCheckedRanges] = useState([]);
  const [checkedIndividualRanges, setCheckedIndividualRanges] = useState([]);
  const [typeFilters, setTypeFilters] = useState({
    EVEN: false,
    ODD: false,
    FP: false,
  });
  const [refreshKey, setRefreshKey] = useState(0);



  // NEW: Store range-specific sums
  const [rangeSums, setRangeSums] = useState({});

  // State for AdvanceDraw modal
  const [showAdvanceDraw, setShowAdvanceDraw] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState([]);

  // State for user balance
  const [userBalance, setUserBalance] = useState(0);
  const [balanceLoading, setBalanceLoading] = useState(false);
  // State for bonus balance
  const [bonusbalance, setBonusBalance] = useState(0);
  const [bonusLoading, setBonusLoading] = useState(false);
  // Fetch bonus balance from API (like fetchUserBalance)
  const fetchBonusBalance = async () => {
    const username = sessionStorage.getItem('username') || "user123";
    setBonusLoading(true);
    try {
      const response = await fetch("https://api.goldbazar.co.in/api/balance/bonus");
      const data = await response.json();
      if (data && data.bonus !== undefined) {
        setBonusBalance(data.bonus);
        console.log("Bonus balance fetched:", data.bonus);
      } else {
        console.error("Invalid bonus balance response:", data);
      }
    } catch (error) {
      console.error("Error fetching bonus balance:", error);
    } finally {
      setBonusLoading(false);
    }
  };



  // Time API state
  const [timeData, setTimeData] = useState({
    currentTime: "10:35:02",
    drawTime: "10:40 am",
    closeTime: "10:45 am",
    remainingTime: "09:58",
    pointTotal: "17080"
  });

  // Calculate total quantity and amount - sum ALL groups' data
  const totalQuantity = useMemo(() => {
    let total = 0;

    // Sum quantities from ALL groups (group-10, group-30, group-50, etc.)
    Object.values(rangeSums).forEach(groupData => {
      if (groupData.quantities) {
        groupData.quantities.forEach(qty => {
          total += (qty || 0);
        });
      }
    });

    return total;
  }, [rangeSums]);

  const totalAmount = useMemo(() => {
    let total = 0;

    // Sum amounts from ALL groups (group-10, group-30, group-50, etc.)
    Object.values(rangeSums).forEach(groupData => {
      if (groupData.amounts) {
        groupData.amounts.forEach(amt => {
          total += (amt || 0);
        });
      }
    });

    return total;
  }, [rangeSums]);

  // Handler for receiving calculated quantities and amounts from NumberGrid
  const handleQuantitiesChange = useCallback((data) => {
    if (data.position !== undefined && data.range) {
      // Fix: Correctly map range to group
      // "1000-1099" → "10", "1100-1199" → "10", "3000-3099" → "30", etc.
      const rangeStart = parseInt(data.range.split('-')[0]);
      const groupNumber = Math.floor(rangeStart / 1000) * 10; // 1000-1999 → 10, 2000-2999 → 20, etc.
      const groupKey = `group-${groupNumber}`;

      setRangeSums(prev => {
        const currentGroupData = prev[groupKey] || { quantities: Array(10).fill(0), amounts: Array(10).fill(0) };

        // Update the specific position with new data
        const updatedQuantities = [...currentGroupData.quantities];
        const updatedAmounts = [...currentGroupData.amounts];

        updatedQuantities[data.position] = data.rangeSum || 0;
        updatedAmounts[data.position] = data.rangeAmount || 0;

        return {
          ...prev,
          [groupKey]: {
            quantities: updatedQuantities,
            amounts: updatedAmounts
          }
        };
      });
    }
  }, []);

  // Reset all state and clear
  const handleRefresh = () => {
    setSelectedRange('10-19');
    setSelectedRangeState('1000-1099');
    setCheckedRanges([]);
    setCheckedIndividualRanges([]);
    setTypeFilters({ EVEN: false, ODD: false, FP: false });
    setRangeSums({}); // Clear all range sums
    setRefreshKey((k) => k + 1);
    // Set AdvanceDraw localStorage items to null
    localStorage.setItem('selectedSlots', "");
    localStorage.setItem('selectedSlotsString', "");
    localStorage.setItem('selectedSlotsString24h', "");
  };

  // Fetch time from API
  const fetchTimeData = async () => {
    try {
      const response = await fetch("https://api.goldbazar.co.in/api/time/getTime");
      const data = await response.json();

      if (data) {
        const newTimeData = {
          currentDate: data.current_date || timeData.currentDate,
          currentTime: data.current_time_24h || timeData.currentTime,
          drawTime: data.next_draw_time_12h || timeData.drawTime,
          nextdrawTime: data.next_draw_time_24h || data.closeTime || timeData.closeTime,
          remainingTime: data.remaining_time || timeData.remainingTime,
          pointTotal: data.point_total || data.pointTotal || timeData.pointTotal
        };

        setTimeData(newTimeData);
      }
    } catch (error) {
      console.error("Error fetching time data:", error);
    }
  };

  // Fetch balance when component mounts and when username changes
  useEffect(() => {
    fetchUserBalance();


    // Set up periodic balance refresh (every 30 seconds)
    const balanceInterval = setInterval(() => {
      fetchUserBalance();
    }, 30000);

    return () => {
      clearInterval(balanceInterval);
    };
  }, []);


  useEffect(() => {
    fetchBonusBalance();
    // Set up periodic bonus balance refresh (every 30 seconds)
    const bonusInterval = setInterval(() => {
      fetchBonusBalance();
    }, 30000);
    return () => {
      clearInterval(bonusInterval);
    };
  }, []);

  // Set up live time updates
  useEffect(() => {
    fetchTimeData();

    const interval = setInterval(() => {
      fetchTimeData();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const setVH = () => {
      document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
    };
    setVH();
    window.addEventListener("resize", setVH);
    return () => window.removeEventListener("resize", setVH);
  }, []);

  const [heights, setHeights] = useState({
    top: '21%',
    main: '72%',
    bottom: '7%'
  });

  useEffect(() => {
    const calculateHeights = () => {
      const windowHeight = window.innerHeight;
      setHeights({
        top: `${0.21 * windowHeight}px`,
        main: `${0.72 * windowHeight}px`,
        bottom: `${0.07 * windowHeight}px`
      });
    };

    calculateHeights();
    window.addEventListener('resize', calculateHeights);
    return () => window.removeEventListener('resize', calculateHeights);
  }, []);


  function barcode() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = String(today.getFullYear()).slice(-2);
    const datePrefix = year + month + day;
    const randomSuffix = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const barcodeValue = datePrefix + randomSuffix;

    return barcodeValue;
  }

  async function InsertData() {
    const ticket = sessionStorage.getItem('editedValuesArray') || "1002|500";
    const username = sessionStorage.getItem('username') || "user123";
    const ticketlength = sessionStorage.getItem('editedValuesCount') || "0";
    const selectedSlotsString = localStorage.getItem('selectedSlotsString') || "";
    const selectedSlotsStringhour = localStorage.getItem('selectedSlotsString24h') || "";

    let insertResponse = await fetch("https://api.goldbazar.co.in/api/record/insert2D", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ticket: ticket,
        ticlen: ticketlength,
        barcode: barcode(),
        totalAmount: totalAmount,
        currentDate: timeData?.currentDate || new Date().toISOString().split('T')[0],
        drawTime: selectedSlotsString || timeData?.drawTime || "",
        nextdrawTime: selectedSlotsStringhour || timeData?.nextdrawTime || "",
        currentTime: timeData?.currentTime || "",
        username: username,
      })
    });



    let insertData = await insertResponse.json();
    handleRefresh();
  }

  // Fetch user balance from API
  const fetchUserBalance = async () => {
    const username = sessionStorage.getItem('username') || "user123";

    setBalanceLoading(true);
    try {
      const response = await fetch("https://api.goldbazar.co.in/api/balance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
        })
      });

      const data = await response.json();

      if (data && data.balance !== undefined) {
        setUserBalance(data.balance);
        console.log("User balance fetched:", data.balance);
      } else {
        console.error("Invalid balance response:", data);
      }
    } catch (error) {
      console.error("Error fetching user balance:", error);
    } finally {
      setBalanceLoading(false);
    }
  };


  async function InsertUsername() {
    const user = sessionStorage.getItem('username') || "user123";

    let insertResp = await fetch("https://api.goldbazar.co.in/api/balance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: user,
      })
    });

    let insertUser = await insertResp.json();
  }

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showAdvanceDraw && event.target.classList.contains('modal-backdrop')) {
        setShowAdvanceDraw(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAdvanceDraw]);

  return (
    <div className="container">
      {/* AdvanceDraw Modal */}
      {showAdvanceDraw && (
        <div className="modal-backdrop">
          <div className="advance-draw-modal">
            <AdvanceDraw
              totalQuantity={totalQuantity}
              setTotalQuantity={() => { }}
            />
          </div>
        </div>
      )}

      <div className="section top-section" style={{ height: heights.top }}>
        <div className="top-vertical-container">
          <div className="top-vertical-part part1"><Result selectedRange={selectedRange} timeData={timeData} /></div>
          <div className="top-vertical-part part2"><Notification /></div>
          <div className="top-vertical-part part3"><UpperRow handleRefresh={handleRefresh} timeData={timeData} userBalance={userBalance} bonusbalance={bonusbalance} /></div>
          <div className="top-vertical-part part4">
            <Filter
              setSelectedRange={setSelectedRange}
              setSelectedRangeState={setSelectedRangeState}
              onCheckedRangesChange={setCheckedRanges}
              typeFilters={typeFilters}
              onTypeFiltersChange={setTypeFilters}
              refresh={refreshKey}
            />
          </div>
        </div>
      </div>

      <div className="section main-section" style={{ height: heights.main }}>
        <div className="middle-container">
          <div className="middle-left">
            <div className="middle-content">
              <Leftcol
                key={refreshKey + '-left'}
                selectedRange={selectedRange}
                selectedRangeState={selectedRangeState}
                setSelectedRangeState={setSelectedRangeState}
                refresh={refreshKey}
                checkedRanges={checkedIndividualRanges}
                onCheckedRangesChange={setCheckedIndividualRanges}
              />
            </div>
          </div>
          <div className="middle-center">
            <div className="middle-content">
              <NumberGrid
                key={refreshKey + '-grid'}
                selectedRangeState={selectedRangeState}
                checkedRanges={checkedRanges}
                checkedIndividualRanges={checkedIndividualRanges}
                typeFilters={typeFilters}
                refresh={refreshKey}
                onQuantitiesChange={handleQuantitiesChange}
              />
            </div>
          </div>
          <div className="middle-right">
            <div className="middle-content">
              {/* Show ALL ranges' sums in RightCol simultaneously */}
              <RightCol
                rangeSums={rangeSums}
                selectedRange={selectedRange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="section bottom-section" style={{ height: heights.bottom }}>
        <div className="footer-row">
          <div className="footer-col footer-col1">
            <button
              className="advance-draw-btn"
              onClick={() => setShowAdvanceDraw(true)}
            >
              Advance Draw F9
            </button>
          </div>
          <div className="footer-col footer-col2">
            <div className="footer-center-row">
              <div className="footer-center-col footer-center-col1">
                <span className="footer-text">Last Transaction:<br />#22081690601 Pt(40)</span>
              </div>
              <div className="footer-center-col footer-center-col2">
                <input type="text" placeholder="Barcode" className="barcode-input" />
              </div>
              <div className="footer-center-col footer-center-col3">
                <button className="buy-now-btn" onClick={InsertData}>Buy Now (F6)</button>
              </div>
            </div>
          </div>
          <div className="footer-col footer-col3">
            <div className="section3-part-3">
              <button className="advance-sum-btn">{totalQuantity}</button>
              <button className="advance-sum-btn">{totalAmount}</button>
            </div>
          </div>
        </div>
      </div>

      <style jsx='true'>{`
    
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          overflow: hidden;
        }

        .advance-draw-modal {
          position: relative;
          background: #fff;
          border-radius: 16px;
          width: clamp(320px, 90vw, 700px);
          min-width: 260px;
          max-width: 98vw;
          min-height: 200px;
          max-height: 95vh;
          padding: 2.5vw 2vw 2vw 2vw;
          box-sizing: border-box;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          display: flex;
          flex-direction: column;
          align-items: stretch;
          justify-content: flex-start;
          gap: 1.5vw;
          overflow: visible;
        }

        .advance-draw-modal * {
          box-sizing: border-box;
        }

        .advance-draw-modal > * {
          flex-shrink: 1;
          min-width: 0;
        }

        .advance-draw-modal input,
        .advance-draw-modal button,
        .advance-draw-modal select {
          font-size: clamp(0.9rem, 2vw, 1.1rem);
          padding: 0.4em 0.7em;
          border-radius: 8px;
        }

        .advance-draw-modal .grid,
        .advance-draw-modal .row,
        .advance-draw-modal .col {
          gap: 0.5vw;
          padding: 0.2vw;
        }

        .advance-draw-modal .grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
        }

        .advance-draw-modal .grid > * {
          flex: 1 1 60px;
          min-width: 40px;
          max-width: 90px;
          margin: 0.2vw;
        }

        .modal-close-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          background: #a05a0a;
          border: none;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          color: white;
          font-weight: bold;
          cursor: pointer;
          z-index: 1001;
        }

        @media (max-width: 768px) {
          .advance-draw-modal {
            width: 99vw;
            max-width: 99vw;
            min-width: 0;
            padding: 2vw 1vw 1vw 1vw;
            border-radius: 10px;
            gap: 2vw;
          }
          .modal-close-btn {
            top: 5px;
            right: 5px;
            width: 25px;
            height: 25px;
            font-size: 12px;
          }
        }

        @media (max-width: 480px) {
          .advance-draw-modal {
            width: 100vw;
            height: 100vh;
            max-width: 100vw;
            max-height: 100vh;
            min-width: 0;
            min-height: 0;
            border-radius: 0;
            padding: 1vw 0.5vw 0.5vw 0.5vw;
            gap: 1vw;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;