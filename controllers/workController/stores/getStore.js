const { Op } = require('sequelize');
const { Store, workspace, user, sequelize } = require('../../../models');

const getStore = async (req, res) => {
    const { id } = req.params;
    try {
        const store = await Store.findOne({
            where: {
               userId : id
            },
            include: [
                {
                    model: workspace,
                },
                {
                    model: user,
                    as: 'employees',
                    required: false,
                    where: {
                        member_id: {
                            [Op.eq]: sequelize.col('Store.id')
                        }
                    },
                    attributes : ['id','username','email']
                },
            ]
        });

        if (!store) {
            return res.status(404).json({
                message: 'Store not found'
            });
        }

        return res.json({
            message: 'Store found',
            data: store,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Internal server error',
            errors: error
        });
    }
};

module.exports = getStore;
