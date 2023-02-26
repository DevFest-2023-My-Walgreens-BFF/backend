const ProductRepository = require('../repositories/products.repository');
require('dotenv').config();
const axios = require('axios');
const {
  ValidationError,
} = require('../../middlewares/exceptions/error.class.js');
const { Op } = require('sequelize');

class ProductService {
  productsRepository = new ProductRepository();

  findMedicines = async (type, value, page, pageSize) => {
    const searchValue = ('%' + value + '%').replace(/\s|\b/gi, '');
    let data;

    if (type === 'itemName') {
      data = {
        itemName: {
          [Op.like]: searchValue,
        },
      };
    } else if (type === 'productType') {
      data = {
        productType: {
          [Op.like]: searchValue,
        },
      };
    }
    console.log(data);
    const searchData = await this.productsRepository.findSearchProduct(
      data,
      page,
      pageSize
    );

    const processingData = searchData.rows.map((d) => {
      return {
        medicineId: d.medicineId,
        itemName: d.itemName,
        entpName: d.entpName,
        etcOtcCode: d.etcOtcCode,
        productType: d.productType,
        itemImage: d.itemImage,
      };
    });
    return (
      { searchLength: searchData.count.length, data: processingData } || []
    );
  };

  findOneMedicine = async (medicineId) => {
    const product = await this.productsRepository.findOneMedicine(medicineId);
    const ingredients = await this.productsRepository.findAllIngredients(
      medicineId
    );
    product.materialName = ingredients.map((i) => {
      return {
        material: i['Material.name'],
        Dosage: i.volume,
        Unit: i['Material.unit'],
        Content: i['Material.content'],
      };
    });

    if (!product)
      throw new ValidationError('Not Able to locate the medication.', 412);

    return product;
  };
}

module.exports = ProductService;
