import { BaseEntity } from './BaseEntity.js';

/**
 * User Domain Entity
 * Contains business logic and validation rules
 */
export class User extends BaseEntity {
  constructor(data = {}) {
    super(data);
    this.email = data.email;
    this.name = data.name;
  }

  validate() {
    const errors = [];

    if (!this.email) {
      errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      errors.push('Email format is invalid');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Business logic: Check if user can perform an action
   */
  canPerformAction(action) {
    // Add business logic here
    return true;
  }
}

