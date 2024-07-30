const {workspace,task,user} = require('../../../models')

const getWorkspace = async (req,res)=>{
    const {id} = req.params
    const {status=''} = req.query
    try {
        const taskWhereCondition = status ? { status: status } :{};
        const workspaces = await workspace.findAll({
            where : {
                storeId : id,
            },
            include : {
                model : task,
                where : taskWhereCondition,
                required : false,
                attributes :['id','name','userId','status','description','dueDate'],
                include : {
                    model : user,
                    as : 'user_task',
                    attributes : ['username','email'],
                }
            }
        })

        if (!workspaces || workspaces.length === 0) {
            return res.status(404).json({
                message : 'workspace not found'
            })
        }

        return res.json({
            message : 'workspace and tasks found',
            data : workspaces
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : 'error when catching workspace data',
            error : error.message
        })
    }
}

module.exports = getWorkspace