import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { jsPDF } from "jspdf";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/generate-pdf", (req, res) => {
  const { studentName, fatherName, month, amount } = req.body;

  if (!studentName || !fatherName || !month || !amount) {
    return res.status(400).send("Missing required fields");
  }

  const doc = new jsPDF();
  const dateGenerated = new Date().toLocaleDateString();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Academy Invoice", 20, 20);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text(`Student Name: ${studentName}`, 20, 40);
  doc.text(`Father's Name: ${fatherName}`, 20, 50);
  doc.text(`Month: ${month}`, 20, 60);
  doc.text(`Amount: ₹${amount}`, 20, 70);
  doc.text(`Date Generated: ${dateGenerated}`, 20, 80);

  doc.text("Thank you for choosing our academy.", 20, 100);

  const pdf = doc.output("arraybuffer");
  res.setHeader("Content-Type", "application/pdf");
  res.send(Buffer.from(pdf));
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
