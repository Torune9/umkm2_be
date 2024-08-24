const { store_hours } = require('../../../models');

const updateHoursOp = async (req, res) => {
    try {
        const { storeHours, storeId } = req.body;

        // Iterasi melalui setiap hari dan simpan jam operasional
        for (const [day, hours] of Object.entries(storeHours)) {
            const { open, close, closed } = hours;

            // Cari record yang ada berdasarkan store_id dan day_of_week
            const existingRecord = await store_hours.findOne({
                where: {
                    store_id: storeId,
                    day_of_week: day
                }
            });

            if (existingRecord) {
                // Update record yang ada
                await store_hours.update({
                    open_time: open !== 'Closed' ? open : null,
                    closed_time: close !== 'Closed' ? close : null,
                    is_closed: closed
                }, {
                    where: {
                        store_id: storeId,
                        day_of_week: day
                    }
                });
            } else {
                // Tambahkan record baru jika tidak ditemukan (opsional)
                await store_hours.create({
                    store_id: storeId,
                    day_of_week: day,
                    open_time: open !== 'Closed' ? open : null,
                    closed_time: close !== 'Closed' ? close : null,
                    is_closed: closed
                });
            }
        }

        return res.json({
            message: 'Jam operasional berhasil diperbarui'
        });

    } catch (error) {
        console.error('Error updating store hours:', error);
        return res.status(500).json({
            message: 'Gagal memperbarui jam operasional'
        });
    }
}

module.exports = updateHoursOp;
