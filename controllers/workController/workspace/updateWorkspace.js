const {workspace} = require('../../../models')
const updateWorkspace = async (req,res)=>{
   const {id} = req.query
   console.log(id);
   const {name} = req.body
    try {
        const workspaceUp = await workspace.findOne({
            where : {
                id : id
            }
        })
        if (!id) {
            return res.status(400).json({
                message : 'failed to update'
            })
        }
        workspaceUp.name = name
        await workspaceUp.save()
        return res.json({
            mesage : 'workspace has been updated'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : 'internal server error'
        })
    }
}

module.exports = updateWorkspace