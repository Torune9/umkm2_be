const {validationResult,matchedData} = require('express-validator')
const {user} = require('../../models')
const bcrypt = require('bcrypt')
const register = async (req,res)=>{
    try {
        const result  = validationResult(req)
        const data = matchedData(req)
        const errors = result.array()[0]
        if(errors){
            return res.status(400).json({
                errors : {
                    message : errors.msg,
                    path : errors.path
                }
            })
        }
        const hashPassword = await bcrypt.hash(data.password,10)
        const dataUser = {
            username : data.username,
            email : data.email,
            password : hashPassword,
        } 
        const userEmail = await user.findOne({
            where : {
                email : data.email
            }
        })
        if (userEmail) {
            return res.status(400).json({
                message : 'email has already taken,try another username'
            })
        } 
        
        if (result.isEmpty()) {
            await user.create(dataUser)
            return res.json({
                message: 'Account has been created',
            })
        }else{
            res.status(401).end()
        }
    } catch (error) {
        return res.status(500).json({
            message : "Internal Server Error",
            error : error
        })
    }
}

module.exports = register