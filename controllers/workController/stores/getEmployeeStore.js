const {user} = require('../../../models')

const getEmployeeStore = async (req,res)=>{
    try {
        const {id} = req.params
        const employee = await user.findAll({
            where : {
                member_id : id
            }
        })

        if (!employee) {
            return res.status(404).json({
                message : 'users not founds'
            })
        }
        return res.json({
            message : 'users founds',
            data  : employee
        })
    } catch(error){
        return res.status(500).json({
            message :'error catching users',
            error : error
        })
    }
}

module.exports = getEmployeeStore