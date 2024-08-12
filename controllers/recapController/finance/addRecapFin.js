const {finance} = require('../../../models')

const addRecapFin = async (req,res)=>{
    const {income,exp,information,storeId} = req.body
    try {
        if (!storeId) {
            return res.status(404).json({
                message : 'can,t be recap,store not found'
            })
        }
        if (income == null && exp == null) {
            return res.status(404).json({
                message : 'invalid value'
            })
        }

        const result = income - exp
        const now = new Date()
        const countdown = new Date(now.setMonth(now.getMonth() + 1))
        let prof,loss;
        result > 0 ? prof = result : loss = result

        const data = {
            income,
            expenditure : exp,
            profit : prof,
            information,
            loss : loss,
            countdown,
            storeId,
        }
        await finance.create(data)
        
        return res.json({
            message : 'finance recap has been created',
            data : data
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message :'error when recap finnace',
            errors : error
        })
    }
}

module.exports = addRecapFin