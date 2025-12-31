export class FooterController {
  constructor(footerService) {
    this.footerService = footerService;
  }

  getSettings = async (req, res, next) => {
    try {
      const settings = await this.footerService.getSettings();
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
        column1TitleEn: req.body.column1TitleEn,
        column1TitleAr: req.body.column1TitleAr,
        column2TitleEn: req.body.column2TitleEn,
        column2TitleAr: req.body.column2TitleAr,
        column3TitleEn: req.body.column3TitleEn,
        column3TitleAr: req.body.column3TitleAr,
        column4TitleEn: req.body.column4TitleEn,
        column4TitleAr: req.body.column4TitleAr,
        followUsTitleEn: req.body.followUsTitleEn,
        followUsTitleAr: req.body.followUsTitleAr,
        newsletterTitleEn: req.body.newsletterTitleEn,
        newsletterTitleAr: req.body.newsletterTitleAr,
        newsletterEmailPlaceholderEn: req.body.newsletterEmailPlaceholderEn,
        newsletterEmailPlaceholderAr: req.body.newsletterEmailPlaceholderAr,
        newsletterButtonTextEn: req.body.newsletterButtonTextEn,
        newsletterButtonTextAr: req.body.newsletterButtonTextAr,
        copyrightTextEn: req.body.copyrightTextEn,
        copyrightTextAr: req.body.copyrightTextAr,
      };

      const settings = await this.footerService.updateSettings(updateData);
      res.status(200).json({
        success: true,
        data: settings,
      });
    } catch (error) {
      next(error);
    }
  };

  getAllLinks = async (req, res, next) => {
    try {
      const links = await this.footerService.getAllLinks();
      res.status(200).json({
        success: true,
        data: links,
      });
    } catch (error) {
      next(error);
    }
  };

  getLinkById = async (req, res, next) => {
    try {
      const link = await this.footerService.getLinkById(req.params.id);
      if (!link) {
        return res.status(404).json({
          success: false,
          message: 'Link not found',
        });
      }
      res.status(200).json({
        success: true,
        data: link,
      });
    } catch (error) {
      next(error);
    }
  };

  createLink = async (req, res, next) => {
    try {
      const linkData = {
        column: parseInt(req.body.column),
        textEn: req.body.textEn,
        textAr: req.body.textAr,
        link: req.body.link,
        order: parseInt(req.body.order) || 0,
        isActive: req.body.isActive !== undefined ? req.body.isActive : true,
      };

      const link = await this.footerService.createLink(linkData);
      res.status(201).json({
        success: true,
        data: link,
      });
    } catch (error) {
      next(error);
    }
  };

  updateLink = async (req, res, next) => {
    try {
      const updateData = {};
      if (req.body.column !== undefined) updateData.column = parseInt(req.body.column);
      if (req.body.textEn !== undefined) updateData.textEn = req.body.textEn;
      if (req.body.textAr !== undefined) updateData.textAr = req.body.textAr;
      if (req.body.link !== undefined) updateData.link = req.body.link;
      if (req.body.order !== undefined) updateData.order = parseInt(req.body.order);
      if (req.body.isActive !== undefined) updateData.isActive = req.body.isActive;

      const link = await this.footerService.updateLink(req.params.id, updateData);
      res.status(200).json({
        success: true,
        data: link,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteLink = async (req, res, next) => {
    try {
      await this.footerService.deleteLink(req.params.id);
      res.status(200).json({
        success: true,
        message: 'Link deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  getAllSocialMedia = async (req, res, next) => {
    try {
      const socialMedia = await this.footerService.getAllSocialMedia();
      res.status(200).json({
        success: true,
        data: socialMedia,
      });
    } catch (error) {
      next(error);
    }
  };

  getSocialMediaById = async (req, res, next) => {
    try {
      const socialMedia = await this.footerService.getSocialMediaById(req.params.id);
      if (!socialMedia) {
        return res.status(404).json({
          success: false,
          message: 'Social media not found',
        });
      }
      res.status(200).json({
        success: true,
        data: socialMedia,
      });
    } catch (error) {
      next(error);
    }
  };

  createSocialMedia = async (req, res, next) => {
    try {
      const socialMediaData = {
        name: req.body.name,
        url: req.body.url,
        iconType: req.body.iconType,
        order: parseInt(req.body.order) || 0,
        isActive: req.body.isActive !== undefined ? req.body.isActive : true,
      };

      const socialMedia = await this.footerService.createSocialMedia(socialMediaData);
      res.status(201).json({
        success: true,
        data: socialMedia,
      });
    } catch (error) {
      next(error);
    }
  };

  updateSocialMedia = async (req, res, next) => {
    try {
      const updateData = {};
      if (req.body.name !== undefined) updateData.name = req.body.name;
      if (req.body.url !== undefined) updateData.url = req.body.url;
      if (req.body.iconType !== undefined) updateData.iconType = req.body.iconType;
      if (req.body.order !== undefined) updateData.order = parseInt(req.body.order);
      if (req.body.isActive !== undefined) updateData.isActive = req.body.isActive;

      const socialMedia = await this.footerService.updateSocialMedia(req.params.id, updateData);
      res.status(200).json({
        success: true,
        data: socialMedia,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteSocialMedia = async (req, res, next) => {
    try {
      await this.footerService.deleteSocialMedia(req.params.id);
      res.status(200).json({
        success: true,
        message: 'Social media deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };
}

export default FooterController;
