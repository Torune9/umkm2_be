const midtransClient = require('midtrans-client');
const { product,orders } = require('../../models'); // Sesuaikan dengan path ke model Product

const handleMidtransNotification = async (req, res) => {
    const {id} = req.params
    try {
        let apiClient = new midtransClient.Snap({
            isProduction: false,
            serverKey: process.env.MIDTRANS_SERVER_KEY,
        });

        // Get notification from request body
        const notificationJson = req.body;
        console.log(notificationJson);
        

        // Get transaction status
        const statusResponse = await apiClient.transaction.notification(notificationJson);
        

        const orderId = statusResponse.order_id;
        const transactionStatus = statusResponse.transaction_status;
        console.log(`Transaction ${orderId} is ${transactionStatus}`);

        const order = await orders.findOne({
            where : {
                order_id : orderId
            }
        })
        const prod = await product.findOne({
            where :{
                id : order.product_id
            }
        })


        // Update stock product jika transaksi sukses
        if (transactionStatus === 'capture' || transactionStatus === 'settlement') {
            prod.stock -= order.quantity
            await prod.save()
            console.log('sttaus : ','settelment' );
        }
        order.status = transactionStatus
        await order.save()

        return res.status(200).json({ message: 'Notification handled successfully' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to handle notification' });
    }
};

module.exports = handleMidtransNotification;
