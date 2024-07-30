const { inventory }= require("../../../models")

const getInventories = async (req,res)=>{
    const {id} = req.params
     try {
        const inventories = await inventory.findAll({
            where : {
                storeId : id
            }
        })  
        
        if (!inventories) {
            return res.status(404).json({
                message : 'data not found'
            })
        }

        return res.json({
            message  :'Recap found',
            data : inventories
        })

    } catch (error) {
        
    }
}

module.exports = getInventories