export class ProjectsPageController {
  constructor(projectsPageService) {
    this.projectsPageService = projectsPageService;
  }

  getSettings = async (req, res, next) => {
    try {
      const settings = await this.projectsPageService.getSettings();
      res.status(200).json({
        success: true,
        data: settings,
      });
    } catch (error) {
      next(error);
    }
  };

  updateSettings = async (req, res, next) => {
    try {
      const file = req.file;
      const updateData = {
        heroTitleEn: req.body.heroTitleEn,
        heroTitleAr: req.body.heroTitleAr,
        heroDescriptionEn: req.body.heroDescriptionEn,
        heroDescriptionAr: req.body.heroDescriptionAr,
      };
      
      if (file) {
        updateData.heroImageUrl = `/uploads/${file.filename}`;
      } else if (req.body.heroImageUrl) {
        updateData.heroImageUrl = req.body.heroImageUrl;
      }

      const settings = await this.projectsPageService.updateSettings(updateData);
      res.status(200).json({
        success: true,
        data: settings,
      });
    } catch (error) {
      next(error);
    }
  };

  getAllHeroButtons = async (req, res, next) => {
    try {
      const buttons = await this.projectsPageService.getAllHeroButtons();
      res.status(200).json({
        success: true,
        data: buttons,
      });
    } catch (error) {
      next(error);
    }
  };

  getHeroButtonById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const button = await this.projectsPageService.getHeroButtonById(id);
      res.status(200).json({
        success: true,
        data: button,
      });
    } catch (error) {
      next(error);
    }
  };

  createHeroButton = async (req, res, next) => {
    try {
      const buttonData = {
        textEn: req.body.textEn,
        textAr: req.body.textAr,
        link: req.body.link || null,
        order: parseInt(req.body.order) || 0,
        isActive: req.body.isActive === 'true' || req.body.isActive === true,
      };

      const button = await this.projectsPageService.createHeroButton(buttonData);
      res.status(201).json({
        success: true,
        data: button,
      });
    } catch (error) {
      next(error);
    }
  };

  updateHeroButton = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateData = {
        textEn: req.body.textEn,
        textAr: req.body.textAr,
        link: req.body.link !== undefined ? req.body.link : undefined,
        order: req.body.order ? parseInt(req.body.order) : undefined,
        isActive: req.body.isActive !== undefined 
          ? (req.body.isActive === 'true' || req.body.isActive === true)
          : undefined,
      };

      const button = await this.projectsPageService.updateHeroButton(id, updateData);
      res.status(200).json({
        success: true,
        data: button,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteHeroButton = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.projectsPageService.deleteHeroButton(id);
      res.status(200).json({
        success: true,
        message: 'Hero button deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };
}

export default ProjectsPageController;










