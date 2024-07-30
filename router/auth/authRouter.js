const authRouter = require('express').Router()
const filterform = require('../../service/validator/filterForm')

const login = require('../../controllers/userController/login')
const register = require('../../controllers/userController/register')

authRouter.post('/user/authenticate/login',login)
authRouter.post('/user/authenticate/register',filterform(),register)

module.exports = authRouter