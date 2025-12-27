import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ProductService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async getAllProducts(filters = {}) {
    return await this.productRepository.getAll(filters);
  }

  async getActiveProducts(filters = {}) {
    return await this.productRepository.getActive(filters);
  }

  async getProductById(id) {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  // Helper method to find or create Color
  async findOrCreateColor(hexCode) {
    if (!hexCode || hexCode.trim() === '') return null;
    
    let normalizedHex = hexCode.trim();
    if (!normalizedHex.startsWith('#')) {
      normalizedHex = `#${normalizedHex}`;
    }
    normalizedHex = normalizedHex.toUpperCase();
    
    // Find existing color with this hex code
    let color = await prisma.color.findFirst({
      where: { 
        OR: [
          { hexCode: normalizedHex },
          { hexCode: normalizedHex.replace('#', '') },
          { hexCode: `#${normalizedHex.replace('#', '')}` },
        ]
      },
    });

    if (!color) {
      // Create new color
      color = await prisma.color.create({
        data: {
          nameEn: `Color ${normalizedHex}`,
          nameAr: `لون ${normalizedHex}`,
          hexCode: normalizedHex,
          order: 0,
          isActive: true,
        },
      });
    }

    return color.id;
  }

  // Country is now managed as a lookup table - no need to create
  // Just return the countryId if provided
  async validateCountry(countryId) {
    if (!countryId) return null;
    
    try {
      const country = await prisma.country.findUnique({
        where: { id: countryId },
      });
      return country ? country.id : null;
    } catch (error) {
      console.error('Error validating country:', error);
      return null;
    }
  }

  // Helper method to find or create Year
  async findOrCreateYear(year) {
    if (!year) return null;

    const yearNum = parseInt(year);
    if (isNaN(yearNum)) return null;

    // Find existing year
    let yearEntry = await prisma.year.findUnique({
      where: { year: yearNum },
    });

    if (!yearEntry) {
      // Create new year
      yearEntry = await prisma.year.create({
        data: {
          year: yearNum,
          order: 0,
          isActive: true,
        },
      });
    }

    return yearEntry.id;
  }

  async createProduct(data) {
    // Handle colorHex if colorId is not provided
    if ((!data.colorId || data.colorId === '') && data.colorHex && data.colorHex !== '#000000') {
      const colorIdFromHex = await this.findOrCreateColor(data.colorHex);
      if (colorIdFromHex) {
        data.colorId = colorIdFromHex;
      }
    }

    // Validate countryId if provided
    if (data.countryId) {
      data.countryId = await this.validateCountry(data.countryId);
    }

    // Handle year if yearId is not provided
    if ((!data.yearId || data.yearId === '') && data.year && data.year.toString().trim() !== '') {
      const yearIdFromYear = await this.findOrCreateYear(data.year);
      if (yearIdFromYear) {
        data.yearId = yearIdFromYear;
      }
    }

    // Clean up helper fields before creating
    delete data.colorHex;
    delete data.year;

    return await this.productRepository.create(data);
  }

  async updateProduct(id, data) {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }

    // Handle colorHex if colorId is not provided
    if ((!data.colorId || data.colorId === '') && data.colorHex && data.colorHex !== '#000000') {
      const colorIdFromHex = await this.findOrCreateColor(data.colorHex);
      if (colorIdFromHex) {
        data.colorId = colorIdFromHex;
      }
    }

    // Validate countryId if provided
    if (data.countryId) {
      data.countryId = await this.validateCountry(data.countryId);
    }

    // Handle year if yearId is not provided
    if ((!data.yearId || data.yearId === '') && data.year && data.year.toString().trim() !== '') {
      const yearIdFromYear = await this.findOrCreateYear(data.year);
      if (yearIdFromYear) {
        data.yearId = yearIdFromYear;
      }
    }

    // Clean up helper fields before updating
    delete data.colorHex;
    delete data.countryCode;
    delete data.year;

    return await this.productRepository.update(id, data);
  }

  async deleteProduct(id) {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return await this.productRepository.delete(id);
  }

  async getFilterOptions() {
    return await this.productRepository.getFilterOptions();
  }

  async getPageSettings() {
    return await this.productRepository.getPageSettings();
  }

  async updatePageSettings(data) {
    return await this.productRepository.updatePageSettings(data);
  }

  async getSimilarProducts(productId, limit = 4) {
    return await this.productRepository.getSimilarProducts(productId, limit);
  }
}

export default ProductService;
