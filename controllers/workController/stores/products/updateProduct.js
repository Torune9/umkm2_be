const { error } = require('console')
const {product} = require('../../../../models')
const fs = require('fs')
const cloudinary = require('cloudinary').v2;

const updateProduct = async (req,res)=>{
    const {id} = req.params
    const {name,price,information} = req.body
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
        foundProduct.information = information ? information : foundProduct.information

        if (imageUploadUpdate) {
            if (foundProduct.img) {
                await cloudinary.uploader.destroy(foundProduct.img)
            }
            foundProduct.img = imageUploadUpdate ? imageUploadUpdate.path : foundProduct.img
        }
        await foundProduct.save()

        return res.json({
            message : 'product has been updated'
        })
    } catch (error) {

    }
}

module.exports = updateProduct