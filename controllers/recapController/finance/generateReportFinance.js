const { finance } = require("../../../models");
const generatePDF = require("../../../service/generate/generatePDF");
const { Op } = require('sequelize');

const getFinanceReport = async (req, res) => {
  const { id } = req.params;
  const { year, month } = req.body;

  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  try {
    if (!year || !month || !id) {
      return res.status(400).json({ message: 'Invalid value' });
    }

    const financeData = await finance.findAll({
      where: {
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
        storeId: id,
      },
    });

    if (financeData.length === 0) {
      return res.status(404).json({ message: 'No finance data found for the given period' });
    }

    // Set response headers for PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=finance_report.pdf');

    // Generate and send PDF
    generatePDF(financeData, res);

  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).send('Error generating report');
  }
};

module.exports = getFinanceReport;