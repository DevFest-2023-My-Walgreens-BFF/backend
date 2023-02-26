const ProductService = require('../services/products.service');

const {
  InvalidParamsError,
} = require('../../middlewares/exceptions/error.class.js');

class ProductController {
  constructor() {
    this.productService = new ProductService();
  }

  // 제품 목록 조회 (검색)
  findMedicines = async (req, res, next) => {
    try {
      let { type, value, page, pageSize } = req.query;

      if (!type || (type !== 'itemName' && type !== 'productType'))
        throw new InvalidParamsError('검색분류를 확인해주세요.', 412);
      if (!value) throw new InvalidParamsError('검색어를 확인해주세요.', 412);
      if (!page || page <= 0) page = 1;
      if (!pageSize || pageSize <= 0) pageSize = 20;

      const products = await this.productService.findMedicines(
        type,
        value,
        page,
        pageSize
      );

      console.log(products);
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  };

  // 제품 상세 조회
  findOneMedicine = async (req, res, next) => {
    try {
      const { medicineId } = req.params;

      if (!medicineId)
        throw new InvalidParamsError('제품 정보가 없습니다.', 412);

      const product = await this.productService.findOneMedicine(medicineId);

      res.status(200).json({ product });
    } catch (error) {
      next(error);
    }
  };

  // 제품 비교하기
  compareProducts = async (req, res, next) => {
    try {
      if (!req.params)
        throw new InvalidParamsError('비교 할 약품을 다시 확인해주세요.', 412);
      const { compareA, compareB } = req.query;
      if (!compareA || !compareB)
        throw new InvalidParamsError('비교 할 약품을 다시 확인해주세요.', 412);

      const productA = await this.productService.findOneMedicine(compareA);
      const productB = await this.productService.findOneMedicine(compareB);

      res.status(200).json({ compareA: productA, compareB: productB });
    } catch (error) {}
  };
}
module.exports = ProductController;
