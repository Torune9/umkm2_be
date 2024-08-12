const addRecapFin = require('../../controllers/recapController/finance/addRecapFin')
const updateRecapFin = require('../../controllers/recapController/finance/updateRecap')
const getRecapFin = require('../../controllers/recapController/finance/getRecapFin')
const getFinanceReport = require('../../controllers/recapController/finance/generateReportFinance')

const financeRouter = require('express').Router()

financeRouter.get('/user/finance/:id',getRecapFin)

financeRouter.post('/user/finance',addRecapFin)

financeRouter.post('/user/finance/report/:id',getFinanceReport)

financeRouter.put('/user/finance/:storeId/:id',updateRecapFin)

module.exports = financeRouter