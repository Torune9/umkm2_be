const userRouter = require('express').Router()

const forgotController = require('../../controllers/userController/forgotPassword')
const { resetController, sendLink } = require('../../controllers/userController/resetPassword')
const sendInviteLink = require('../../controllers/userController/sendInviteLink')
const updateMember = require('../../controllers/userController/updateMember')
const getUserImageByEmail = require('../../controllers/userController/getUserImage')
const userUpdateData = require('../../controllers/userController/updateDataUser')
const { upload,filter } = require('../../service/utils/imageUploads')


userRouter.get('/user/image/:id',getUserImageByEmail)

userRouter.get('/user/password/:token',sendLink)

userRouter.post('/user/password/forgot',forgotController)

userRouter.put('/user/password/reset/:token',resetController)

userRouter.put('/user/update',upload.single('image'),userUpdateData)

userRouter.get('/user/invite/:userId',sendInviteLink)

userRouter.put('/user/join',updateMember)

userRouter.use(filter)

module.exports = userRouter