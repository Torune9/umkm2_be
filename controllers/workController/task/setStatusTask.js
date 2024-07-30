const {task} = require('../../../models')

const setStatus = async (req,res)=>{
    const {id} = req.params
    const {status} = req.body
    console.log(status);
    try {
        const taskWs = await task.findOne({
            where  : {
                id : id
            }
        })
        if (!taskWs) {
            return res.status(404).json({
                message : 'failed to set status',
                error : 'user not found'
            })
        }

        taskWs.status = status;
        await taskWs.save()
        return res.json({
            message : 'task has set status',
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'internal server error',
            code : res.statusCode
        })
    }
}

module.exports = setStatus