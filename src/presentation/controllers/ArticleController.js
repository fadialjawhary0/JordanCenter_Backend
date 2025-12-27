export class ArticleController {
  constructor(articleService) {
    this.articleService = articleService;
  }

  getAll = async (req, res, next) => {
    try {
      const articles = await this.articleService.getAllArticles();
      res.status(200).json({
        success: true,
        data: articles,
      });
    } catch (error) {
      next(error);
    }
  };

  getActive = async (req, res, next) => {
    try {
      const articles = await this.articleService.getActiveArticles();
      res.status(200).json({
        success: true,
        data: articles,
      });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const article = await this.articleService.getArticleById(id);
      res.status(200).json({
        success: true,
        data: article,
      });
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const file = req.file;
      const articleData = {
        ...req.body,
        imageUrl: file ? `/uploads/${file.filename}` : req.body.imageUrl,
        date: req.body.date ? new Date(req.body.date) : new Date(),
        order: parseInt(req.body.order) || 0,
        isActive: req.body.isActive === 'true' || req.body.isActive === true,
      };
      const article = await this.articleService.createArticle(articleData);
      res.status(201).json({
        success: true,
        data: article,
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
        order: req.body.order ? parseInt(req.body.order) : undefined,
        isActive: req.body.isActive !== undefined 
          ? (req.body.isActive === 'true' || req.body.isActive === true)
          : undefined,
        date: req.body.date ? new Date(req.body.date) : undefined,
      };
      
      if (file) {
        updateData.imageUrl = `/uploads/${file.filename}`;
      }

      const article = await this.articleService.updateArticle(id, updateData);
      res.status(200).json({
        success: true,
        data: article,
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.articleService.deleteArticle(id);
      res.status(200).json({
        success: true,
        message: 'Article deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  getSectionSettings = async (req, res, next) => {
    try {
      const settings = await this.articleService.getSectionSettings();
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
      const settings = await this.articleService.updateSectionSettings(req.body);
      res.status(200).json({
        success: true,
        data: settings,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default ArticleController;
