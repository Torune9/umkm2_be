const { error } = require('console')
const {product} = require('../../../../models')
const fs = require('fs')

const updateProduct = async (req,res)=>{
    const {id} = req.params
    const {name,price,information,stock} = req.body
    const imageUploadUpdate = req.file
    try {
        const foundProduct = await product.findOne({
            where : {
                id : id   
            }
        })
        if (!foundProduct) {
            return res.status(404).json({
                message : 'product not found'
            })
        }

        
        foundProduct.name = name ? name : foundProduct.name
        foundProduct.price = price ? price : foundProduct.price
        foundProduct.stock = stock ? stock : foundProduct.stock
        foundProduct.information = information ? information : foundProduct.information
        const pathImageProduct = `uploads/image/${foundProduct.img}`
        const existImage = fs.existsSync(pathImageProduct)
        
        if (imageUploadUpdate && existImage) {
            fs.unlink(pathImageProduct,(err) => console.log(error))
        }

        if (imageUploadUpdate) {
            foundProduct.img = imageUploadUpdate ? imageUploadUpdate.filename : foundProduct.img
        }
        await foundProduct.save()

        return res.json({
            message : 'product has been updated'
        })
    } catch (error) {

    }
}

module.exports = updateProduct