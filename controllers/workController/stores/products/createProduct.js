const {product} = require('../../../../models')

const createProduct = async (req,res)=>{
    try {
        const {name,price,stock,information,storeId} = req.body
        const uploadImage = req.file
        const data = {
            name,
            price,
            stock,
            information,
            storeId
        }

        if (!name|!price|!stock|!information|!storeId) {
            return res.status(400).json({
                error : {
                    message : 'all field can,t be empty'
                }
            })
        }
        if (uploadImage) {
            data.img = uploadImage.path
        }
        await product.create(data)
        return res.json({
            message : 'product has been created',
            data : data
        })
    } catch (error) {
        return res.send(error)
    }
}
module.exports = createProduct