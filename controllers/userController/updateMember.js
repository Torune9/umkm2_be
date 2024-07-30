const {user,Store} = require('../../models')

const updateMember = async (req,res)=>{
    const {code} = req.body
    const {id} = req.query
    console.log(id,code);
    try {
        const foundStores = await Store.findOne({
            where : {
                code : code
            }
        })
        
        if (!foundStores) {
            return res.status(404).json({
                error : {
                    message : 'stores not found'
                }
            })
        }
        await user.update(
            {member_id : foundStores.id},
            {
                where : {
                    id : id,
                },
            },
        )
        
        return res.json({
            data : {
                message : 'user has been joined'
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error :{
                message : 'internal server errors'
            }
        })
    }
}

module.exports = updateMember