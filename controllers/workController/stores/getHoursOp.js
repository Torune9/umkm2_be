const { store_hours } = require('../../../models');

const getHoursOp = async (req, res) => {
    try {
        const { storeId } = req.params;
        const hours = await store_hours.findAll({
            where : {
                store_id : storeId
            }
        })

        if (!hours) {
            return res.status(404).json({
                message : 'data not found'
            })
        }

        return res.json({
            message : 'data founds',
            data : hours
        })
    } catch (error) {
        console.error('Error inserting store hours:', error);
        return res.status(500).json({
            message: 'An error occurred while inserting store hours'
        });
    }
};

module.exports = getHoursOp;
