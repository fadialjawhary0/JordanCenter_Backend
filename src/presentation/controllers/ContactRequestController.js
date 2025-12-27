export class ContactRequestController {
  constructor(contactRequestService) {
    this.contactRequestService = contactRequestService;
  }

  getAll = async (req, res, next) => {
    try {
      const contactRequests = await this.contactRequestService.getAllContactRequests();
      res.status(200).json({
        success: true,
        data: contactRequests,
      });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const contactRequest = await this.contactRequestService.getContactRequestById(id);
      res.status(200).json({
        success: true,
        data: contactRequest,
      });
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const contactRequest = await this.contactRequestService.createContactRequest({
        ...req.body,
        requestTypeId: req.body.requestTypeId || null,
        status: 'pending',
      });
      res.status(201).json({
        success: true,
        data: contactRequest,
        message: 'Your message has been sent successfully. We will get back to you soon.',
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const contactRequest = await this.contactRequestService.updateContactRequest(id, req.body);
      res.status(200).json({
        success: true,
        data: contactRequest,
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.contactRequestService.deleteContactRequest(id);
      res.status(200).json({
        success: true,
        message: 'Contact request deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };
}

export default ContactRequestController;
