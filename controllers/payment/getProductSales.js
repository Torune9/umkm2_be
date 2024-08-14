const {product_sales} = require('../../models')

const productSales = async (req,res) => {
    const {id} = req.params  
    try {
        const orderUser = await product_sales.findAll({
            where : {
                store_id : id
            }
        })

        if (!orderUser) {
            return res.status(404).json({
                message : 'orders not found'
            })
        }
        return res.json({
            message : 'order sales found',
            data : orderUser
        })
    } catch (error) {
        return res.status(500).json({
            message : 'error when get orders',
            errors : error
        })
    }
}

module.exports = productSales