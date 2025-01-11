import React, { useState } from "react";
import axios from "axios";
import './app.css';

const App = () => {
    const [studentName, setStudentName] = useState("");
    const [fathersName, setFathersName] = useState("");
    const [month, setMonth] = useState("");
    const [amount, setAmount] = useState("");

    const handleGeneratePDF = async () => {
        try {
            const response = await axios.post(
                "http://localhost:5000/generate-pdf",
                { studentName, fathersName, month, amount },
                { responseType: "blob" }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `${studentName}_${month}.pdf`);
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error("Error generating PDF:", error);
        }
    };

    return (
        <div className="container" style={{ padding: "20px" }}>
            <h1>Generate Student Fee PDF</h1>
            <div>
                <label>Student's Name:</label>
                <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                />
            </div>
            <div>
                <label>Father's Name:</label>
                <input
                    type="text"
                    value={fathersName}
                    onChange={(e) => setFathersName(e.target.value)}
                />
            </div>
            <div>
                <label>Month:</label>
                <select value={month} onChange={(e) => setMonth(e.target.value)}>
                    <option value="">Select Month</option>
                    {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(
                        (m) => (
                            <option key={m} value={m}>
                                {m}
                            </option>
                        )
                    )}
                </select>
            </div>
            <div>
                <label>Amount:</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            <button onClick={handleGeneratePDF}>Generate PDF</button>
        </div>
    );
};

export default App;
