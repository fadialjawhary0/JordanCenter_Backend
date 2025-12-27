export class ProductTypeController {
  constructor(productTypeService) {
    this.productTypeService = productTypeService;
  }

  getAll = async (req, res, next) => {
    try {
      const productTypes = await this.productTypeService.getAllProductTypes();
      res.status(200).json({
        success: true,
        data: productTypes,
      });
    } catch (error) {
      next(error);
    }
  };

  getActive = async (req, res, next) => {
    try {
      const productTypes = await this.productTypeService.getActiveProductTypes();
      res.status(200).json({
        success: true,
        data: productTypes,
      });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const productType = await this.productTypeService.getProductTypeById(id);
      res.status(200).json({
        success: true,
        data: productType,
      });
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const productTypeData = {
        nameEn: req.body.nameEn,
        nameAr: req.body.nameAr,
        order: req.body.order || 0,
        isActive: req.body.isActive === 'true' || req.body.isActive === true,
      };

      const productType = await this.productTypeService.createProductType(productTypeData);
      res.status(201).json({
        success: true,
        data: productType,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateData = {};

      if (req.body.nameEn !== undefined) updateData.nameEn = req.body.nameEn;
      if (req.body.nameAr !== undefined) updateData.nameAr = req.body.nameAr;
      if (req.body.order !== undefined) updateData.order = parseInt(req.body.order);
      if (req.body.isActive !== undefined) updateData.isActive = req.body.isActive === 'true' || req.body.isActive === true;

      const productType = await this.productTypeService.updateProductType(id, updateData);
      res.status(200).json({
        success: true,
        data: productType,
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.productTypeService.deleteProductType(id);
      res.status(200).json({
        success: true,
        message: 'Product type deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };
}

export default ProductTypeController;
