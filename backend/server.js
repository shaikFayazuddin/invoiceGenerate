const express = require("express");
const bodyParser = require("body-parser");
const PDFDocument = require("pdfkit");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/generate-pdf", (req, res) => {
    const { studentName, fathersName, month, amount } = req.body;

    const doc = new PDFDocument();
    const fileName = `${studentName}_${month}.pdf`;

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);

    doc.pipe(res);

    doc.fontSize(20).text("Student Fee Details", { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text(`Student's Name: ${studentName}`);
    doc.text(`Father's Name: ${fathersName}`);
    doc.text(`Month: ${month}`);
    doc.text(`Amount: ${amount} USD`);

    doc.end();
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

