const {orders} = require('../../models')


const updateStatusOrder = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;
    try {
        const order = await orders.update({ status }, { where: { order_id: orderId } });
        if (order[0] > 0) {
            res.json({ message: 'Order status updated' });
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = updateStatusOrder
