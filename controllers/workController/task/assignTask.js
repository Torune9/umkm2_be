const {task} = require('../../../models')

const assignTask = async (req,res)=>{
    const {id} = req.params
    const {userId} = req.body
    try {
        const taskWs = await task.findOne({
            where  : {
                id : id
            }
        })
        if (!taskWs) {
            return res.status(404).json({
                message : 'failed to assign task',
                error : 'user not found'
            })
        }

        taskWs.userId = userId;
        await taskWs.save()
        return res.json({
            message : 'task has been assign',
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'internal server error',
            code : res.statusCode
        })
    }
}

module.exports = assignTask