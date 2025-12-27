export class RequestTypeController {
  constructor(requestTypeService) {
    this.requestTypeService = requestTypeService;
  }

  getAll = async (req, res, next) => {
    try {
      const requestTypes = await this.requestTypeService.getAllRequestTypes();
      res.status(200).json({
        success: true,
        data: requestTypes,
      });
    } catch (error) {
      next(error);
    }
  };

  getActive = async (req, res, next) => {
    try {
      const requestTypes = await this.requestTypeService.getActiveRequestTypes();
      res.status(200).json({
        success: true,
        data: requestTypes,
      });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const requestType = await this.requestTypeService.getRequestTypeById(id);
      res.status(200).json({
        success: true,
        data: requestType,
      });
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const requestType = await this.requestTypeService.createRequestType({
        ...req.body,
        order: parseInt(req.body.order) || 0,
        isActive: req.body.isActive === 'true' || req.body.isActive === true,
      });
      res.status(201).json({
        success: true,
        data: requestType,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateData = {
        ...req.body,
        order: req.body.order ? parseInt(req.body.order) : undefined,
        isActive: req.body.isActive !== undefined 
          ? (req.body.isActive === 'true' || req.body.isActive === true)
          : undefined,
      };
      const requestType = await this.requestTypeService.updateRequestType(id, updateData);
      res.status(200).json({
        success: true,
        data: requestType,
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.requestTypeService.deleteRequestType(id);
      res.status(200).json({
        success: true,
        message: 'Request type deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };
}

export default RequestTypeController;
