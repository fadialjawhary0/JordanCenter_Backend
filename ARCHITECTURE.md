# Clean Architecture Guide

This document explains the clean architecture pattern used in this backend and how to add new features.

## Architecture Layers

### 1. Domain Layer (`src/domain/`)
**Purpose**: Contains pure business logic with no dependencies on external frameworks.

- **Entities** (`entities/`): Domain models with business rules and validation
- **Repositories** (`repositories/`): Interfaces defining data access contracts

**Rules**:
- No dependencies on Express, Prisma, or any framework
- Contains only business logic
- Entities are plain JavaScript classes

### 2. Application Layer (`src/application/`)
**Purpose**: Orchestrates domain entities and repositories to implement use cases.

- **Services** (`services/`): Application services that coordinate domain logic

**Rules**:
- Depends only on domain layer
- Contains application-specific logic (not business logic)
- Coordinates between repositories and entities

### 3. Infrastructure Layer (`src/infrastructure/`)
**Purpose**: Implements external concerns like database access, external APIs, etc.

- **Repositories** (`repositories/`): Concrete implementations of repository interfaces

**Rules**:
- Implements interfaces from domain layer
- Handles all database operations
- Can depend on Prisma, external APIs, etc.

### 4. Presentation Layer (`src/presentation/`)
**Purpose**: Handles HTTP requests and responses.

- **Controllers** (`controllers/`): Handle HTTP requests, call services
- **Routes** (`routes/`): Define API endpoints
- **Validators** (`validators/`): Validate incoming request data

**Rules**:
- Depends on application layer
- Handles HTTP-specific concerns (status codes, JSON responses)
- Uses middleware for cross-cutting concerns

## Adding a New Entity

Follow these steps to add a new entity (e.g., `Product`):

### Step 1: Define Prisma Schema
Edit `prisma/schema.prisma`:

```prisma
model Product {
  id          String   @id @default(uuid())
  name        String
  description String?
  price       Decimal  @db.Decimal(10, 2)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("products")
}
```

Then run: `npm run prisma:migrate`

### Step 2: Create Domain Entity
Create `src/domain/entities/Product.js`:

```javascript
import { BaseEntity } from './BaseEntity.js';

export class Product extends BaseEntity {
  constructor(data = {}) {
    super(data);
    this.name = data.name;
    this.description = data.description;
    this.price = data.price;
  }

  validate() {
    const errors = [];
    
    if (!this.name || this.name.trim().length === 0) {
      errors.push('Product name is required');
    }
    
    if (this.price < 0) {
      errors.push('Price cannot be negative');
    }
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
```

### Step 3: Create Repository Interface
Create `src/domain/repositories/IProductRepository.js`:

```javascript
export class IProductRepository {
  async findById(id) {
    throw new Error('Method findById must be implemented');
  }

  async findAll(filters = {}) {
    throw new Error('Method findAll must be implemented');
  }

  async create(productData) {
    throw new Error('Method create must be implemented');
  }

  async update(id, productData) {
    throw new Error('Method update must be implemented');
  }

  async delete(id) {
    throw new Error('Method delete must be implemented');
  }
}
```

### Step 4: Implement Repository
Create `src/infrastructure/repositories/ProductRepository.js`:

```javascript
import prisma from '../../config/database.js';
import { Product } from '../../domain/entities/Product.js';
import { IProductRepository } from '../../domain/repositories/IProductRepository.js';

export class ProductRepository extends IProductRepository {
  async findById(id) {
    const productData = await prisma.product.findUnique({
      where: { id },
    });
    return productData ? new Product(productData) : null;
  }

  async findAll(filters = {}) {
    const { page = 1, limit = 10, ...where } = filters;
    
    const [data, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.product.count({ where }),
    ]);

    return {
      data: data.map((productData) => new Product(productData)),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async create(productData) {
    const product = new Product(productData);
    const validation = product.validate();

    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const createdProduct = await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
      },
    });

    return new Product(createdProduct);
  }

  async update(id, productData) {
    const existingProduct = await this.findById(id);
    if (!existingProduct) {
      throw new Error('Product not found');
    }

    const updatedProduct = new Product({ ...existingProduct, ...productData });
    const validation = updatedProduct.validate();

    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const updated = await prisma.product.update({
      where: { id },
      data: {
        name: updatedProduct.name,
        description: updatedProduct.description,
        price: updatedProduct.price,
      },
    });

    return new Product(updated);
  }

  async delete(id) {
    const existingProduct = await this.findById(id);
    if (!existingProduct) {
      throw new Error('Product not found');
    }

    await prisma.product.delete({
      where: { id },
    });

    return true;
  }
}
```

