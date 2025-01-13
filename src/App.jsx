import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [studentName, setStudentName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [month, setMonth] = useState("");
  const [amount, setAmount] = useState("");

  const handleGeneratePDF = async () => {
    if (!studentName || !fatherName || !month || !amount) {
      alert("Please fill in all fields.");
      return;
    }
  
    try {
      const response = await fetch(
        "https://invoice-generate-ten.vercel.app", // Replace with your actual deployed Vercel URL
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ studentName, fatherName, month, amount }),
        }
      );
  
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
  
        const a = document.createElement("a");
        a.href = url;
        a.download = `${studentName}_${month}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
  
        alert("PDF downloaded successfully!");
      } else {
        const errorText = await response.text();
        alert(`Error: ${errorText}`);
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
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
