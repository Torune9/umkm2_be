const {body}  = require('express-validator')

const inventSanitize = (opt)=>{
    return [
        body(['name','stock','price','storeId']).notEmpty().trim().escape(),
        body(['description']).trim().escape(),
    ]
}
module.exports = inventSanitize 