### Step 5: Create Service
Create `src/application/services/ProductService.js`:

```javascript
import { ProductRepository } from '../../infrastructure/repositories/ProductRepository.js';

export class ProductService {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getProductById(id) {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  async getAllProducts(filters = {}) {
    return await this.productRepository.findAll(filters);
  }

  async createProduct(productData) {
    return await this.productRepository.create(productData);
  }

  async updateProduct(id, productData) {
    return await this.productRepository.update(id, productData);
  }

  async deleteProduct(id) {
    return await this.productRepository.delete(id);
  }
}
```

### Step 6: Create Controller
Create `src/presentation/controllers/ProductController.js`:

```javascript
import { ProductService } from '../../application/services/ProductService.js';

export class ProductController {
  constructor() {
    this.productService = new ProductService();
  }

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await this.productService.getProductById(id);
      res.json({
        success: true,
        data: product.toJSON(),
      });
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req, res, next) => {
    try {
      const filters = {
        page: parseInt(req.query.page, 10) || 1,
        limit: parseInt(req.query.limit, 10) || 10,
      };
      const result = await this.productService.getAllProducts(filters);
      res.json({
        success: true,
        data: result.data.map((product) => product.toJSON()),
        pagination: result.pagination,
      });
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const productData = req.body;
      const product = await this.productService.createProduct(productData);
      res.status(201).json({
        success: true,
        data: product.toJSON(),
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const productData = req.body;
      const product = await this.productService.updateProduct(id, productData);
      res.json({
        success: true,
        data: product.toJSON(),
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.productService.deleteProduct(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
```

### Step 7: Create Validator
Create `src/presentation/validators/product.validator.js`:

```javascript
import { body, validationResult } from 'express-validator';

export const validateProduct = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage('Product name is required and must be between 1 and 255 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description must be less than 1000 characters'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Validation failed',
          errors: errors.array(),
        },
      });
    }
    next();
  },
];
```

### Step 8: Create Routes
Create `src/presentation/routes/product.routes.js`:

```javascript
import express from 'express';
import { ProductController } from '../controllers/ProductController.js';
import { validateProduct } from '../validators/product.validator.js';

const router = express.Router();
const productController = new ProductController();

router.get('/', productController.getAll);
router.get('/:id', productController.getById);
router.post('/', validateProduct, productController.create);
router.put('/:id', validateProduct, productController.update);
router.delete('/:id', productController.delete);

export default router;
```

### Step 9: Register Routes
Update `src/presentation/routes/index.js`:

```javascript
import productRoutes from './product.routes.js';

// ... existing code ...

router.use('/products', productRoutes);
```

## Dependency Flow

```
Presentation → Application → Domain
     ↓              ↓
Infrastructure → Domain
```

**Key Rule**: Dependencies always point inward. Outer layers depend on inner layers, never the reverse.

## Benefits of This Architecture

1. **Testability**: Each layer can be tested independently
2. **Maintainability**: Clear separation of concerns
3. **Flexibility**: Easy to swap implementations (e.g., change database)
4. **Scalability**: Easy to add new features following the same pattern
5. **Independence**: Business logic is independent of frameworks

## Best Practices

1. **Keep domain layer pure**: No framework dependencies
2. **Use dependency injection**: Services receive repositories via constructor
3. **Validate at multiple layers**: Domain entities validate business rules, validators check input format
4. **Handle errors properly**: Use error middleware for consistent error responses
5. **Follow naming conventions**: Use clear, descriptive names

