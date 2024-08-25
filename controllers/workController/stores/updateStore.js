const {Store} = require('../../../models')
const cloudinary = require('cloudinary').v2;

const updateStore = async (req,res)=>{
    const {name,description,phoneNumber,address} = req.body
    const id = req.params.id
    
    const profileImg = req.file
    try {
        const store = await Store.findOne({
            where : {
                id : id
            }
        })

        if (!store) {
           return res.status(404).json({
            message : 'store not found'
           }) 
        }

        if (profileImg) {
            if (store.img) {
                await cloudinary.uploader.destroy(store.img)
            }
            store.img = profileImg.path ? profileImg.path : store.img
        }

        store.name = name ? name : store.name
        store.description = description ? description : store.description
        store.phoneNumber = phoneNumber ? phoneNumber : store.phoneNumber
        store.address = address  ? address : store.address
        await store.save()
        return res.json({
            message : 'store has been updated'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : 'internal server error',
            error : error
        })
    }
}

module.exports = updateStore