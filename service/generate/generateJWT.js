require('dotenv').config()
const jwt = require('jsonwebtoken')
const generateJwt = (option)=>{
    return jwt.sign(option,process.env.SECRET_KEY)
}

module.exports = generateJwt