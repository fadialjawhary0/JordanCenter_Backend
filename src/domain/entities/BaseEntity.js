/**
 * Base Entity class
 * All domain entities should extend this class
 */
export class BaseEntity {
  constructor(data = {}) {
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  /**
   * Convert entity to plain object
   */
  toJSON() {
    return { ...this };
  }

  /**
   * Validate entity data
   * Override in child classes
   */
  validate() {
    return { isValid: true, errors: [] };
  }
}

