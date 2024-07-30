const { product } = require("../../../../models");
const fs = require('fs');

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const productToDelete = await product.findOne({
      where: { id: id }
    });

    if (!productToDelete) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    // Hapus gambar jika ada
    if (productToDelete.img) {
      const imagePath = `uploads/image/${productToDelete.img}`;
      fs.rm(imagePath, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log(`Successfully deleted ${imagePath}`);
        }
      });
    }

    // Hapus produk
    await product.destroy({
      where: { id: id }
    });

    return res.json({
      message: 'Product has been deleted'
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error',
      errors: error
    });
  }
};

module.exports = deleteProduct;
