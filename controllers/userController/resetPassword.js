const {user} = require('../../models')
const bcrypt = require('bcrypt')
const resetController = async (req,res)=>{
    const {token} = req.params
    const {newPassword} = req.body
    try{
        const users = await user.findOne({
            where : {
                reset_token : token
            }
        })

        if (!newPassword) {
            return res.status(404).json({
                message : `Form can't be empty`
            })
        }

        if(users){

            if(users.exp_token > new Date()){
                
                const hasNewPassword = await bcrypt.hash(newPassword,10)
                users.password = hasNewPassword
                users.reset_token = null
                users.exp_token = null
                
                await users.save()
                return res.render('closeTab',{
                    tittle :'Success',
                    message : `Thank you,The password has been changed, you can close this tab`,
                    code : res.statusCode
                })


            }else{
                return res.status(408).json({
                    message : 'Request timed out'
                })
            }
        }else{
           return res.status(400).json({
                message : 'Invalid token'
           })
        }


    }catch(err){
        console.log(err);
        res.json({
            error : err
        })
    }
   
}

const sendLink = async (req,res)=>{
    const {token} = req.params
    const users = await user.findOne({
        where : {
            reset_token : token
        }
    })
    if (users) {
        if (users.exp_token > new Date()) {
            res.render('resetPasswordLayout',{
                    token : token
                }
            )
        }else{
            return res.status(408).render('closeTab',{
                tittle : 'Not Success',
                message : 'Request Timed Out',
                code : res.statusCode
            })
        }
    }else{
        return res.status(406).render('closeTab',{
            tittle : 'Not Success',
            message : 'Invalid Token',
            code: res.statusCode
        })
    }
}


module.exports ={resetController,sendLink}