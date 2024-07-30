const {workspace} = require('../../../models')
const generateRandomCode = require('../../../service/utils/generateRandomChar')
const addWorkspace = async (req,res)=>{
    const {name,storeId} = req.body
    try {
        
        if (!name || !storeId) {
            return res.status(400).json({
                message : "invalid value",
                code : res.statusCode
            })
        }
        const data = {
            id : generateRandomCode(6),
            name,
            storeId
        }
        await workspace.create(data)
        res.json({
            message : 'workspace created',
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : 'Internal server error',
            code :res.statusCode,
            error : error,
        })
    }
}

module.exports = addWorkspace