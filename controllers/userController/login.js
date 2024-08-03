const bcrypt = require('bcrypt')
const {user,Store} = require('../../models')
const generateJwt = require('../../service/generate/generateJWT')

const login = async (req,res)=>{
    try {
        const {email,password} = req.body
        const userAuth = await user.findOne({
           where : {
             email : email
           },
           include : [
            {
                model : Store,
                attributes: ['id','name','description'],
                as : 'user_owned',
                required: false 
            },
           ],
        })
        if (!userAuth) {
            return res.status(404).json({
                message : 'account not found'
            })
        }
        const src = `${req.protocol}://${req.get('host')}/source/profile/${userAuth.profile}`
        const token = generateJwt({
            id : userAuth.id,
            member: userAuth.member_id,
            username : userAuth.username,
            email : email,
            image : userAuth.profile ? src : userAuth.profile ,
        },process.env.SECRET_KEY)
        
        const isLogin = await bcrypt.compare(password,userAuth.password)
        
        if (!isLogin) {
            return res.status(400).json({
                message : 'wrong email or password '
            })
        }else{
            return res.json({
                message : "Login success",
                data : {
                    isLogin,
                    token : token,
                    store_owned : userAuth.user_owned,
                    store_members : userAuth.members,
                },
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "Internal server error,when trying to login"
        })
    }
}
module.exports = login
