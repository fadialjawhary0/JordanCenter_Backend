export class ProjectController {
  constructor(projectService) {
    this.projectService = projectService;
  }

  getActiveSection = async (req, res, next) => {
    try {
      const section = await this.projectService.getActiveProjectsSection();
      res.status(200).json({
        success: true,
        data: section,
      });
    } catch (error) {
      next(error);
    }
  };

  getAllProjects = async (req, res, next) => {
    try {
      const projects = await this.projectService.getAllProjects();
      res.status(200).json({
        success: true,
        data: projects,
      });
    } catch (error) {
      next(error);
    }
  };

  getActiveProjects = async (req, res, next) => {
    try {
      const projects = await this.projectService.getActiveProjects();
      res.status(200).json({
        success: true,
        data: projects,
      });
    } catch (error) {
      next(error);
    }
  };

  getProjectById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const project = await this.projectService.getProjectById(id);
      res.status(200).json({
        success: true,
        data: project,
      });
    } catch (error) {
      next(error);
    }
  };

  createProject = async (req, res, next) => {
    try {
      const file = req.file;
      const projectData = {
        ...req.body,
        imageUrl: file ? `/uploads/${file.filename}` : req.body.imageUrl,
        productsCount: parseInt(req.body.productsCount) || 0,
        order: parseInt(req.body.order) || 0,
        isActive: req.body.isActive === 'true' || req.body.isActive === true,
        projectsSectionId: req.body.projectsSectionId || null,
      };
      const project = await this.projectService.createProject(projectData);
      res.status(201).json({
        success: true,
        data: project,
      });
    } catch (error) {
      next(error);
    }
  };

  updateProject = async (req, res, next) => {
    try {
      const { id } = req.params;
      const file = req.file;
      const updateData = {
        ...req.body,
        productsCount: req.body.productsCount ? parseInt(req.body.productsCount) : undefined,
        order: req.body.order ? parseInt(req.body.order) : undefined,
        isActive: req.body.isActive !== undefined 
          ? (req.body.isActive === 'true' || req.body.isActive === true)
          : undefined,
      };
      
      if (file) {
        updateData.imageUrl = `/uploads/${file.filename}`;
      }

      const project = await this.projectService.updateProject(id, updateData);
      res.status(200).json({
        success: true,
        data: project,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteProject = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.projectService.deleteProject(id);
      res.status(200).json({
        success: true,
        message: 'Project deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  uploadProjectLogo = async (req, res, next) => {
    try {
      const { projectId } = req.params;
      const { order } = req.body;
      const file = req.file;

      if (!file) {
        return res.status(400).json({
          success: false,
          message: 'No file uploaded',
        });
      }

      const logoData = {
        imageUrl: `/uploads/${file.filename}`,
        order: parseInt(order) || 0,
      };

      const logo = await this.projectService.addProjectLogo(projectId, logoData);
      res.status(201).json({
        success: true,
        data: logo,
      });
    } catch (error) {
      next(error);
    }
  };

  updateProjectLogo = async (req, res, next) => {
    try {
      const { logoId } = req.params;
      const logo = await this.projectService.updateProjectLogo(logoId, req.body);
      res.status(200).json({
        success: true,
        data: logo,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteProjectLogo = async (req, res, next) => {
    try {
      const { logoId } = req.params;
      await this.projectService.deleteProjectLogo(logoId);
      res.status(200).json({
        success: true,
        message: 'Project logo deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  // Section Settings Methods
  createSectionSettings = async (req, res, next) => {
    try {
      const section = await this.projectService.createSectionSettings(req.body);
      res.status(201).json({
        success: true,
        data: section,
      });
    } catch (error) {
      next(error);
    }
  };

  updateSectionSettings = async (req, res, next) => {
    try {
      const { id } = req.params;
      const section = await this.projectService.updateSectionSettings(id, req.body);
      res.status(200).json({
        success: true,
        data: section,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default ProjectController;

