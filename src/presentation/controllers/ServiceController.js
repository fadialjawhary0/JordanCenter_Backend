export class ServiceController {
  constructor(serviceService) {
    this.serviceService = serviceService;
  }

  getAll = async (req, res, next) => {
    try {
      const services = await this.serviceService.getAllServices();
      res.status(200).json({
        success: true,
        data: services,
      });
    } catch (error) {
      next(error);
    }
  };

  getActive = async (req, res, next) => {
    try {
      const services = await this.serviceService.getActiveServices();
      res.status(200).json({
        success: true,
        data: services,
      });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const service = await this.serviceService.getServiceById(id);
      res.status(200).json({
        success: true,
        data: service,
      });
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const file = req.file;
      const serviceData = {
        type: req.body.type || 'card',
        count: req.body.count,
        titleEn: req.body.titleEn,
        titleAr: req.body.titleAr,
        descriptionEn: req.body.descriptionEn || null,
        descriptionAr: req.body.descriptionAr || null,
        imageUrl: file ? `/uploads/${file.filename}` : req.body.imageUrl || '',
        order: parseInt(req.body.order) || 0,
        isActive: req.body.isActive === 'true' || req.body.isActive === true,
        tags: req.body.tags ? JSON.parse(req.body.tags) : [],
      };

      const service = await this.serviceService.createService(serviceData);
      res.status(201).json({
        success: true,
        data: service,
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

      if (req.body.type !== undefined) updateData.type = req.body.type;
      if (req.body.count !== undefined) updateData.count = req.body.count;
      if (req.body.titleEn !== undefined) updateData.titleEn = req.body.titleEn;
      if (req.body.titleAr !== undefined) updateData.titleAr = req.body.titleAr;
      if (req.body.descriptionEn !== undefined) updateData.descriptionEn = req.body.descriptionEn || null;
      if (req.body.descriptionAr !== undefined) updateData.descriptionAr = req.body.descriptionAr || null;
      if (req.body.order !== undefined) updateData.order = parseInt(req.body.order);
      if (req.body.isActive !== undefined) updateData.isActive = req.body.isActive === 'true' || req.body.isActive === true;

      // Handle image update
      if (file) {
        updateData.imageUrl = `/uploads/${file.filename}`;
      } else if (req.body.imageUrl !== undefined) {
        updateData.imageUrl = req.body.imageUrl || null;
      }

      // Handle tags update
      if (req.body.tags !== undefined) {
        updateData.tags = req.body.tags ? JSON.parse(req.body.tags) : [];
      }

      const service = await this.serviceService.updateService(id, updateData);
      res.status(200).json({
        success: true,
        data: service,
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.serviceService.deleteService(id);
      res.status(200).json({
        success: true,
        message: 'Service deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };
}

export default ServiceController;

