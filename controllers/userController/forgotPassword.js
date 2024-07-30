const {user} = require('../../models')
const sendEmail = require('../../service/generate/sendEmail')
const crypto = require('crypto')
const ejs = require('ejs')
const path = require('path')

const forgotController = async (req,res)=>{
    const {email} = req.body
    const users = await user.findOne({
        where :{
            email : email
        }
    })
    const randomBytes = crypto.randomBytes(4)
    const token = parseInt(randomBytes.toString('hex'), 16)
    const pathLayout = path.join(__dirname,'../../views/layoutEmail.ejs')
    const expToken = new Date(Date.now() + 900000)
    try{

        if(users){
        users.reset_token = token
        users.exp_token = expToken 
        users.save()
        const urlReset = `${req.protocol}://${req.get('host')}/user/password/${users.reset_token}`
        const layout = await ejs.renderFile(pathLayout,{
            url : urlReset,
            email : users.email
        })
        await sendEmail({
            email : users.email,
            message : "Here your link reset password",
            url : urlReset,
            layout : layout
        })
       
        return res.json({
         from: 'example@test.com',
         to: users.email, 
         subject: "Here your link requested for reset password",
         message : urlReset,
        })
    }else{
        return res.status(404).json({
            message : `Email not found`
        })
    }

    }catch(err){
            console.log(err)
            return res.status(500).json({
                message : 'Internal server error'
            })
    }
    
}

module.exports = forgotController