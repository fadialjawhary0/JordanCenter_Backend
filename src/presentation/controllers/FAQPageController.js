export class FAQPageController {
  constructor(faqPageService) {
    this.faqPageService = faqPageService;
  }

  getSettings = async (req, res, next) => {
    try {
      const settings = await this.faqPageService.getSettings();
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
        titleEn: req.body.titleEn,
        titleAr: req.body.titleAr,
        descriptionEn: req.body.descriptionEn,
        descriptionAr: req.body.descriptionAr,
      };

      const settings = await this.faqPageService.updateSettings(updateData);
      res.status(200).json({
        success: true,
        data: settings,
      });
    } catch (error) {
      next(error);
    }
  };

  getAllFAQItems = async (req, res, next) => {
    try {
      const items = await this.faqPageService.getAllFAQItems();
      res.status(200).json({
        success: true,
        data: items,
      });
    } catch (error) {
      next(error);
    }
  };

  getFAQItemById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const item = await this.faqPageService.getFAQItemById(id);
      res.status(200).json({
        success: true,
        data: item,
      });
    } catch (error) {
      next(error);
    }
  };

  createFAQItem = async (req, res, next) => {
    try {
      const itemData = {
        questionEn: req.body.questionEn,
        questionAr: req.body.questionAr,
        answerEn: req.body.answerEn,
        answerAr: req.body.answerAr,
        order: parseInt(req.body.order) || 0,
        isActive: req.body.isActive === 'true' || req.body.isActive === true,
      };

      const item = await this.faqPageService.createFAQItem(itemData);
      res.status(201).json({
        success: true,
        data: item,
      });
    } catch (error) {
      next(error);
    }
  };

  updateFAQItem = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateData = {
        questionEn: req.body.questionEn,
        questionAr: req.body.questionAr,
        answerEn: req.body.answerEn,
        answerAr: req.body.answerAr,
        order: req.body.order ? parseInt(req.body.order) : undefined,
        isActive: req.body.isActive !== undefined 
          ? (req.body.isActive === 'true' || req.body.isActive === true)
          : undefined,
      };

      const item = await this.faqPageService.updateFAQItem(id, updateData);
      res.status(200).json({
        success: true,
        data: item,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteFAQItem = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.faqPageService.deleteFAQItem(id);
      res.status(200).json({
        success: true,
        message: 'FAQ item deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };
}

export default FAQPageController;
