const {finance} = require('../../../models')

const updateRecapFin = async (req,res)=>{
    const {id} = req.params
    const {income,exp,information} = req.body
    try {
        const financeUpdate = await finance.findOne({
            where : {
                storeId : id
            }
        })
        
        if (!financeUpdate) {
            return res.status(404).json({
                message : "recap not found,and can't update value"
            })
        }
        financeUpdate.income = income ? income : financeUpdate.income
        financeUpdate.expenditure = exp ? exp : financeUpdate.expenditure
        financeUpdate.information = information ? information : financeUpdate.information
        
        const result = financeUpdate.income - financeUpdate.expenditure
        let prof,loss;
        result > 0 ? prof = result : loss = result
        prof ? [prof = prof, loss = null ] : [prof = null,loss = loss]
        
        financeUpdate.profit = prof
        financeUpdate.loss = loss

        await financeUpdate.save()
        
        return res.json({
            message : 'finance recap has been updated',
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message :'error when recap finnace',
            errors : error
        })
    }
}

module.exports = updateRecapFin