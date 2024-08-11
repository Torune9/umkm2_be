const {user} = require('../../models')

const updateRoleUser = async (req,res)=>{
    const {id} = req.params
    const {role} = req.body
    try {
        const userRole = await user.findOne({
            where : {
                id : id
            }
        })

        if (!userRole) {
            return res.status(404).json({
                message : 'user not found'
            })
        }

        userRole.role = role ? role : userRole.role
        await userRole.save()
        return res.json({
            message : 'update role user success'
        })
    } catch (error) {
        return res.status(500).json({
            message : 'internal server eror,when trying update role user',
            error : error
        })
    }
}

module.exports = updateRoleUser