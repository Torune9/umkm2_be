const productRouter = require('express').Router()

const createProduct = require('../../controllers/workController/stores/products/createProduct')
const deleteProduct = require('../../controllers/workController/stores/products/deleteProduct')
const getAllProducts = require('../../controllers/workController/stores/products/getProduct')
const updateProduct = require('../../controllers/workController/stores/products/updateProduct')
const { upload, filter } = require('../../service/utils/imageUploads')

productRouter.get('/store/product/:id',getAllProducts)

productRouter.post('/store/product',upload.single('image'),createProduct)

productRouter.put('/store/product/:id',upload.single('image'),updateProduct)

productRouter.delete('/store/product/:id',deleteProduct)

productRouter.use(filter)

module.exports = productRouter