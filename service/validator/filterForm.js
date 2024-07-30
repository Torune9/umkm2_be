const {body}  = require('express-validator')

const filterform = (req,res,next)=>{
    return [
        body(['username','password']).notEmpty().trim().escape(),
        body('email').isEmail().trim().escape().notEmpty().withMessage('Not valid email-address')
    ]
}
module.exports = filterform