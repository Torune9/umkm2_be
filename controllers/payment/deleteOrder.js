const {orders} = require('../../models')

const deleteOrder = async (req,res)=>{
    const {orderId} = req.params
    try {
        const order = await orders.destroy({
            where : {
                order_id : orderId
            }
        })

        if (!order) res.status(404).json({
            message  : 'order not found'
        })
        return res.json({
            message : 'order has been deleted'
        })
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            message : 'eror when delete order',
            error : error
        })
    }
}

module.exports = deleteOrder