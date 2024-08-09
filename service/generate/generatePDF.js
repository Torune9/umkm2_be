const PDFDocument = require('pdfkit-table');

const generatePDF = (financeData, res) => {
  // Init document
  let doc = new PDFDocument({ margin: 30, size: "A4" });

  // Pipe PDF stream to response
  doc.pipe(res);

  // Extract month and year from the first entry's createdAt
  const firstEntry = financeData[0].dataValues;
  const createdAt = new Date(firstEntry.createdAt);
  const month = createdAt.toLocaleString("default", { month: "long" });
  const year = createdAt.getFullYear();

  // Add title with styling
  doc
    .fontSize(24)
    .font("Helvetica-Bold")
    .text(`Finance Report for ${month} ${year}`, {
      align: "center",
      underline: true,
    });

  doc.moveDown(2); // Move down after the title

  // Table data
  const table = {
    headers: [
      { label: "Income", headerColor: "red" },
      { label: "Expenditure", headerColor: "red" },
      { label: "Profit", headerColor: "red" },
      { label: "Loss", headerColor: "red" },
    ],
    rows: financeData.map((entry) => [
      entry.dataValues.income || "N/A",
      entry.dataValues.expenditure || "N/A",
      entry.dataValues.profit || "N/A",
      entry.dataValues.loss || "N/A",
    ]),
  };

  // Add table to document
  doc.table(table, {
    width: doc.page.width - 60,
  });

  // Calculate totals
  const totals = {
    income: 0,
    expenditure: 0,
    profit: 0,
    loss: 0,
  };

  financeData.forEach(entry => {
    totals.income += parseFloat(entry.dataValues.income) || 0;
    totals.expenditure += parseFloat(entry.dataValues.expenditure) || 0;
    totals.profit += parseFloat(entry.dataValues.profit) || 0;
    totals.loss += parseFloat(entry.dataValues.loss) || 0;
  });

  doc.moveDown(2); // Move down after the table

  // Add total recap
  doc
    .fontSize(8)
    .font("Helvetica-Bold")
    .text(`Total Income: Rp ${totals.income}`, { align: "left" })
    .text(`Total Expenditure: Rp ${totals.expenditure}`, { align: "left" })
    .text(`Total Profit: Rp ${totals.profit}`, { align: "left" })
    .text(`Total Loss: Rp ${totals.loss}`, { align: "left" });

  // Finish the document
  doc.end();
};

module.exports = generatePDF;