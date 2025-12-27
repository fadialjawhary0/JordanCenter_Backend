export class BrandController {
  constructor(brandService) {
    this.brandService = brandService;
  }

  getAll = async (req, res, next) => {
    try {
      const brands = await this.brandService.getAllBrands();
      res.status(200).json({
        success: true,
        data: brands,
      });
    } catch (error) {
      next(error);
    }
  };

  getActive = async (req, res, next) => {
    try {
      const brands = await this.brandService.getActiveBrands();
      res.status(200).json({
        success: true,
        data: brands,
      });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const brand = await this.brandService.getBrandById(id);
      res.status(200).json({
        success: true,
        data: brand,
      });
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const file = req.file;
      const brandData = {
        name: req.body.name || req.body.nameEn || '',
        nameEn: req.body.nameEn,
        nameAr: req.body.nameAr,
        logoUrl: file ? `/uploads/${file.filename}` : req.body.logoUrl,
        order: req.body.order || 0,
        isActive: req.body.isActive === 'true' || req.body.isActive === true,
      };

      const brand = await this.brandService.createBrand(brandData);
      res.status(201).json({
        success: true,
        data: brand,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const file = req.file;
      const updateData = {};

      if (req.body.name !== undefined) updateData.name = req.body.name;
      if (req.body.nameEn !== undefined) updateData.nameEn = req.body.nameEn;
      if (req.body.nameAr !== undefined) updateData.nameAr = req.body.nameAr;
      if (req.body.order !== undefined) updateData.order = parseInt(req.body.order);
      if (req.body.isActive !== undefined) updateData.isActive = req.body.isActive === 'true' || req.body.isActive === true;

      if (file) {
        updateData.logoUrl = `/uploads/${file.filename}`;
      } else if (req.body.logoUrl !== undefined) {
        updateData.logoUrl = req.body.logoUrl || null;
      }

      const brand = await this.brandService.updateBrand(id, updateData);
      res.status(200).json({
        success: true,
        data: brand,
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.brandService.deleteBrand(id);
      res.status(200).json({
        success: true,
        message: 'Brand deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };
}

export default BrandController;
