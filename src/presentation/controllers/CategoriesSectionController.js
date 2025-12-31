export class CategoriesSectionController {
  constructor(categoriesSectionService) {
    this.categoriesSectionService = categoriesSectionService;
  }

  getSectionSettings = async (req, res, next) => {
    try {
      const settings = await this.categoriesSectionService.getSectionSettings();
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
      const updateData = {
        sectionTitleEn: req.body.sectionTitleEn,
        sectionTitleAr: req.body.sectionTitleAr,
        sectionSubtitleEn: req.body.sectionSubtitleEn,
        sectionSubtitleAr: req.body.sectionSubtitleAr,
      };

      const settings = await this.categoriesSectionService.updateSectionSettings(updateData);
      res.status(200).json({
        success: true,
        data: settings,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default CategoriesSectionController;
