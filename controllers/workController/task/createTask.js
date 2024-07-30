const {task} = require('../../../models')
const generateRandomCode = require('../../../service/utils/generateRandomChar')

const addTask = async (req,res) =>{
    try {
        const {name,workspaceId,description,dueDate} = req.body
        if (!name || !workspaceId) {
            return res.status(400).json({
                message : "invalid value",
                code : res.statusCode
            })
        }

        const data = {
            id : generateRandomCode(4),
            name,
            description,
            workspaceId,
            dueDate : dueDate ?? new Date()
        }

        await task.create(data)
        res.json({
            message : "task created"
        })

    } catch (error) {
        console.log(req.body);
        console.log(error);
        res.status(500).json({
            message : 'Internal server error',
            code :res.statusCode,
            error : error,
        })
    }
}

module.exports = addTask