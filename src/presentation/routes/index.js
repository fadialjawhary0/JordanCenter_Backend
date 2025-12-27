import express from 'express';
import userRoutes from './user.routes.js';
import heroSectionRoutes from './heroSection.routes.js';
import solutionRoutes from './solution.routes.js';
import categoryRoutes from './category.routes.js';
import brandsSectionRoutes from './brandsSection.routes.js';
import projectRoutes from './project.routes.js';
import testimonialRoutes from './testimonial.routes.js';
import startProjectSectionRoutes from './startProjectSection.routes.js';
import articleRoutes from './article.routes.js';
import contactPageRoutes from './contactPage.routes.js';
import termsAndConditionsPageRoutes from './termsAndConditionsPage.routes.js';
import faqPageRoutes from './faqPage.routes.js';
import requestTypeRoutes from './requestType.routes.js';
import contactRequestRoutes from './contactRequest.routes.js';
import productRoutes from './product.routes.js';
import brandRoutes from './brand.routes.js';
import productTypeRoutes from './productType.routes.js';
import servicesPageRoutes from './servicesPage.routes.js';
import serviceRoutes from './service.routes.js';
import projectsPageRoutes from './projectsPage.routes.js';

const router = express.Router();

// Mount route modules here
router.use('/users', userRoutes);
router.use('/hero-section', heroSectionRoutes);
router.use('/solutions', solutionRoutes);
router.use('/categories', categoryRoutes);
router.use('/brands-section', brandsSectionRoutes);
router.use('/brands', brandRoutes);
router.use('/product-types', productTypeRoutes);
router.use('/projects-section', projectRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/start-project-section', startProjectSectionRoutes);
router.use('/articles', articleRoutes);
router.use('/products', productRoutes);
router.use('/services-page', servicesPageRoutes);
router.use('/services', serviceRoutes);
router.use('/projects-page', projectsPageRoutes);
router.use('/contact-page', contactPageRoutes);
router.use('/terms-and-conditions-page', termsAndConditionsPageRoutes);
router.use('/faq-page', faqPageRoutes);
router.use('/request-types', requestTypeRoutes);
router.use('/contact-requests', contactRequestRoutes);

// Example route
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    version: '1.0.0',
  });
});

export default router;

