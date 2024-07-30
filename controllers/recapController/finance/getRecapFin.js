const { finance }= require("../../../models")

const getRecapFin = async (req,res)=>{
    const {id} = req.params
     try {
        const finances = await finance.findAll({
            where : {
                storeId : id
            }
        })  
        
        if (!finances) {
            return res.status(404).json({
                message : 'data not found'
            })
        }

        return res.json({
            message  :'Recap found',
            data : finances
        })

    } catch (error) {
        
    }
}

module.exports = getRecapFin