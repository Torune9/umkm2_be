const deleteOrder = require('../../controllers/payment/deleteOrder');
const getOrder = require('../../controllers/payment/getOrder');
const handleMidtransNotification = require('../../controllers/payment/handleMidtransNotification');
const updateStatusOrder = require('../../controllers/payment/updateStatuOrder');

const orderRouter = require('express').Router()


orderRouter.get('/order',getOrder)

orderRouter.post('/midtrans-webhook/',handleMidtransNotification)

orderRouter.put('/order/:orderId',updateStatusOrder );

orderRouter.delete('/order/:orderId',deleteOrder);

module.exports = orderRouter