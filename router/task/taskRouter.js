const taskRouter = require('express').Router()

const addTask = require('../../controllers/workController/task/createTask')
const assignTask = require('../../controllers/workController/task/assignTask')
const setStatus = require('../../controllers/workController/task/setStatusTask')
const getTask = require('../../controllers/workController/task/getTask')

taskRouter.get('/space/task',getTask)

taskRouter.post('/space/task',addTask)

taskRouter.patch('/space/task/assign/:id',assignTask)

taskRouter.patch('/space/task/status/:id',setStatus)

module.exports = taskRouter