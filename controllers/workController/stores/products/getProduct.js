const {product} = require('../../../../models')

const getAllProducts = async (req,res)=>{
    const {id} = req.params
    try {
        const products = await product.findAll({
            where : {
                storeId : id
            },
            attributes :['id','name','price','information','img','storeId']
        })
        return res.json({
            data : {
                products
            },
            message : 'products found'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error : error,
            message : 'error when get all products'
        })
    }
}

module.exports = getAllProducts