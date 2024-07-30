const getAllStore = require('../../controllers/workController/stores/getAllStore')
const createStore = require('../../controllers/workController/stores/createStore')
const getStore = require('../../controllers/workController/stores/getStore')
const getStoreAsEmployee = require('../../controllers/workController/stores/getStoreAsEmployee')
const getEmployeeStore = require('../../controllers/workController/stores/getEmployeeStore')
const updateStore = require('../../controllers/workController/stores/updateStore')
const { upload, filter } = require('../../service/utils/imageUploads')

const storeRouter = require('express').Router()

storeRouter.get('/user/store/detail/:code?',getAllStore)

storeRouter.get('/user/store/:id',getStore)

storeRouter.get('/user/store',getStoreAsEmployee)

storeRouter.get('/user/store/employee/:id',getEmployeeStore)

storeRouter.post('/user/store',upload.single('image'),createStore)

storeRouter.put('/user/store/:id',updateStore)

storeRouter.use(filter)

module.exports = storeRouter