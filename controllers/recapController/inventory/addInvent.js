const {inventory} = require('../../../models')
const {matchedData,validationResult} = require('express-validator')

const addInvent = async (req,res)=>{
    const matchData = matchedData(req)
    const dataValid = validationResult(req)
    const errors = dataValid.array()[0]
    try {
        const data = {
            name : matchData.name,
            stock : matchData.stock,
            price : matchData.price,
            description : matchData.description,
            storeId : matchData.storeId
        }
        if (!errors) {
            await inventory.create(data)
            res.json({
                message : "product has been added to inventory"
            })
        }else{
            res.status(400).json({
                message : errors.msg,
                path : errors.path
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "error",
            error : error
        })
    }
}

module.exports = addInvent