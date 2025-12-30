export class ThemeController {
  constructor(themeService) {
    this.themeService = themeService;
  }

  getSettings = async (req, res, next) => {
    try {
      const settings = await this.themeService.getSettings();
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
      const updateData = {
        colorBrand: req.body.colorBrand,
        colorBrandDark: req.body.colorBrandDark,
        colorAccent: req.body.colorAccent,
        colorDestructive: req.body.colorDestructive,
        colorWarning: req.body.colorWarning,
        colorInfo: req.body.colorInfo,
        colorRing: req.body.colorRing,
        fontFamily: req.body.fontFamily,
        fontFamilyAr: req.body.fontFamilyAr,
      };

      const settings = await this.themeService.updateSettings(updateData);
      res.status(200).json({
        success: true,
        data: settings,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default ThemeController;

