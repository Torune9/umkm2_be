const {Store} = require('../../../models')

const updateStore = async (req,res)=>{
    const {name,description} = req.body
    const id = req.params.id
    try {
        const store = await Store.findOne({
            where : {
                id : id
            }
        })

        if (!store) {
           return res.status(404).json({
            message : 'store not found'
           }) 
        }
        store.name = name
        store.description = description
        await store.save()
        return res.json({
            message : 'store has been updated'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : 'internal server error',
            error : error
        })
    }
}

module.exports = updateStore