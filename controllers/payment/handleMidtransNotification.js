const midtransClient = require('midtrans-client');
const { product, orders,product_sales } = require('../../models'); // Sesuaikan dengan path ke model Product

const handleMidtransNotification = async (req, res) => {
    try {
        let apiClient = new midtransClient.Snap({
            isProduction: false,
            serverKey: process.env.MIDTRANS_SERVER_KEY,
        });

        // Get notification from request body
        const notificationJson = req.body;
        console.log('Midtrans Notification:', notificationJson);

        // Get transaction status
        const statusResponse = await apiClient.transaction.notification(notificationJson);
        const orderId = statusResponse.order_id;
        const transactionStatus = statusResponse.transaction_status;
        console.log(`Transaction ${orderId} is ${transactionStatus}`);

        // Find the order associated with the transaction
        const order = await orders.findOne({
            where: {
                order_id: orderId
            }
        });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Find the product associated with the order
        const prod = await product.findOne({
            where: {
                id: order.product_id
            }
        });


        const salesProduct = await product_sales.findOne({
            where : {
                order_id : orderId
            }
        })

        if (!prod) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Handle different transaction statuses
        switch (transactionStatus) {
            case 'capture':
            case 'settlement':
                // Update stock product jika transaksi sukses
                prod.stock -= order.quantity;
                await prod.save();
                salesProduct.status = 'settlement'
                order.status = 'settlement'; // Atur status order ke 'settlement'
                console.log('Transaction status updated to settlement');
                break;

            case 'pending':
                // Update status order menjadi 'pending'
                salesProduct.status = 'pending'
                order.status = 'pending';
                console.log('Transaction status updated to pending');
                break;

            case 'expire':
                // Atur status order ke 'expired' dan kembalikan stok produk jika diperlukan
                salesProduct.status = 'expired'
                order.status = 'expired';
                console.log('Transaction status updated to expired');
                // Kembalikan stok produk jika diperlukan
                break;

            case 'cancel':
                // Atur status order ke 'cancelled'
                salesProduct.status = 'cancelled'
                order.status = 'cancelled';
                console.log('Transaction status updated to cancelled');
                // Kembalikan stok produk jika diperlukan
                break;

            case 'deny':
                // Atur status order ke 'denied' jika transaksi ditolak
                salesProduct.status = 'denied'
                order.status = 'denied';
                console.log('Transaction status updated to denied');
                break;

            default:
                console.log(`Unhandled transaction status: ${transactionStatus}`);
        }

        // Update order status in database
        await order.save()
        await salesProduct.save()

        return res.status(200).json({ message: 'Notification handled successfully' });

    } catch (error) {
        console.error('Error handling Midtrans notification:', error);
        return res.status(500).json({ message: 'Failed to handle notification' });
    }
};

module.exports = handleMidtransNotification;