const addRecapFin = require('../../controllers/recapController/finance/addRecapFin')
const updateRecapFin = require('../../controllers/recapController/finance/updateRecap')
const getRecapFin = require('../../controllers/recapController/finance/getRecapFin')

const financeRouter = require('express').Router()

financeRouter.get('/user/finance/:id',getRecapFin)

financeRouter.post('/user/finance',addRecapFin)

financeRouter.put('/user/finance/:id',updateRecapFin)

module.exports = financeRouter