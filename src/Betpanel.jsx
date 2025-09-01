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
  const handleCheckboxChange = (label) => {
    if (label === "ALL") {
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

      let typesToAdd =
        selectedTypes.includes("ALL")
          ? ["BOX", "STR", "SP", "FP", "BP", "AP"]
          : selectedTypes;

      console.log("✅ Types Selected:", typesToAdd);

      typesToAdd.forEach((type) => {
        switch (type) {
          case "STR":
            if (values.straight) addBet(values.straight, type, amount);
            break;
          case "BOX":
            if (values.box) {
              values.box.forEach((perm) => {
                addBet(perm, type, amount);
              });
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
            <label key={i} className="option">
              <input
                type="checkbox"
                checked={selectedTypes.includes(label)}
                onChange={() => handleCheckboxChange(label)}
              />{" "}
              {label}
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
        }
        .bet-options {
          display: flex;
          gap: 0.4em;
          font-weight: bold;
          color: #fff;
          flex: 1;
        }
        .option {
          display: flex;
          align-items: center;
          font-size: calc(0.5vw + 8px);
          gap: 0.2em;
        }
        .add-number {
          width: clamp(120px, 20%, 200px);
          padding: 0.3em 0.6em;
          border-radius: 0.3em;
          border: none;
          outline: none;
          font-size: calc(0.5vw + 8px);
        }
        .bet-cards {
          display: flex;
          gap: 0.5em;
          padding: 0.1em;
          overflow-x: auto;
        }
        .bet-card {
          min-width: 60px;
          padding: 0.1em;
          background: #fff7f7;
          color: #333;
          border: 2px solid #4caf50;
          border-radius: 0.3em;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: calc(0.5vw + 8px);
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
