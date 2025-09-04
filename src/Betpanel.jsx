import React, { useState, useEffect } from "react";

export default function BetPanel({ setBets: setParentBets }) {
  const [selectedTypes, setSelectedTypes] = useState(["BOX", "STR"]);
  const [bets, setBets] = useState([]); // ✅ Array of objects
  const [inputValue, setInputValue] = useState("");
  const [amount, setAmount] = useState(10);

  // 🔄 Navbar ke radio se amount fetch
  useEffect(() => {
    const radios = document.querySelectorAll("input[name='bet']");
    const updateAmount = () => {
      const selected = document.querySelector("input[name='bet']:checked");
      if (selected)
        setAmount(parseInt(selected.nextSibling.textContent || selected.value));
    };

    radios.forEach((r) => r.addEventListener("change", updateAmount));
    updateAmount();

    return () => {
      radios.forEach((r) => r.removeEventListener("change", updateAmount));
    };
  }, []);

  // ✅ Global format for tck_result
  useEffect(() => {
    if (bets.length > 0) {
      const tck_result = bets
        .map((b) => `${b.type}|${b.num}|${b.amt}`)
        .join(", ");
      console.log("🎟️ tck_result:", tck_result);
    }
  }, [bets]);

  // ✅ Checkbox toggle handler
  const handleCheckboxChange = (label, group = null) => {
    if (label === "ALL" && group === "abc") {
      // Only for A/B/C row
      const abc = ["A", "B", "C"];
      if (abc.every(t => selectedTypes.includes(t))) {
        setSelectedTypes(selectedTypes.filter(t => !abc.includes(t)));
      } else {
        setSelectedTypes([...selectedTypes, ...abc.filter(t => !selectedTypes.includes(t))]);
      }
    } else if (label === "ALL") {
      // Only for top controls
      if (selectedTypes.includes("ALL")) {
        setSelectedTypes([]);
      } else {
        setSelectedTypes(["ALL", "BOX", "STR", "SP", "FP", "BP", "AP"]);
      }
    } else {
      let newTypes = selectedTypes.includes(label)
        ? selectedTypes.filter((t) => t !== label)
        : [...selectedTypes, label];

      if (newTypes.includes("ALL") && newTypes.length < 7) {
        newTypes = newTypes.filter((t) => t !== "ALL");
      }
      setSelectedTypes(newTypes);
    }
  };

  // ✅ Generate values based on number
  const generateCombinations = (num) => {
    const str = num.toString();
    let values = {};

    if (str.length === 3) {
      values.straight = str;

      // BOX → all permutations
      const permute = (s) => {
        if (s.length <= 1) return [s];
        let result = new Set();
        for (let i = 0; i < s.length; i++) {
          const char = s[i];
          const remaining = s.slice(0, i) + s.slice(i + 1);
          permute(remaining).forEach((p) => result.add(char + p));
        }
        return [...result];
      };
      values.box = permute(str);

      values.frontPair = str.slice(0, 2);
      values.backPair = str.slice(1);
      values.splitPair = str[0] + str[str.length - 1];

      // AnyPair → agar koi digit repeat ho
      values.anyPair = null;
      for (let i = 0; i < str.length; i++) {
        for (let j = i + 1; j < str.length; j++) {
          if (str[i] === str[j]) {
            values.anyPair = str[i] + str[j];
          }
        }
      }
    } else if (str.length === 2) {
      values.frontPair = str;
      values.backPair = str;
      values.splitPair = str;
      values.anyPair = str[0] === str[1] ? str : null;
    }

    return values;
  };

  // ✅ Input validation check
  const isValidInput = () => {
    return /^\d{2,3}$/.test(inputValue); // 2 ya 3 digit chalega
  };

  // ✅ Add bet (merge if already exists)
  const addBet = (num, type, amt) => {
    setBets((prev) => {
      const existingIndex = prev.findIndex(
        (b) => b.num === num && b.type === type
      );

      if (existingIndex !== -1) {
        // Update existing bet
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          amt: updated[existingIndex].amt + amt,
        };
        console.log(
          `🔄 Updating bet: ${num}-${type} | New Amt: ${updated[existingIndex].amt}`
        );
        return updated;
      } else {
        // Add new bet
        console.log(`🆕 Adding bet: ${num}-${type} = ${amt}`);
        return [...prev, { num, type, amt }];
      }
    });
  };

  // ✅ Add bet on Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && isValidInput()) {
      const values = generateCombinations(inputValue);
      console.log("🎲 Generated Values:", values);


      // Separate ABC types from main types
      const abcTypes = ["A", "B", "C"].filter(t => selectedTypes.includes(t));
      let typesToAdd = selectedTypes.includes("ALL")
        ? ["BOX", "STR", "SP", "FP", "BP", "AP"]
        : selectedTypes.filter(t => !["A", "B", "C"].includes(t));

      console.log("✅ Types Selected:", typesToAdd, "ABC:", abcTypes);

      typesToAdd.forEach((type) => {
        switch (type) {
          case "STR":
            if (values.straight) addBet(values.straight, type, amount);
            break;
          case "BOX":
            if (inputValue && inputValue.length === 3) {
              addBet(inputValue, type, amount);
            }
            break;
          case "FP":
            if (values.frontPair) addBet(values.frontPair, type, amount);
            break;
          case "BP":
            if (values.backPair) addBet(values.backPair, type, amount);
            break;
          case "SP":
            if (values.splitPair) addBet(values.splitPair, type, amount);
            break;
          case "AP":
            if (values.anyPair) addBet(values.anyPair, type, amount);
            break;
          default:
            break;
        }
      });

      // Add ABC as bet types (just use inputValue as num)
      abcTypes.forEach((type) => {
        if (inputValue) addBet(inputValue, type, amount);
      });

      setInputValue("");
    }
  };

  // ✅ Remove bet
  const removeBet = (num, type) => {
    setBets((prev) => prev.filter((b) => !(b.num === num && b.type === type)));
  };

  useEffect(() => {
    if (setParentBets) setParentBets(bets);
  }, [bets, setParentBets]);

  return (
    <div className="bet-panel">
      {/* Top controls */}
      <div className="bet-controls">
        <div className="bet-options">
          {["ALL", "BOX", "STR", "SP", "FP", "BP", "AP"].map((label, i) => (
            <label key={label} className="option">
              <input
                type="checkbox"
                checked={selectedTypes.includes(label)}
                onChange={() => handleCheckboxChange(label)}
              /> {label}
            </label>
          ))}
        </div>
        <div className="input-and-abc">
          <div className="abc-options">
            <label className="option">
              <input
                type="checkbox"
                checked={["A","B","C"].every(t => selectedTypes.includes(t))}
                onChange={() => handleCheckboxChange("ALL", "abc")}
              /> All
            </label>
            {["A", "B", "C"].map((label) => (
              <label key={label} className="option">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(label)}
                  onChange={() => handleCheckboxChange(label)}
                /> {label}
              </label>
            ))}
          </div>
          <input
            type="text"
            placeholder="ADD NUMBER"
            className="add-number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      {/* Bet Cards */}
      <div className="bet-cards">
        {bets.map((b, i) => (
          <div className="bet-card" key={i}>
            <div className="num">{b.num}</div>
            <div className="type">{b.type}</div>
            <div className="amt">{b.amt}</div>
            <div className="remove" onClick={() => removeBet(b.num, b.type)}>
              X
            </div>
          </div>
        ))}
      </div>

      {/* 🔴 Same UI styling */}
      <style jsx="true">{`
        .bet-panel {
          height: 100%;
          display: flex;
          flex-direction: column;
          width: 100%;
          background: linear-gradient(180deg, #eeecec, #f5f5f5);
          border: 2px solid #b7410e;
          border-radius: 0.4em;
          overflow: hidden;
        }
        .bet-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(180deg, #ff5722, #d84315);
          padding: 0.4em 0.6em;
          gap: 0.4em;
          width: 100%;
          box-sizing: border-box;
          overflow: hidden;
        }
        .bet-options {
          display: flex;
          gap: 0.3em;
          font-weight: bold;
          color: #fff;
          flex: 1 1 60%;
          flex-wrap: wrap;
          min-width: 0;
        }
        .option {
          display: flex;
          align-items: center;
          font-size: calc(0.5vw + 8px);
          gap: 0.2em;
          min-width: 0;
          white-space: nowrap;
        }
        .input-and-abc {
          display: flex;
          align-items: center;
          gap: 0.3em;
          flex: 1 1 40%;
          min-width: 0;
        }
        .add-number {
          flex: 1 1 auto;
          min-width: 80px;
          max-width: 120px;
          padding: 0.3em 0.4em;
          border-radius: 0.3em;
          border: none;
          outline: none;
          font-size: calc(0.5vw + 8px);
          box-sizing: border-box;
        }
        .abc-options {
          display: flex;
          gap: 0.2em;
          flex-wrap: wrap;
          min-width: 0;
        }

        /* Tablet and medium screens */
        @media (max-width: 1024px) {
          .bet-controls {
            padding: 0.3em 0.4em;
            gap: 0.3em;
          }
          .bet-options {
            gap: 0.25em;
          }
          .option {
            font-size: calc(0.4vw + 7px);
            gap: 0.15em;
          }
          .input-and-abc {
            gap: 0.25em;
          }
          .add-number {
            min-width: 70px;
            max-width: 100px;
            padding: 0.25em 0.3em;
            font-size: calc(0.4vw + 7px);
          }
          .abc-options {
            gap: 0.15em;
          }
        }

        /* Small tablets and large phones */
        @media (max-width: 768px) {
          .bet-controls {
            flex-direction: row;
            padding: 0.25em 0.3em;
            gap: 0.2em;
          }
          .bet-options {
            gap: 0.2em;
            justify-content: flex-start;
            width: auto;
            flex-wrap: nowrap;
          }
          .option {
            font-size: calc(0.3vw + 6px);
            gap: 0.1em;
            white-space: nowrap;
          }
          .input-and-abc {
            gap: 0.2em;
            width: auto;
            justify-content: flex-end;
          }
          .add-number {
            min-width: 50px;
            max-width: 70px;
            padding: 0.2em 0.25em;
            font-size: calc(0.3vw + 6px);
          }
          .abc-options {
            gap: 0.1em;
          }
        }

        /* Only allow column layout and wrapping on true mobile */
        @media (max-width: 480px) {
          .bet-controls {
            flex-direction: column;
          }
          .bet-options {
            flex-wrap: wrap;
            width: 100%;
            justify-content: space-between;
          }
        }

        /* Mobile phones */
        @media (max-width: 480px) {
          .bet-controls {
            padding: 0.2em 0.25em;
            gap: 0.15em;
          }
          .bet-options {
            gap: 0.15em;
            flex-wrap: wrap;
          }
          .option {
            font-size: calc(0.2vw + 5px);
            gap: 0.05em;
          }
          .option input[type="checkbox"] {
            transform: scale(0.8);
          }
          .input-and-abc {
            gap: 0.15em;
          }
          .add-number {
            min-width: 50px;
            max-width: 70px;
            padding: 0.15em 0.2em;
            font-size: calc(0.2vw + 5px);
          }
          .abc-options {
            gap: 0.05em;
          }
        }

        /* Very small screens */
        @media (max-width: 320px) {
          .bet-controls {
            padding: 0.15em 0.2em;
            gap: 0.1em;
          }
          .bet-options {
            gap: 0.1em;
          }
          .option {
            font-size: calc(0.1vw + 4px);
            gap: 0.02em;
          }
          .option input[type="checkbox"] {
            transform: scale(0.7);
          }
          .input-and-abc {
            gap: 0.1em;
          }
          .add-number {
            min-width: 45px;
            max-width: 60px;
            padding: 0.1em 0.15em;
            font-size: calc(0.1vw + 4px);
          }
          .abc-options {
            gap: 0.02em;
          }
        }
        .bet-cards {
          display: flex;
          flex-direction: row;
          gap: 0.4em;
          padding: 0.5em 0.6em 0.5em 0.6em;
          overflow-x: auto;
          overflow-y: hidden;
          width: 100%;
          box-sizing: border-box;
          flex-wrap: nowrap;
          scrollbar-width: thin;
          scrollbar-color: #b7410e #f5f5f5;
        }
        .bet-cards::-webkit-scrollbar {
          height: 8px;
        }
        .bet-cards::-webkit-scrollbar-thumb {
          background: #b7410e;
          border-radius: 4px;
        }
        .bet-cards::-webkit-scrollbar-track {
          background: #f5f5f5;
        }
        .bet-card {
          flex: 0 0 auto;
          min-width: 50px;
          max-width: 70px;
          margin-right: 0.3em;
          margin-left: 0.1em;
          padding: 0.2em 0.4em;
          background: #fff7f7;
          color: #333;
          border: 2px solid #4caf50;
          border-radius: 0.3em;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: calc(0.5vw + 8px);
          box-sizing: border-box;
        }

        /* Bet cards media queries */
        @media (max-width: 1024px) {
          .bet-cards {
            gap: 0.3em;
          }
          .bet-card {
            min-width: 45px;
            max-width: 60px;
            font-size: calc(0.4vw + 7px);
          }
        }

        @media (max-width: 768px) {
          .bet-cards {
            gap: 0.25em;
            justify-content: space-between;
          }
          .bet-card {
            min-width: 40px;
            max-width: 55px;
            padding: 0.08em;
            font-size: calc(0.3vw + 6px);
          }
        }

        @media (max-width: 480px) {
          .bet-cards {
            gap: 0.2em;
          }
          .bet-card {
            min-width: 35px;
            max-width: 50px;
            padding: 0.06em;
            font-size: calc(0.2vw + 5px);
          }
        }

        @media (max-width: 320px) {
          .bet-cards {
            gap: 0.15em;
          }
          .bet-card {
            min-width: 30px;
            max-width: 45px;
            padding: 0.05em;
            font-size: calc(0.1vw + 4px);
          }
        }
        .num {
          font-weight: bold;
        }
        .type {
          font-weight: bold;
          font-size: calc(0.4vw + 7px);
        }
        .amt {
          font-weight: bold;
        }
        .remove {
          color: red;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
