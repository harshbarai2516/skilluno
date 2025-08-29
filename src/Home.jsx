import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './App.css';
import Leftcol from './Leftcol';
import RightCol from './RightCol';
import NumberGrid from './NumberGrid'; 
import Filter from './Filter';
import Result from './Result';
import UpperRow from './Upperrow';
import Notification from './Notifcation';
import { time } from 'framer-motion/client';

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
  
  // Time API state
  const [timeData, setTimeData] = useState({
    currentTime: "10:35:02",
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
  };

  // Fetch time from API
  const fetchTimeData = async () => {
    try {
      const response = await fetch("https://api.goldbazar.co.in/api/time/getTime");
      const data = await response.json();
      
      if (data) {
        const newTimeData = {
          currentDate: data.current_date || timeData.currentDate,
          currentTime: data.current_time_12h || timeData.currentTime,
          closeTime: data.next_draw_time_12h || data.closeTime || timeData.closeTime,
          remainingTime: data.remaining_time || timeData.remainingTime,
          pointTotal: data.point_total || data.pointTotal || timeData.pointTotal
        };
        
        setTimeData(newTimeData);
      }
    } catch (error) {
      console.error("Error fetching time data:", error);
    }
  };

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

    async function InsertData(){
    const ticket = sessionStorage.getItem('editedValuesArray') || "1002|500";
    const username = sessionStorage.getItem('username') || "user123"; 
     const ticketlength = sessionStorage.getItem('editedValuesCount') || "0";
    
    let insertResponse = await fetch("https://api.goldbazar.co.in/api/number/insert", {
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
        drawTime: timeData?.closeTime || "",
        currentTime: timeData?.currentTime || "",
        username: username,
      })
    });

    
    
    let insertData = await insertResponse.json();
  }

    async function InsertUsername(){
    const user = sessionStorage.getItem('username') || "user123"; 
    
    let insertResp = await fetch("http://api.goldbazar.co.in/api/balance", {
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



  return (
    <div className="container">
      <div className="section top-section" style={{ height: heights.top }}>
        <div className="top-vertical-container">
          <div className="top-vertical-part part1"><Result selectedRange={selectedRange} timeData={timeData}/></div>
          <div className="top-vertical-part part2"><Notification /></div>
          <div className="top-vertical-part part3"><UpperRow handleRefresh={handleRefresh} timeData={timeData} /></div>
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
             <button className="advance-draw-btn">Advance Draw F9</button>
          </div>
          <div className="footer-col footer-col2">
            <div className="footer-center-row">
              <div className="footer-center-col footer-center-col1">
                <span className="footer-text">Last Transaction:<br/>#22081690601 Pt(40)</span>
              </div>
              <div className="footer-center-col footer-center-col2">
                     <input type="text" placeholder="Barcode" className="barcode-input" />
              </div>
              <div className="footer-center-col footer-center-col3">
                  <button className="buy-now-btn" onClick={InsertUsername}>Buy Now (F6)</button>
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
    </div>
  );
};

export default Home;