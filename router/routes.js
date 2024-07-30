const authRouter = require('./auth/authRouter')
const workSpaceRouter = require('./workspace/workspaceRouter')
const taskRouter = require('./task/taskRouter')
const userRouter = require('./user/userRouter')
const inventoriesRouter = require('./recap/inventoriesRouter')
const storeRouter = require('./user/storeRouter')
const productRouter = require('./user/productRouter')
const financeRouter = require('./recap/financeRouter')

module.exports = {
    authRouter,
    workSpaceRouter,
    taskRouter,
    userRouter,
    inventoriesRouter,
    storeRouter,
    productRouter,
    financeRouter
}