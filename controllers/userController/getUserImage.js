const {user} = require('../../models')

const getUserImageByEmail = async (req,res) => {
    try {
        const {id} = req.params
        const userData = await user.findOne({
            where : {
                id : id
            },
            attributes : ['profile']
        })

        if (!userData) {
            return res.status(404).json({
                message : 'user not found'
            })
        }
        const src = `${req.protocol}://${req.get('host')}/source/profile/${userData.profile}`
        return res.json({
            message : 'user image found',
            data : userData.profile
        })
    } catch (error) {
        return res.status(500).json({
            message : 'error when get user',
            error: error
        })
    }
}

module.exports = getUserImageByEmail