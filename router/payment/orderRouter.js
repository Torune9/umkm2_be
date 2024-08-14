const deleteOrder = require('../../controllers/payment/deleteOrder');
const getOrder = require('../../controllers/payment/getOrder');
const productSales = require('../../controllers/payment/getProductSales');
const handleMidtransNotification = require('../../controllers/payment/handleMidtransNotification');
const updateStatusOrder = require('../../controllers/payment/updateStatuOrder');

const orderRouter = require('express').Router()


orderRouter.get('/order',getOrder)

orderRouter.get('/product/sales/:id',productSales)

orderRouter.post('/midtrans-webhook/',handleMidtransNotification)

orderRouter.put('/order/:orderId',updateStatusOrder );

orderRouter.delete('/order/:orderId',deleteOrder);

module.exports = orderRouter