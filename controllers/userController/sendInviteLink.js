const {user} = require('../../models')
const sendEmail = require('../../service/generate/sendEmail')

const sendInviteLink = async (req,res)=>{
    const {userId} = req.params
    const users = await user.findOne({
        where : {
            id : userId
        }
    })
    const inviteLink = `${req.protocol}://${req.get('host')}/user/join/${userId}`
    await sendEmail({
        email : users.email,
        message : "Here your link to join store",
        url : inviteLink,
    })
   
    return res.json({
     from: 'example@test.com',
     to: users.email, 
     subject: "Here your link requested for to join store",
     message : inviteLink,
    })
}

module.exports = sendInviteLink