const {user,Store} = require('../../models')
const bcrypt = require('bcrypt')
const fs = require('fs')
const cloudinary = require('cloudinary').v2;

const updateUser = async (req,res)=>{
    const {id,name,email,password} = req.body
    const profileImage = req.file
    try {
        const userUpdate = await user.findOne({
            where : {
                id : id
            }
        })
        const path = `uploads/profile/${userUpdate.profile}`

        const fileExist = fs.existsSync(path)

        const chekEmailExist = email == userUpdate.email ; 

        if (!userUpdate) {
            return res.status(404).json({
                message  : 'user not found'
            })
        }
        if (chekEmailExist) {
            return res.status(400).json({
                message : 'email has already taken,try another username'
            })
        }
        // If there's a new profile image, delete the old one from Cloudinary
        if (profileImage) {
            if (userUpdate.profile) {
                // Assuming `profile` field stores the public_id from Cloudinary
                await cloudinary.uploader.destroy(userUpdate.profile);
            }
            // Save the new image to Cloudinary and store its public_id
            userUpdate.profile = profileImage.path; // You should update this to the Cloudinary public_id
        }
        
        userUpdate.username = name ? name : userUpdate.name
        userUpdate.email = email ? email : userUpdate.email
        userUpdate.password = password ? await bcrypt.hash(password,10) : userUpdate.password

        await userUpdate.save()

        return res.json({
            message : 'user has been updated'
        })
    } catch (error) {
        
    }
}

module.exports = updateUser