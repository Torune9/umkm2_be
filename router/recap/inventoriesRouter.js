const { request } = require('express')
const getInventories = require('../../controllers/recapController/inventory/getInventories')
const addInvent = require('../../controllers/recapController/inventory/addInvent')
const updateInvent = require('../../controllers/recapController/inventory/updateInvent')
const inventSanitize = require('../../service/validator/recapValidator/inventSanitize')


const inventoriesRouter = require('express').Router()

inventoriesRouter.get('/user/inventory/:id',getInventories)

inventoriesRouter.post('/user/inventory',inventSanitize(),addInvent)

inventoriesRouter.put('/user/inventory/:id',updateInvent)

module.exports = inventoriesRouter