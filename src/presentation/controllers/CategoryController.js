export class CategoryController {
  constructor(categoryService) {
    this.categoryService = categoryService;
  }

  getAll = async (req, res, next) => {
    try {
      const categories = await this.categoryService.getAllCategories();
      res.status(200).json({
        success: true,
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  };

  getActive = async (req, res, next) => {
    try {
      const categories = await this.categoryService.getActiveCategories();
      res.status(200).json({
        success: true,
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await this.categoryService.getCategoryById(id);
      res.status(200).json({
        success: true,
        data: category,
      });
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const file = req.file;
      const categoryData = {
        ...req.body,
        imageUrl: file ? `/uploads/${file.filename}` : req.body.imageUrl,
        productCount: parseInt(req.body.productCount) || 0,
        order: parseInt(req.body.order) || 0,
        isActive: req.body.isActive === 'true' || req.body.isActive === true,
      };
      const category = await this.categoryService.createCategory(categoryData);
      res.status(201).json({
        success: true,
        data: category,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const file = req.file;
      const updateData = {
        ...req.body,
        productCount: req.body.productCount ? parseInt(req.body.productCount) : undefined,
        order: req.body.order ? parseInt(req.body.order) : undefined,
        isActive: req.body.isActive !== undefined 
          ? (req.body.isActive === 'true' || req.body.isActive === true)
          : undefined,
      };
      
      if (file) {
        updateData.imageUrl = `/uploads/${file.filename}`;
      }

      const category = await this.categoryService.updateCategory(id, updateData);
      res.status(200).json({
        success: true,
        data: category,
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.categoryService.deleteCategory(id);
      res.status(200).json({
        success: true,
        message: 'Category deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };
}

export default CategoryController;

