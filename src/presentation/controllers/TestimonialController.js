export class TestimonialController {
  constructor(testimonialService) {
    this.testimonialService = testimonialService;
  }

  getAll = async (req, res, next) => {
    try {
      const testimonials = await this.testimonialService.getAllTestimonials();
      res.status(200).json({
        success: true,
        data: testimonials,
      });
    } catch (error) {
      next(error);
    }
  };

  getActive = async (req, res, next) => {
    try {
      const testimonial = await this.testimonialService.getActiveTestimonial();
      res.status(200).json({
        success: true,
        data: testimonial,
      });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const testimonial = await this.testimonialService.getTestimonialById(id);
      res.status(200).json({
        success: true,
        data: testimonial,
      });
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const file = req.file;
      const testimonialData = {
        textEn: req.body.textEn,
        textAr: req.body.textAr,
        imageUrl: file ? `/uploads/${file.filename}` : req.body.imageUrl,
        order: parseInt(req.body.order) || 0,
        isActive: req.body.isActive === 'true' || req.body.isActive === true,
        sectionTitleEn: req.body.sectionTitleEn || 'Customer trust comes first',
        sectionTitleAr: req.body.sectionTitleAr || 'ثقة العملاء أولاً',
        sectionSubtitleEn: req.body.sectionSubtitleEn || null,
        sectionSubtitleAr: req.body.sectionSubtitleAr || null,
      };
      
      const testimonial = await this.testimonialService.createTestimonial(testimonialData);
      res.status(201).json({
        success: true,
        data: testimonial,
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
      
      if (req.body.textEn !== undefined) updateData.textEn = req.body.textEn;
      if (req.body.textAr !== undefined) updateData.textAr = req.body.textAr;
      if (req.body.sectionTitleEn !== undefined) updateData.sectionTitleEn = req.body.sectionTitleEn;
      if (req.body.sectionTitleAr !== undefined) updateData.sectionTitleAr = req.body.sectionTitleAr;
      if (req.body.sectionSubtitleEn !== undefined) updateData.sectionSubtitleEn = req.body.sectionSubtitleEn || null;
      if (req.body.sectionSubtitleAr !== undefined) updateData.sectionSubtitleAr = req.body.sectionSubtitleAr || null;
      if (req.body.order !== undefined) updateData.order = parseInt(req.body.order);
      if (req.body.isActive !== undefined) {
        updateData.isActive = req.body.isActive === 'true' || req.body.isActive === true;
      }
      
      if (file) {
        updateData.imageUrl = `/uploads/${file.filename}`;
      }

      const testimonial = await this.testimonialService.updateTestimonial(id, updateData);
      res.status(200).json({
        success: true,
        data: testimonial,
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.testimonialService.deleteTestimonial(id);
      res.status(200).json({
        success: true,
        message: 'Testimonial deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  addProfile = async (req, res, next) => {
    try {
      const { testimonialId } = req.params;
      const profileImageFile = req.files?.profileImage?.[0] || req.file; // Support both single file and named field
      const testimonialImageFile = req.files?.testimonialImage?.[0];
      
      const profileData = {
        name: req.body.name,
        role: req.body.role,
        imageUrl: profileImageFile ? `/uploads/${profileImageFile.filename}` : req.body.imageUrl,
        testimonialTextEn: req.body.testimonialTextEn || null,
        testimonialTextAr: req.body.testimonialTextAr || null,
        testimonialImageUrl: testimonialImageFile ? `/uploads/${testimonialImageFile.filename}` : req.body.testimonialImageUrl || null,
        order: parseInt(req.body.order) || 0,
      };

      const profile = await this.testimonialService.addProfile(testimonialId, profileData);
      res.status(201).json({
        success: true,
        data: profile,
      });
    } catch (error) {
      next(error);
    }
  };

  updateProfile = async (req, res, next) => {
    try {
      const { profileId } = req.params;
      const profileImageFile = req.files?.profileImage?.[0] || req.file;
      const testimonialImageFile = req.files?.testimonialImage?.[0];
      const updateData = {};
      
      if (req.body.name !== undefined) updateData.name = req.body.name;
      if (req.body.role !== undefined) updateData.role = req.body.role;
      if (req.body.testimonialTextEn !== undefined) updateData.testimonialTextEn = req.body.testimonialTextEn || null;
      if (req.body.testimonialTextAr !== undefined) updateData.testimonialTextAr = req.body.testimonialTextAr || null;
      if (req.body.order !== undefined) updateData.order = parseInt(req.body.order);
      
      if (profileImageFile) {
        updateData.imageUrl = `/uploads/${profileImageFile.filename}`;
      }
      
      if (testimonialImageFile) {
        updateData.testimonialImageUrl = `/uploads/${testimonialImageFile.filename}`;
      } else if (req.body.testimonialImageUrl !== undefined) {
        updateData.testimonialImageUrl = req.body.testimonialImageUrl || null;
      }

      const profile = await this.testimonialService.updateProfile(profileId, updateData);
      res.status(200).json({
        success: true,
        data: profile,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteProfile = async (req, res, next) => {
    try {
      const { profileId } = req.params;
      await this.testimonialService.deleteProfile(profileId);
      res.status(200).json({
        success: true,
        message: 'Profile deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };
}

export default TestimonialController;
