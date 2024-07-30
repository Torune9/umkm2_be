const { Store, product } = require('../../../models');

const getAllStore = async (req, res) => {
    const { code = '' } = req.params;
    try {
        const conditionStore = code ? { code: code } : {};
        const stores = await Store.findAll({
            where: conditionStore,
            include: product
        });

        return res.json({
            message: 'Store found',
            data: stores,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Internal server error',
            errors: error
        });
    }
};

module.exports = getAllStore;
