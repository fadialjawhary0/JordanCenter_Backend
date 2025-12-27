export class TermsAndConditionsPageController {
  constructor(termsAndConditionsPageService) {
    this.termsAndConditionsPageService = termsAndConditionsPageService;
  }

  getSettings = async (req, res, next) => {
    try {
      const settings = await this.termsAndConditionsPageService.getSettings();
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
        ...req.body,
      };
      
      if (file) {
        updateData.heroImageUrl = `/uploads/${file.filename}`;
      }

      const settings = await this.termsAndConditionsPageService.updateSettings(updateData);
      res.status(200).json({
        success: true,
        data: settings,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default TermsAndConditionsPageController;
