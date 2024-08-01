const {task,user} = require('../../../models')

const getTask = async (req,res) => {
    const {id} = req.params
    try {
        const tasks = await task.findAll({
            where : {
                workspaceId : id
            }
        })
        if (!tasks) {
            return res.status(404).json({
                message : 'tasks not found'
            })
        }
        return res.json({
            message : 'tasks and users found',
            data : tasks
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : 'error when catching tasks data',
            errors : error
        })
    }
}

module.exports = getTask