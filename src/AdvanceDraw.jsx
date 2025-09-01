// Module-level variable to store all selected slots
let allSelectedSlots = [];
let selectedSlotsString = '';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const SLOT_INTERVAL_MINUTES = 15;
const START_TIME = '09:00';
const END_TIME = '22:00';

function generateTimeSlots(start, end, interval) {
  const slots = [];
  let [h, m] = start.split(':').map(Number);
  const [endH, endM] = end.split(':').map(Number);
  while (h < endH || (h === endH && m <= endM)) {
    const ampm = h < 12 ? 'am' : 'pm';
    const displayH = h > 12 ? h - 12 : h;
    slots.push({
      label: `${displayH.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${ampm}`,
      hour: h,
      minute: m
    });
    m += interval;
    if (m >= 60) {
      h += Math.floor(m / 60);
      m = m % 60;
    }
  }
  return slots;
}

export default function AdvanceDraw() {
  const navigate = useNavigate();

  const [selectedSlots, setSelectedSlots] = useState(() => {
    const savedSlots = localStorage.getItem('selectedSlots');
    if (savedSlots) {
      try {
        return JSON.parse(savedSlots);
      } catch {
        return [];
      }
    }
    return [];
  });
  // To store the latest string for navigation
  let latestSelectedSlotsString = '';

  // Variable to store 24h format string
  let selectedSlotsString24h = '';

  // Function to convert 12h slot string to 24h format
  function convertSlotsStringTo24h(selectedSlotsString) {
    if (!selectedSlotsString) return '';
    return selectedSlotsString.split(',').map(timeStr => {
      // timeStr example: "10:30 am" or "12:45 pm"
      const [time, ampm] = timeStr.trim().split(' ');
      let [h, m] = time.split(':').map(Number);
      if (ampm === 'pm' && h !== 12) h += 12;
      if (ampm === 'am' && h === 12) h = 0;
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
    }).join(',');
  }


  // Save selected slots to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('selectedSlots', JSON.stringify(selectedSlots));
  }, [selectedSlots]);

  // Function to store and log selected slots
  function handleStoreSlots() {
    if (selectedSlots.length > 0) {
      selectedSlotsString = selectedSlots.join(',');
      latestSelectedSlotsString = selectedSlotsString;
      allSelectedSlots.push([...selectedSlots]);
      console.log('Selected Slots String:', selectedSlotsString);
      // Store in localStorage for persistence
      localStorage.setItem('selectedSlotsString', selectedSlotsString);
  // Convert to 24h format and store
  selectedSlotsString24h = convertSlotsStringTo24h(selectedSlotsString);
  localStorage.setItem('selectedSlotsString24h', selectedSlotsString24h);
      navigate('-1');
    } else {
      selectedSlotsString = '';
      latestSelectedSlotsString = '';
      console.log('No slots selected.');
      localStorage.setItem('selectedSlotsString', '');
  localStorage.setItem('selectedSlotsString24h', '');
      navigate('-1');
    }
  }



  const [remainingDraw, setRemainingDraw] = useState(54);
  const [search, setSearch] = useState('');
  const [allSlots, setAllSlots] = useState([]);
  const [visibleSlots, setVisibleSlots] = useState([]);
  const [nextDrawIn, setNextDrawIn] = useState('00:00');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // Add react-router-dom navigate

  useEffect(() => {
    setAllSlots(generateTimeSlots(START_TIME, END_TIME, SLOT_INTERVAL_MINUTES));
  }, []);

  useEffect(() => {
    const updateSlots = () => {
      const now = new Date();
      const nowMinutes = now.getHours() * 60 + now.getMinutes();
      const filtered = allSlots.filter(slot => (slot.hour * 60 + slot.minute) > nowMinutes);
      setVisibleSlots(filtered);

      // Next draw countdown
      if (filtered.length > 0) {
        const nextSlot = filtered[0];
        const nextSlotDate = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          nextSlot.hour,
          nextSlot.minute,
          0,
          0
        );
        let diff = Math.floor((nextSlotDate - now) / 1000);
        if (diff < 0) diff = 0;
        const m = Math.floor(diff / 60);
        const s = diff % 60;
        setNextDrawIn(`${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
      } else {
        setNextDrawIn('--:--');
      }
    };
    updateSlots();
    const timer = setInterval(updateSlots, 1000);
    return () => clearInterval(timer);
  }, [allSlots]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSlotPress = slotLabel => {
    setSelectedSlots(prev =>
      prev.includes(slotLabel)
        ? prev.filter(s => s !== slotLabel)
        : [...prev, slotLabel]
    );
  };

  const handleSelectAll = () => {
    if (selectedSlots.length === visibleSlots.length) {
      setSelectedSlots([]);
    } else {
      setSelectedSlots(visibleSlots.map(slot => slot.label));
    }
  };

  // Calculate grid columns based on window width
  const slotWidth = 90; // px
  const columns = Math.max(1, Math.floor(windowWidth / slotWidth));

  // Arrange slots into rows for grid
  const slotRows = [];
  for (let i = 0; i < visibleSlots.length; i += columns) {
    slotRows.push(visibleSlots.slice(i, i + columns));
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>ADVANCE DRAW</div>
      <div style={styles.row}>
        <span style={styles.label}>Remaining Draw: {remainingDraw}</span>
        <span style={styles.label}>Next Draw in: {nextDrawIn}</span>
      </div>
      <div style={styles.selectionRow}>
        <input
          style={styles.input}
          placeholder="Selection"
          value={search}
          type="number"
          onChange={e => {
            const val = e.target.value;
            setSearch(val);
            const num = parseInt(val, 10);
            if (!isNaN(num) && num > 0) {
              setSelectedSlots(visibleSlots.slice(0, num).map(slot => slot.label));
            } else {
              setSelectedSlots([]);
            }
          }}
        />
        <button style={styles.selectAllBtn} onClick={handleSelectAll}>
          <span style={styles.selectAllText}>Select All</span>
        </button>
        <button
          style={styles.okayBtn}
          onClick={() => {
            handleStoreSlots();
          }}
        >
          <span style={styles.okayText}>OKAY</span>
        </button>
        <button style={styles.closeBtn} >
          {/* To go to /home, use navigate('/home'). To go back, use navigate(-1). Uncomment as needed. */}
          <span style={styles.closeText} onClick={() => navigate('-1', { state: { selectedSlotsString } })}>✕</span>
          {/* Or, for back navigation: <span style={styles.closeText} onClick={() => navigate && navigate(-1)}>✕</span> */}
        </button>
      </div>
      <div className="advance-draw-slots-grid">
        {visibleSlots.map(slot => (
          <button
            key={slot.label}
            className={selectedSlots.includes(slot.label) ? "advance-draw-slot-btn selected" : "advance-draw-slot-btn"}
            onClick={() => handleSlotPress(slot.label)}
          >
            <span className="advance-draw-slot-text">{slot.label}</span>
          </button>
        ))}
      </div>
      {/* Responsive and professional design tweaks - CLEANED UP AND 10% SMALLER */}
      <style>{`
        .advance-draw-modal, .advance-draw-modal * {
          box-sizing: border-box;
        }
        .advance-draw-modal {
          padding: 1.8vw 1.8vw 1.8vw 1.8vw;
          margin: 0 auto;
          max-width: 630px;
          min-width: 198px;
          width: 88vw;
          border-radius: 10.8px;
          overflow: hidden !important;
          box-sizing: border-box;
        }
        .advance-draw-modal > * {
          max-width: 100%;
          box-sizing: border-box;
        }
        .advance-draw-slots-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 0.18vw;
          width: 100%;
          margin: 0 auto;
          justify-items: stretch;
          align-items: stretch;
          max-width: 100%;
        }
        .advance-draw-slot-btn {
          background: #a05a0a;
          border-radius: 4.5px;
          padding: 0.135em 0.045em;
          margin: 0.063vw;
          min-width: 0;
          max-width: 100%;
          width: 100%;
          color: #fff;
          font-weight: bold;
          font-size: clamp(3.5px, 0.5vw, 5px);
          padding: 0.002em 0.001em;
          min-width: 0;
          width: 100%;
          border: none;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
          box-shadow: 0 0.9px 3.6px rgba(0,0,0,0.07);
          flex-shrink: 1;
          box-sizing: border-box;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          height: 28px;
          line-height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .advance-draw-slot-btn.selected {
          background: #ffd700;
          color: #a05a0a;
          border: 1.8px solid #a05a0a;
        }
        .advance-draw-slot-text {
          color: inherit;
          font-size: 0.9em;
          font-weight: bold;
          max-width: 100%;
          overflow: visible;
          text-overflow: unset;
          display: block;
          white-space: nowrap;
          word-break: normal;
          letter-spacing: 0;
        }
          @media (max-width: 980px) {
            .advance-draw-modal {
              max-width: 98vw;
              width: 98vw;
              min-width: 0;
              padding: 0.5vw 0.2vw 0.5vw 0.2vw;
              border-radius: 6px;
            }
            .advance-draw-slots-grid {
              grid-template-columns: repeat(7, 1fr);
              gap: 0.5vw;
            }
            .advance-draw-slot-btn {
              font-size: clamp(3px, 0.4vw, 4.5px);
              padding: 0.001em 0.001em;
              min-width: 0;
              max-width: 100%;
              height: 24px;
              line-height: 24px;
            }
          }
          @media (max-width: 660px) {
            .advance-draw-modal {
              max-width: 98vw;
              width: 98vw;
              min-width: 0;
              padding: 0.5vw 0.2vw 0.5vw 0.2vw;
              border-radius: 6px;
            }
            .advance-draw-slots-grid {
              grid-template-columns: repeat(7, 1fr);
              gap: 0.5vw;
            }
            .advance-draw-slot-btn {
              font-size: clamp(3px, 0.4vw, 4.5px);
              padding: 0.001em 0.001em;
              min-width: 0;
              max-width: 100%;
              height: 24px;
              line-height: 24px;
            }
          }
          @media (max-width: 480px) {
            .advance-draw-modal {
              max-width: 90vw;
              width: 90vw;
              min-width: 0;
              padding: 0.45vw 0.09vw 0.45vw 0.09vw;
              border-radius: 3.6px;
            }
            .advance-draw-slots-grid {
              grid-template-columns: repeat(7, 1fr);
              gap: 0.9vw;
            }
            .advance-draw-slot-btn {
              font-size: clamp(2.5px, 0.3vw, 3.5px);
              padding: 0.001em 0.001em;
              min-width: 0;
              max-width: 100%;
              height: 20px;
              line-height: 20px;
            }
          }
      `}</style>
    </div>
  );
}

const styles = {
  container: { background: '#fff', padding: 2, minHeight: '100vh', fontFamily: 'sans-serif' },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', margin: 0 },
  row: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  label: { fontSize: 16 },
  selectionRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
    gap: 8,
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  input: {
    flex: 2,
    border: '1px solid #aaa',
    borderRadius: 6,
    padding: 6,
    fontSize: 16,
    marginRight: 6,
    background: '#fff',
    minWidth: 80
  },
  selectAllBtn: {
    flex: 1,
    background: '#a05a0a',
    borderRadius: 6,
    padding: '8px 8px',
    marginRight: 6,
    border: 'none',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    minWidth: 80
  },
  selectAllText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  okayBtn: {
    background: '#1a23e6',
    borderRadius: 6,
    padding: '8px 12px',
    border: 'none',
    color: '#ffd700',
    fontWeight: 'bold',
    cursor: 'pointer',
    minWidth: 80
  },
  okayText: { color: '#ffd700', fontSize: 16, fontWeight: 'bold' },
  closeBtn: {
    background: '#a05a0a',
    borderRadius: 6,
    padding: 8,
    marginLeft: 6,
    border: 'none',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    minWidth: 40
  },
  closeText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  slotsGrid: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8
  },
  gridRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 4
  },
  slotBtn: {
    background: '#a05a0a',
    borderRadius: 6,
    padding: '5px 8px',
    margin: 2,
    minWidth: 80,
    alignItems: 'center',
    border: 'none',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: 14
  },
  slotBtnSelected: {
    background: '#ffd700',
    border: '2px solid #a05a0a',
    color: '#a05a0a',
  },
  slotText: { color: 'inherit', fontSize: 14, fontWeight: 'bold' }
};
