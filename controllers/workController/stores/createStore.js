const {Store} = require('../../../models');
const generateRandomCode = require('../../../service/utils/generateRandomChar');

const createStore = async (req,res)=>{
    const {name,description,userId,phoneNumber,address} = req.body
    const profileImg = req.file
    try {
        if (!name || !description || !userId || !phoneNumber || !address) {
            return res.status(406).json({
                message : 'invalid value',
            })
        }
        const data = {
            name,
            description,
            userId,
            code : generateRandomCode(5),
            phoneNumber,
            address
        }
        if (profileImg) {
            data.img  = profileImg.path
        }
        await Store.create(data) 
        return res.json({
            message : 'store has been created',
        })
    } catch (error) {
        console.log("Store:",error);
        return res.status(500).json({
            mesage  : 'internal server error',
            error : error 
        })
    }
}


module.exports = createStore