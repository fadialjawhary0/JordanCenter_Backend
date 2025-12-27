export class HeroSectionController {
  constructor(heroSectionService) {
    this.heroSectionService = heroSectionService;
  }

  getActive = async (req, res, next) => {
    try {
      const heroSection = await this.heroSectionService.getActiveHeroSection();
      res.status(200).json({
        success: true,
        data: heroSection,
      });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const heroSection = await this.heroSectionService.getHeroSectionById(id);
      res.status(200).json({
        success: true,
        data: heroSection,
      });
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const heroSection = await this.heroSectionService.createHeroSection(req.body);
      res.status(201).json({
        success: true,
        data: heroSection,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const heroSection = await this.heroSectionService.updateHeroSection(id, req.body);
      res.status(200).json({
        success: true,
        data: heroSection,
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.heroSectionService.deleteHeroSection(id);
      res.status(200).json({
        success: true,
        message: 'Hero section deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  uploadMedia = async (req, res, next) => {
    try {
      const { heroSectionId } = req.params;
      const { type, order } = req.body;
      const file = req.file;

      if (!file) {
        return res.status(400).json({
          success: false,
          message: 'No file uploaded',
        });
      }

      const mediaData = {
        type: type || (file.mimetype.startsWith('video/') ? 'video' : 'image'),
        url: `/uploads/${file.filename}`,
        order: parseInt(order) || 0,
      };

      const media = await this.heroSectionService.addMedia(heroSectionId, mediaData);
      res.status(201).json({
        success: true,
        data: media,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteMedia = async (req, res, next) => {
    try {
      const { mediaId } = req.params;
      await this.heroSectionService.deleteMedia(mediaId);
      res.status(200).json({
        success: true,
        message: 'Media deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  addStat = async (req, res, next) => {
    try {
      const { heroSectionId } = req.params;
      const stat = await this.heroSectionService.addStat(heroSectionId, req.body);
      res.status(201).json({
        success: true,
        data: stat,
      });
    } catch (error) {
      next(error);
    }
  };

  updateStat = async (req, res, next) => {
    try {
      const { statId } = req.params;
      const stat = await this.heroSectionService.updateStat(statId, req.body);
      res.status(200).json({
        success: true,
        data: stat,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteStat = async (req, res, next) => {
    try {
      const { statId } = req.params;
      await this.heroSectionService.deleteStat(statId);
      res.status(200).json({
        success: true,
        message: 'Stat deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };
}

export default HeroSectionController;

