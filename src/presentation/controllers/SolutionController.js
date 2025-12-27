export class SolutionController {
  constructor(solutionService) {
    this.solutionService = solutionService;
  }

  getAll = async (req, res, next) => {
    try {
      const solutions = await this.solutionService.getAllSolutions();
      res.status(200).json({
        success: true,
        data: solutions,
      });
    } catch (error) {
      next(error);
    }
  };

  getActive = async (req, res, next) => {
    try {
      const solutions = await this.solutionService.getActiveSolutions();
      res.status(200).json({
        success: true,
        data: solutions,
      });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const solution = await this.solutionService.getSolutionById(id);
      res.status(200).json({
        success: true,
        data: solution,
      });
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const file = req.file;
      let tags = null;
      
      // Parse tags if provided
      if (req.body.tags) {
        try {
          tags = typeof req.body.tags === 'string' ? JSON.parse(req.body.tags) : req.body.tags;
        } catch (e) {
          // If parsing fails, set to null
          tags = null;
        }
      }
      
      const solutionData = {
        titleEn: req.body.titleEn,
        titleAr: req.body.titleAr,
        descriptionEn: req.body.descriptionEn || null,
        descriptionAr: req.body.descriptionAr || null,
        imageUrl: file ? `/uploads/${file.filename}` : req.body.imageUrl,
        height: req.body.height || 'h-[632px]',
        tags: tags,
        extraCount: req.body.extraCount ? parseInt(req.body.extraCount) : null,
        order: parseInt(req.body.order) || 0,
        isActive: req.body.isActive === 'true' || req.body.isActive === true,
      };
      
      const solution = await this.solutionService.createSolution(solutionData);
      res.status(201).json({
        success: true,
        data: solution,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const file = req.file;
      
      let tags = undefined;
      if (req.body.tags !== undefined) {
        if (req.body.tags === '' || req.body.tags === null) {
          tags = null;
        } else {
          try {
            tags = typeof req.body.tags === 'string' ? JSON.parse(req.body.tags) : req.body.tags;
          } catch (e) {
            tags = null;
          }
        }
      }
      
      const updateData = {};
      if (req.body.titleEn !== undefined) updateData.titleEn = req.body.titleEn;
      if (req.body.titleAr !== undefined) updateData.titleAr = req.body.titleAr;
      if (req.body.descriptionEn !== undefined) updateData.descriptionEn = req.body.descriptionEn || null;
      if (req.body.descriptionAr !== undefined) updateData.descriptionAr = req.body.descriptionAr || null;
      if (req.body.height !== undefined) updateData.height = req.body.height;
      if (tags !== undefined) updateData.tags = tags;
      if (req.body.extraCount !== undefined) updateData.extraCount = req.body.extraCount ? parseInt(req.body.extraCount) : null;
      if (req.body.order !== undefined) updateData.order = parseInt(req.body.order);
      if (req.body.isActive !== undefined) updateData.isActive = req.body.isActive === 'true' || req.body.isActive === true;
      
      if (file) {
        updateData.imageUrl = `/uploads/${file.filename}`;
      }
      
      const solution = await this.solutionService.updateSolution(id, updateData);
      res.status(200).json({
        success: true,
        data: solution,
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.solutionService.deleteSolution(id);
      res.status(200).json({
        success: true,
        message: 'Solution deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  getSectionSettings = async (req, res, next) => {
    try {
      const settings = await this.solutionService.getSectionSettings();
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
      const settings = await this.solutionService.updateSectionSettings(req.body);
      res.status(200).json({
        success: true,
        data: settings,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default SolutionController;


