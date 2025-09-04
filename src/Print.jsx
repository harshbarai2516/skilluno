import React from "react";

const Print = () => {
    // Get tickets from sessionStorage
    const ticketsFromStorage = sessionStorage.getItem('editedValuesArray') || "";
    const tickets = ticketsFromStorage ? ticketsFromStorage.split(',') : [];

    // Get selected slots from localStorage
    const selectedSlots = localStorage.getItem('selectedSlotsString') || "";
    const drawSlots = localStorage.getItem('drawTime') || "";

    // Get quantity from localStorage
    const quantity = localStorage.getItem('finalQuantity') || "0";

    // Get amount from localStorage
    const amount = localStorage.getItem('finalAmount') || "0";

    // Get barcode from localStorage
    const barcode = localStorage.getItem('barcodeValue') || "0";

    // Process tickets into rows (3 items per row)
    const rows = [];
    for (let i = 0; i < tickets.length; i += 3) {
        const row = tickets.slice(i, i + 3);
        // Pad row with empty strings if less than 3 items
        while (row.length < 3) {
            row.push("");
        }
        rows.push(row);
    }

    const data = {
        header: "HB Skill Game",
        subHeader: "Acknowledgement Slip",
        rows: rows.length > 0 ? rows : [
            ["A 0362 : 40", "A 0312 : 40", "A 0322 : 40"],
            ["A 0362 : 40", "A 0342 : 40", "A 0352 : 40"],
            ["A 0362 : 40", "A 0332 : 40", "A 0372 : 40"],
            ["A 0362 : 40", "A 0382 : 40", ""],
        ],
        gst: "27AAMC P0300J2Z8",
        quizDate: new Date().toISOString().split('T')[0],
        quizTime: selectedSlots || drawSlots,
        selectedTime: new Date().toLocaleString(),
        quizId: "11048221",
        retailerId: "RT10032",
        totalQ: parseInt(quantity) || 0,
        totalQuiz: parseInt(amount) || 0,
        barcode: barcode || "0",
    };

    const styles = {
        container: {
            width: "280px",
            fontFamily: "monospace",
            fontSize: "14px",
            textAlign: "center",
            margin: "auto",
            padding: "10px",
            border: "1px dashed #ccc", // remove when printing
        },
        header: {
            fontWeight: "bold",
            fontSize: "16px",
        },
        subHeader: {
            marginBottom: "8px",
        },
        table: {
            margin: "10px 0",
            border: "1px solid black",
            borderCollapse: "collapse",
            width: "100%",
        },
        row: {
            display: "table-row",
            borderBottom: "1px solid black",
        },
        cell: {
            display: "table-cell",
            width: "33.33%",
            textAlign: "center",
            padding: "5px",
            border: "1px solid black",
            fontSize: "12px",
        },
        info: {
            textAlign: "left",
            marginTop: "10px",
            fontSize: "13px",
        },
        barcode: {
            marginTop: "10px",
            textAlign: "center",
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>{data.header}</div>
            <div style={styles.subHeader}>{data.subHeader}</div>

            {/* Table-like rows */}
            <div style={{ ...styles.table, display: "table" }}>
                {data.rows.map((row, i) => (
                    <div style={styles.row} key={i}>
                        {row.map((cell, j) => (
                            <div style={styles.cell} key={j}>
                                {cell}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Info section */}
            <div style={styles.info}>
                <div>GST NO. {data.gst}</div>
                <div>Draw Date: {data.quizDate}</div>
                <div>Draw Time: {data.quizTime}</div>
                <div>Selected Quiz Time: {data.selectedTime}</div>
                <div>Total Quantity: {data.totalQ}</div>
                <div>Total Amount: {data.totalQuiz}</div>
                <div>Barcode: {data.barcode}</div>
            </div>
        </div>
    );
};

export default Print;
