const {Store} = require('../../../models');
const generateRandomCode = require('../../../service/utils/generateRandomChar');

const createStore = async (req,res)=>{
    const {name,description,userId,noHp} = req.body
    const profileImg = req.file
    console.log(req.file);
    try {
        if (!name || !description || !userId || !noHp) {
            return res.status(406).json({
                message : 'invalid value',
            })
        }
        const data = {
            name,
            description,
            userId,
            code : generateRandomCode(5),
            phoneNumber : noHp,
        }
        if (profileImg) {
            data.img  = profileImg.filename
        }
        await Store.create(data) 
        return res.json({
            message : 'store has been created',
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            mesage  : 'internal server error',
            error : error 
        })
    }
}


module.exports = createStore