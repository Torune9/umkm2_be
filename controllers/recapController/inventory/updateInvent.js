const {inventory} = require('../../../models')

const updateInvent = async (req,res)=>{
    const {id} = req.params
    const {name,stock,price,description} = req.body
    try {
        const product = await inventory.findOne({
            where : {
                storeId : id
            }
        })
        if (!product) {
            return res.status(404).json({
                message : 'product not found',
            })
        }
        product.name = name  ? name : product.name
        product.stock = stock ? stock : product.stock
        product.price = price ? price : product.price
        product.description = description ? description : product.description
        await product.save()
        return res.json({
            message : "inventory has been updated"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "error",
            error : error
        })
    }
}

module.exports = updateInvent