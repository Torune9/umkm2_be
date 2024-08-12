const routes = require('./routes')
const router = [
    routes.authRouter,
    routes.workSpaceRouter,
    routes.taskRouter,
    routes.userRouter,
    routes.inventoriesRouter,
    routes.storeRouter,
    routes.productRouter,
    routes.financeRouter,
    routes.orderRouter
]

module.exports = router