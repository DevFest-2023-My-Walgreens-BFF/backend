const {
  Medicines,
  SavedMedicines,
  Materials,
  Ingredients,
} = require('../../models');

class ProductRepository {
  createProductsMain = async (
    itemSeq,
    itemName,
    entpName,
    etcOtcCode,
    ingrName,
    validTerm,
    eeDocData,
    udDocData,
    nbDocData,
    totalAmount
  ) => {
    return Medicines.create({
      itemSeq,
      itemName,
      entpName,
      etcOtcCode,
      ingrName,
      validTerm,
      eeDocData,
      udDocData,
      nbDocData,
      totalAmount,
    });
  };
  updateProductsMain = async (
    itemSeq,
    itemName,
    entpName,
    etcOtcCode,
    ingrName,
    validTerm,
    eeDocData,
    udDocData,
    nbDocData,
    totalAmount
  ) => {
    await Medicines.update(
      {
        itemName,
        entpName,
        etcOtcCode,
        ingrName,
        validTerm,
        eeDocData,
        udDocData,
        nbDocData,
        totalAmount,
      },
      { where: { itemSeq } }
    );
  };
  createIngredients = async (medicineId, materialId, volume) => {
    await Ingredients.create({
      medicineId,
      materialId,
      volume,
    });
  };
  updateIngredients = async (ingredientId, volume) => {
    return Ingredients.update({ volume }, { where: { ingredientId } });
  };
  findOneIngredient = async (medicineId, materialId) => {
    return Ingredients.findOne({
      raw: true,
      where: { medicineId, materialId },
    });
  };
  updateProductsType = async (itemSeq, productType) => {
    return Medicines.update({ productType }, { where: { itemSeq } });
  };
  updateProductsImage = async (itemSeq, itemImage) => {
    return Medicines.update({ itemImage }, { where: { itemSeq } });
  };
  createMaterial = async (name, unit) => {
    return Materials.create({ name, unit });
  };
  findOneMaterial = async (name) => {
    return Materials.findOne({
      raw: true,
      where: { name },
    });
  };
  updateMaterials = async (materialId, content) => {
    return Materials.update({ content }, { where: { materialId } });
  };

  findAllProducts = async () => {
    return Medicines.findAll({
      raw: true,
      attributes: ['itemSeq'],
    });
  };

  findOneProduct = async (itemSeq) => {
    return Medicines.findOne({
      raw: true,
      where: { itemSeq },
    });
  };

  findSearchProduct = async (data, page, pageSize) => {
    console.log(data);
    //itemName : 제품명, productType : 타입, eeDocData: 효능효과
    return Medicines.findAndCountAll({
      raw: true,
      where: data,
      include: [
        {
          model: SavedMedicines,
          as: 'SavedMedicines',
          attributes: [],
          duplicating: false,
          required: false,
        },
      ],
      attributes: [
        'medicineId',
        'itemName',
        'entpName',
        'etcOtcCode',
        // 'productType',
        'itemImage',
        [
          SavedMedicines.sequelize.fn(
            'count',
            SavedMedicines.sequelize.col('SavedMedicines.medicineId')
          ),
          'savedCount',
        ],
      ],
      group: ['medicineId'],
      order: [['savedCount', 'DESC']],
      offset: (page - 1) * pageSize,
      limit: Number(pageSize),
    });
  };

  createDibs = async (medicineId, userId) => {
    return SavedMedicines.create({
      medicineId,
      userId,
    });
  };

  deleteDibs = async (medicineId, userId) => {
    return SavedMedicines.destroy({
      where: { medicineId, userId },
    });
  };

  findOneDibs = async (medicineId, userId) => {
    return SavedMedicines.findOne({
      raw: true,
      where: { medicineId, userId },
    });
  };

  getDibsProducts = async (userId) => {
    return SavedMedicines.findAll({
      raw: true,
      where: { userId },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Medicines,
          attributes: [
            'medicineId',
            'itemName',
            'entpName',
            'etcOtcCode',
            'productType',
            'itemImage',
          ],
        },
      ],
    });
  };

  findOneMedicine = async (medicineId) => {
    return Medicines.findOne({
      raw: true,
      where: { medicineId },
    });
  };
  findAllIngredients = async (medicineId) => {
    return Ingredients.findAll({
      raw: true,
      where: { medicineId },
      attributes: ['volume'],
      include: [
        {
          model: Materials,
          attributes: ['name', 'unit', 'content'],
        },
      ],
    });
  };
}

module.exports = ProductRepository;
