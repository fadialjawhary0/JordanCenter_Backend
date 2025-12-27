export class ServicesPageController {
  constructor(servicesPageService) {
    this.servicesPageService = servicesPageService;
  }

  getPageSettings = async (req, res, next) => {
    try {
      const settings = await this.servicesPageService.getPageSettings();
      res.status(200).json({
        success: true,
        data: settings,
      });
    } catch (error) {
      next(error);
    }
  };

  updatePageSettings = async (req, res, next) => {
    try {
      const file = req.file;
      const updateData = {
        heroTitleEn: req.body.heroTitleEn,
        heroTitleAr: req.body.heroTitleAr,
        heroDescriptionEn: req.body.heroDescriptionEn,
        heroDescriptionAr: req.body.heroDescriptionAr,
        tickerTextEn: req.body.tickerTextEn,
        tickerTextAr: req.body.tickerTextAr,
      };
      
      // Only update image if a new file is uploaded
      if (file) {
        updateData.heroImageUrl = `/uploads/${file.filename}`;
      } else if (req.body.heroImageUrl !== undefined) {
        // Allow updating imageUrl from body if no file is uploaded
        updateData.heroImageUrl = req.body.heroImageUrl || null;
      }
      
      const settings = await this.servicesPageService.updatePageSettings(updateData);
      res.status(200).json({
        success: true,
        data: settings,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default ServicesPageController;
