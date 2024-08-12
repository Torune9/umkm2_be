const {orders} = require('../../models')

const getOrder = async (req,res) => {
    const {email} = req.query    
    try {
        const orderUser = await orders.findAll({
            where : {
                email : email
            }
        })

        if (!orderUser) {
            return res.status(404).json({
                message : 'orders not found'
            })
        }
        return res.json({
            message : 'orders found',
            data : orderUser
        })
    } catch (error) {
        return res.status(500).json({
            message : 'error when get orders',
            errors : error
        })
    }
}

module.exports = getOrder