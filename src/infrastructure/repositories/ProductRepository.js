import { PrismaClient } from '@prisma/client';
import { IProductRepository } from '../../domain/repositories/IProductRepository.js';

const prisma = new PrismaClient();

export class ProductRepository extends IProductRepository {
  async getAll(filters = {}) {
    const {
      page = 1,
      limit = 12,
      search = '',
      minPrice,
      maxPrice,
      productTypeIds = [],
      brandLogoIds = [],
      colorIds = [],
      countryIds = [],
      yearIds = [],
      sortBy = 'order',
      sortOrder = 'asc',
    } = filters;

    const skip = (page - 1) * limit;
    
    // Build where clause
    const where = {
      isActive: true,
      ...(search && {
        OR: [
          { titleEn: { contains: search, mode: 'insensitive' } },
          { titleAr: { contains: search, mode: 'insensitive' } },
          { descriptionEn: { contains: search, mode: 'insensitive' } },
          { descriptionAr: { contains: search, mode: 'insensitive' } },
        ],
      }),
      ...(minPrice !== undefined || maxPrice !== undefined) && {
        price: {
          ...(minPrice !== undefined && { gte: parseFloat(minPrice) }),
          ...(maxPrice !== undefined && { lte: parseFloat(maxPrice) }),
        },
      },
      ...(productTypeIds.length > 0 && { productTypeId: { in: productTypeIds } }),
      ...(brandLogoIds.length > 0 && { brandLogoId: { in: brandLogoIds } }),
      ...(colorIds.length > 0 && { colorId: { in: colorIds } }),
      ...(countryIds.length > 0 && { countryId: { in: countryIds } }),
      ...(yearIds.length > 0 && { yearId: { in: yearIds } }),
    };

    // Build orderBy - Prisma requires array for multiple fields
    let orderBy;
    if (sortBy === 'price') {
      orderBy = { price: sortOrder };
    } else if (sortBy === 'name') {
      orderBy = { titleEn: sortOrder };
    } else {
      // Default: order by 'order' field first, then by createdAt descending
      orderBy = [
        { order: sortOrder },
        { createdAt: 'desc' }
      ];
    }

    const [data, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy,
        include: {
          productType: true,
          brandLogo: true,
          color: true,
          country: true,
          year: true,
          technicalSpecs: {
            orderBy: { order: 'asc' },
          },
        },
      }),
      prisma.product.count({ where }),
    ]);

    return {
      data,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getActive(filters = {}) {
    return this.getAll(filters);
  }

  async findById(id) {
    return await prisma.product.findUnique({
      where: { id },
      include: {
        productType: true,
        brandLogo: true,
        color: true,
        country: true,
        year: true,
        technicalSpecs: {
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  async create(data) {
    const { technicalSpecs = [], ...productData } = data;
    
    return await prisma.product.create({
      data: {
        titleEn: productData.titleEn,
        titleAr: productData.titleAr,
        descriptionEn: productData.descriptionEn || null,
        descriptionAr: productData.descriptionAr || null,
        imageUrl: productData.imageUrl,
        imageUrls: productData.imageUrls || [],
        price: parseFloat(productData.price),
        oldPrice: productData.oldPrice ? parseFloat(productData.oldPrice) : null,
        availability: productData.availability || null,
        warranty: productData.warranty || null,
        detailedDescriptionEn: productData.detailedDescriptionEn || null,
        detailedDescriptionAr: productData.detailedDescriptionAr || null,
        mediaUrl: productData.mediaUrl || null,
        mediaType: productData.mediaType || null,
        similarProductIds: productData.similarProductIds || [],
        productTypeId: productData.productTypeId || null,
        brandLogoId: productData.brandLogoId || null,
        colorId: productData.colorId || null,
        countryId: productData.countryId || null,
        yearId: productData.yearId || null,
        order: parseInt(productData.order) || 0,
        isActive: productData.isActive !== undefined ? productData.isActive : true,
        technicalSpecs: {
          create: technicalSpecs.map((spec, index) => ({
            titleEn: spec.titleEn,
            titleAr: spec.titleAr,
            valueEn: spec.valueEn,
            valueAr: spec.valueAr,
            order: index,
          })),
        },
      },
      include: {
        productType: true,
        brandLogo: true,
        color: true,
        country: true,
        year: true,
        technicalSpecs: {
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  async update(id, data) {
    const { technicalSpecs, ...productUpdateData } = data;
    const updateData = {};
    
    if (productUpdateData.titleEn !== undefined) updateData.titleEn = productUpdateData.titleEn;
    if (productUpdateData.titleAr !== undefined) updateData.titleAr = productUpdateData.titleAr;
    if (productUpdateData.descriptionEn !== undefined) updateData.descriptionEn = productUpdateData.descriptionEn || null;
    if (productUpdateData.descriptionAr !== undefined) updateData.descriptionAr = productUpdateData.descriptionAr || null;
    if (productUpdateData.imageUrl !== undefined) updateData.imageUrl = productUpdateData.imageUrl;
    if (productUpdateData.imageUrls !== undefined) updateData.imageUrls = productUpdateData.imageUrls;
    if (productUpdateData.price !== undefined) updateData.price = parseFloat(productUpdateData.price);
    if (productUpdateData.oldPrice !== undefined) updateData.oldPrice = productUpdateData.oldPrice ? parseFloat(productUpdateData.oldPrice) : null;
    if (productUpdateData.availability !== undefined) updateData.availability = productUpdateData.availability;
    if (productUpdateData.warranty !== undefined) updateData.warranty = productUpdateData.warranty || null;
    if (productUpdateData.detailedDescriptionEn !== undefined) updateData.detailedDescriptionEn = productUpdateData.detailedDescriptionEn || null;
    if (productUpdateData.detailedDescriptionAr !== undefined) updateData.detailedDescriptionAr = productUpdateData.detailedDescriptionAr || null;
    if (productUpdateData.mediaUrl !== undefined) updateData.mediaUrl = productUpdateData.mediaUrl || null;
    if (productUpdateData.mediaType !== undefined) updateData.mediaType = productUpdateData.mediaType || null;
    if (productUpdateData.similarProductIds !== undefined) updateData.similarProductIds = productUpdateData.similarProductIds || [];
    if (productUpdateData.productTypeId !== undefined) updateData.productTypeId = productUpdateData.productTypeId || null;
    if (productUpdateData.brandLogoId !== undefined) updateData.brandLogoId = productUpdateData.brandLogoId || null;
    if (productUpdateData.colorId !== undefined) updateData.colorId = productUpdateData.colorId || null;
    if (productUpdateData.countryId !== undefined) updateData.countryId = productUpdateData.countryId || null;
    if (productUpdateData.yearId !== undefined) updateData.yearId = productUpdateData.yearId || null;
    if (productUpdateData.order !== undefined) updateData.order = parseInt(productUpdateData.order);
    if (productUpdateData.isActive !== undefined) updateData.isActive = productUpdateData.isActive;

    // Handle technical specs update
    if (technicalSpecs !== undefined) {
      // Delete existing specs and create new ones
      await prisma.productTechnicalSpec.deleteMany({
        where: { productId: id },
      });
      
      updateData.technicalSpecs = {
        create: technicalSpecs.map((spec, index) => ({
          titleEn: spec.titleEn,
          titleAr: spec.titleAr,
          valueEn: spec.valueEn,
          valueAr: spec.valueAr,
          order: index,
        })),
      };
    }

    return await prisma.product.update({
      where: { id },
      data: updateData,
      include: {
        productType: true,
        brandLogo: true,
        color: true,
        country: true,
        year: true,
        technicalSpecs: {
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  async delete(id) {
    return await prisma.product.delete({
      where: { id },
    });
  }

  async getFilterOptions() {
    const [productTypes, brands, colors, countries, years] = await Promise.all([
      prisma.productType.findMany({
        where: { isActive: true },
        orderBy: { order: 'asc' },
      }),
      prisma.brandLogo.findMany({
        where: { isActive: true },
        orderBy: { order: 'asc' },
      }),
      prisma.color.findMany({
        where: { isActive: true },
        orderBy: { order: 'asc' },
      }),
      prisma.country.findMany({
        where: { isActive: true },
        orderBy: { order: 'asc' },
      }),
      prisma.year.findMany({
        where: { isActive: true },
        orderBy: { year: 'desc' },
      }),
    ]);

    // Get product counts for each filter option
    const [productTypeCounts, brandCounts, colorCounts, countryCounts, yearCounts] = await Promise.all([
      prisma.product.groupBy({
        by: ['productTypeId'],
        where: { isActive: true, productTypeId: { not: null } },
        _count: true,
      }),
      prisma.product.groupBy({
        by: ['brandLogoId'],
        where: { isActive: true, brandLogoId: { not: null } },
        _count: true,
      }),
      prisma.product.groupBy({
        by: ['colorId'],
        where: { isActive: true, colorId: { not: null } },
        _count: true,
      }),
      prisma.product.groupBy({
        by: ['countryId'],
        where: { isActive: true, countryId: { not: null } },
        _count: true,
      }),
      prisma.product.groupBy({
        by: ['yearId'],
        where: { isActive: true, yearId: { not: null } },
        _count: true,
      }),
    ]);

    // Create count maps
    const productTypeCountMap = Object.fromEntries(productTypeCounts.map(c => [c.productTypeId, c._count]));
    const brandCountMap = Object.fromEntries(brandCounts.map(c => [c.brandLogoId, c._count]));
    const colorCountMap = Object.fromEntries(colorCounts.map(c => [c.colorId, c._count]));
    const countryCountMap = Object.fromEntries(countryCounts.map(c => [c.countryId, c._count]));
    const yearCountMap = Object.fromEntries(yearCounts.map(c => [c.yearId, c._count]));

    // Add counts to filter options
    const productTypesWithCount = productTypes.map(pt => ({ ...pt, productCount: productTypeCountMap[pt.id] || 0 }));
    const brandsWithCount = brands.map(b => ({ ...b, productCount: brandCountMap[b.id] || 0 }));
    const colorsWithCount = colors.map(c => ({ ...c, productCount: colorCountMap[c.id] || 0 }));
    const countriesWithCount = countries.map(c => ({ ...c, productCount: countryCountMap[c.id] || 0 }));
    const yearsWithCount = years.map(y => ({ ...y, productCount: yearCountMap[y.id] || 0 }));

    // Get price range
    const priceRange = await prisma.product.aggregate({
      where: { isActive: true },
      _min: { price: true },
      _max: { price: true },
    });

    return {
      productTypes: productTypesWithCount,
      brands: brandsWithCount,
      colors: colorsWithCount,
      countries: countriesWithCount,
      years: yearsWithCount,
      priceRange: {
        min: priceRange._min.price || 0,
        max: priceRange._max.price || 0,
      },
    };
  }

  async getPageSettings() {
    let settings = await prisma.productsPageSettings.findFirst({
      where: { isActive: true },
    });

    if (!settings) {
      // Create default settings if none exist
      settings = await prisma.productsPageSettings.create({
        data: {
          heroTitleEn: 'Products',
          heroTitleAr: 'المنتجات',
          heroImageUrl: '',
          isActive: true,
        },
      });
    }

    return settings;
  }

  async updatePageSettings(data) {
    let settings = await prisma.productsPageSettings.findFirst({
      where: { isActive: true },
    });

    const updateData = {};
    if (data.heroTitleEn !== undefined) updateData.heroTitleEn = data.heroTitleEn;
    if (data.heroTitleAr !== undefined) updateData.heroTitleAr = data.heroTitleAr;
    if (data.heroImageUrl !== undefined) updateData.heroImageUrl = data.heroImageUrl || null;

    if (settings) {
      return await prisma.productsPageSettings.update({
        where: { id: settings.id },
        data: updateData,
      });
    } else {
      return await prisma.productsPageSettings.create({
        data: {
          heroTitleEn: data.heroTitleEn || 'Products',
          heroTitleAr: data.heroTitleAr || 'المنتجات',
          heroImageUrl: data.heroImageUrl || '',
          isActive: true,
        },
      });
    }
  }

  async getSimilarProducts(productId, limit = 4) {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { similarProductIds: true },
    });

    if (!product || !product.similarProductIds || product.similarProductIds.length === 0) {
      return [];
    }

    return await prisma.product.findMany({
      where: {
        id: { in: product.similarProductIds },
        isActive: true,
      },
      take: limit,
      include: {
        productType: true,
        brandLogo: true,
        color: true,
        country: true,
        year: true,
      },
    });
  }
}

export default ProductRepository;
