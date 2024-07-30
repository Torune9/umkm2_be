const {user,Store} = require('../../models')
const fs = require('fs')

const updateUser = async (req,res)=>{
    const {id,name,email,password} = req.body
    const profileImage = req.file
    console.log(name);
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
        if (profileImage) {
            if(fileExist) fs.unlink(path,(error => {
                console.log(error);
            }))
            userUpdate.profile = profileImage.filename
        }
        
        userUpdate.username = name ? name : userUpdate.name
        userUpdate.email = email ? email : userUpdate.email
        userUpdate.password = password ? password : userUpdate.password

        await userUpdate.save()

        return res.json({
            message : 'user has been updated'
        })
    } catch (error) {
        
    }
}

module.exports = updateUser