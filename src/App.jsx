import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [studentName, setStudentName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [month, setMonth] = useState("");
  const [amount, setAmount] = useState("");

  const handleGeneratePDF = async () => {
    if (!studentName || !fatherName || !month || !amount) {
      alert("All fields are required!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/generate-pdf", {
        studentName,
        fatherName,
        month,
        amount,
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `${studentName}_${month}.pdf`;
      link.click();
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className="container">
      <h1>Invoice Generator</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Student Name:
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
        </label>
        <label>
          Father's Name:
          <input
            type="text"
            value={fatherName}
            onChange={(e) => setFatherName(e.target.value)}
          />
        </label>
        <label>
          Select Month:
          <select value={month} onChange={(e) => setMonth(e.target.value)}>
            <option value="">--Select Month--</option>
            {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(
              (m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              )
            )}
          </select>
        </label>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleGeneratePDF}>
          Generate PDF
        </button>
      </form>
    </div>
  );
};

export default App;
