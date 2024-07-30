const workSpaceRouter = require('express').Router()

const createWorkspace = require('../../controllers/workController/workspace/createWorkspace')
const getWorkspace = require('../../controllers/workController/workspace/getWorkspace')
const updateWorkspace = require('../../controllers/workController/workspace/updateWorkspace')

workSpaceRouter.get('/space/workspace/:id',getWorkspace)

workSpaceRouter.post('/space/workSpace',createWorkspace)

workSpaceRouter.put('/space/workSpace/:id',updateWorkspace)

module.exports = workSpaceRouter