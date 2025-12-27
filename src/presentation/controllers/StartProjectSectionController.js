export class StartProjectSectionController {
  constructor(startProjectSectionService) {
    this.startProjectSectionService = startProjectSectionService;
  }

  getActive = async (req, res, next) => {
    try {
      const section = await this.startProjectSectionService.getActive();
      res.status(200).json({
        success: true,
        data: section,
      });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const section = await this.startProjectSectionService.getById(id);
      res.status(200).json({
        success: true,
        data: section,
      });
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const file = req.file;
      const sectionData = {
        titleEn: req.body.titleEn,
        titleAr: req.body.titleAr,
        descriptionEn: req.body.descriptionEn,
        descriptionAr: req.body.descriptionAr,
        backgroundImageUrl: file ? `/uploads/${file.filename}` : req.body.backgroundImageUrl,
        button1TextEn: req.body.button1TextEn,
        button1TextAr: req.body.button1TextAr,
        button1Link: req.body.button1Link || null,
        button2TextEn: req.body.button2TextEn,
        button2TextAr: req.body.button2TextAr,
        button2Link: req.body.button2Link || null,
        isActive: req.body.isActive === 'true' || req.body.isActive === true,
      };

      const section = await this.startProjectSectionService.create(sectionData);
      res.status(201).json({
        success: true,
        data: section,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const file = req.file;

      const updateData = {};
      if (req.body.titleEn !== undefined) updateData.titleEn = req.body.titleEn;
      if (req.body.titleAr !== undefined) updateData.titleAr = req.body.titleAr;
      if (req.body.descriptionEn !== undefined) updateData.descriptionEn = req.body.descriptionEn;
      if (req.body.descriptionAr !== undefined) updateData.descriptionAr = req.body.descriptionAr;
      if (req.body.button1TextEn !== undefined) updateData.button1TextEn = req.body.button1TextEn;
      if (req.body.button1TextAr !== undefined) updateData.button1TextAr = req.body.button1TextAr;
      if (req.body.button1Link !== undefined) updateData.button1Link = req.body.button1Link || null;
      if (req.body.button2TextEn !== undefined) updateData.button2TextEn = req.body.button2TextEn;
      if (req.body.button2TextAr !== undefined) updateData.button2TextAr = req.body.button2TextAr;
      if (req.body.button2Link !== undefined) updateData.button2Link = req.body.button2Link || null;
      if (req.body.isActive !== undefined) updateData.isActive = req.body.isActive === 'true' || req.body.isActive === true;

      if (file) {
        updateData.backgroundImageUrl = `/uploads/${file.filename}`;
      } else if (req.body.backgroundImageUrl !== undefined) {
        updateData.backgroundImageUrl = req.body.backgroundImageUrl;
      }

      const section = await this.startProjectSectionService.update(id, updateData);
      res.status(200).json({
        success: true,
        data: section,
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.startProjectSectionService.delete(id);
      res.status(200).json({
        success: true,
        message: 'Start Project Section deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };
}

export default StartProjectSectionController;
