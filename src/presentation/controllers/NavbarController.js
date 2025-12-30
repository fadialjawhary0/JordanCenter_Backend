export class NavbarController {
  constructor(navbarService) {
    this.navbarService = navbarService;
  }

  getSettings = async (req, res, next) => {
    try {
      const settings = await this.navbarService.getSettings();
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
      const updateData = {};

      if (file) {
        updateData.logoUrl = `/uploads/${file.filename}`;
      } else if (req.body.logoUrl !== undefined) {
        updateData.logoUrl = req.body.logoUrl;
      }

      const settings = await this.navbarService.updateSettings(updateData);
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
      const links = await this.navbarService.getAllLinks();
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
      const { id } = req.params;
      const link = await this.navbarService.getLinkById(id);
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
        textEn: req.body.textEn,
        textAr: req.body.textAr,
        link: req.body.link,
        order: parseInt(req.body.order) || 0,
        isActive: req.body.isActive === 'true' || req.body.isActive === true,
      };

      const link = await this.navbarService.createLink(linkData);
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
      const { id } = req.params;
      const updateData = {};

      if (req.body.textEn !== undefined) updateData.textEn = req.body.textEn;
      if (req.body.textAr !== undefined) updateData.textAr = req.body.textAr;
      if (req.body.link !== undefined) updateData.link = req.body.link;
      if (req.body.order !== undefined) updateData.order = parseInt(req.body.order);
      if (req.body.isActive !== undefined) updateData.isActive = req.body.isActive === 'true' || req.body.isActive === true;

      const link = await this.navbarService.updateLink(id, updateData);
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
      const { id } = req.params;
      await this.navbarService.deleteLink(id);
      res.status(200).json({
        success: true,
        message: 'Navbar link deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };
}

export default NavbarController;

