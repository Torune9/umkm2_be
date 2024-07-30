const { Op } = require("sequelize")
const {
    user,
    Store,
    workspace,
    task,
    sequelize
} = require("../../../models")

const getStoreAsEmployee = async(req,res)=>{
    console.log(req.headers);
    const email = req.get('X-Email-Employee')
    try {
        const employee = await user.findOne({
            where : {
                email : email
            },
            required: true,
            include : {
                model : Store,
                attributes: ['id','name','description','code','img'],
                as : 'members',
                where: {
                    id: {
                        [Op.eq] : sequelize.col('user.member_id')
                    },
                },
                include : {
                    model : workspace,
                    attributes : ['id','name','userId'],
                    include : {
                        model : task,
                        attributes : ['id','name','description','status','dueDate'],
                        include : {
                            model : user,
                            as : 'user_assignment',
                            attributes : ['username','email','id']
                        }
                    }
                },
            },
            attributes : ['username','email','member_id','profile']
        })

        if(!employee) {
            return res.status(404).json({
                message : 'User not found'
            })
        }

        return res.json({
            message : 'user and store founds',
            data : employee
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : 'internal server error when get user',
            error : error
        })
    }
}

module.exports = getStoreAsEmployee