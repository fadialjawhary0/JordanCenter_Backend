export class BrandsSectionController {
  constructor(brandsSectionService) {
    this.brandsSectionService = brandsSectionService;
  }

  getActive = async (req, res, next) => {
    try {
      const brandsSection = await this.brandsSectionService.getActiveBrandsSection();
      res.status(200).json({
        success: true,
        data: brandsSection,
      });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const brandsSection = await this.brandsSectionService.getBrandsSectionById(id);
      res.status(200).json({
        success: true,
        data: brandsSection,
      });
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const brandsSection = await this.brandsSectionService.createBrandsSection(req.body);
      res.status(201).json({
        success: true,
        data: brandsSection,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const brandsSection = await this.brandsSectionService.updateBrandsSection(id, req.body);
      res.status(200).json({
        success: true,
        data: brandsSection,
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.brandsSectionService.deleteBrandsSection(id);
      res.status(200).json({
        success: true,
        message: 'Brands section deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  uploadLogo = async (req, res, next) => {
    try {
      const { brandsSectionId } = req.params;
      const { order, nameEn, nameAr } = req.body;
      const file = req.file;

      if (!file) {
        return res.status(400).json({
          success: false,
          message: 'No file uploaded',
        });
      }

      const logoData = {
        imageUrl: `/uploads/${file.filename}`,
        nameEn: nameEn || 'Brand',
        nameAr: nameAr || 'علامة تجارية',
        order: parseInt(order) || 0,
      };

      const logo = await this.brandsSectionService.addLogo(brandsSectionId, logoData);
      res.status(201).json({
        success: true,
        data: logo,
      });
    } catch (error) {
      next(error);
    }
  };

  updateLogo = async (req, res, next) => {
    try {
      const { logoId } = req.params;
      const updateData = {};
      if (req.body.nameEn !== undefined) updateData.nameEn = req.body.nameEn;
      if (req.body.nameAr !== undefined) updateData.nameAr = req.body.nameAr;
      if (req.body.order !== undefined) updateData.order = parseInt(req.body.order);
      if (req.body.isActive !== undefined) updateData.isActive = req.body.isActive === 'true' || req.body.isActive === true;

      const logo = await this.brandsSectionService.updateLogo(logoId, updateData);
      res.status(200).json({
        success: true,
        data: logo,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteLogo = async (req, res, next) => {
    try {
      const { logoId } = req.params;
      await this.brandsSectionService.deleteLogo(logoId);
      res.status(200).json({
        success: true,
        message: 'Logo deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  getSectionSettings = async (req, res, next) => {
    try {
      const settings = await this.brandsSectionService.getSectionSettings();
      res.status(200).json({
        success: true,
        data: settings,
      });
    } catch (error) {
      next(error);
    }
  };

  updateSectionSettings = async (req, res, next) => {
    try {
      const settings = await this.brandsSectionService.updateSectionSettings(req.body);
      res.status(200).json({
        success: true,
        data: settings,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default BrandsSectionController;
