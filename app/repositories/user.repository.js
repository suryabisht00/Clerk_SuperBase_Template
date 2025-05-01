import { prisma } from '../lib/prisma';

export class UserRepository {
  /**
   * Find all users
   * @returns {Promise<Array>} List of users
   */
  static async findAll() {
    return prisma.user.findMany();
  }

  /**
   * Find user by ID
   * @param {string|number} id - User ID
   * @returns {Promise<Object|null>} Found user or null
   */
  static async findById(id) {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  /**
   * Find user by clerk ID
   * @param {string} clerkId - Clerk ID
   * @returns {Promise<Object|null>} Found user or null
   */
  static async findByClerkId(clerkId) {
    return prisma.user.findUnique({
      where: { clerkId },
    });
  }

  /**
   * Create a new user
   * @param {Object} userData - User data
   * @returns {Promise<Object>} Created user
   */
  static async create(userData) {
    return prisma.user.create({
      data: userData,
    });
  }

  /**
   * Update an existing user
   * @param {string|number} id - User ID
   * @param {Object} userData - Updated user data
   * @returns {Promise<Object>} Updated user
   */
  static async update(id, userData) {
    return prisma.user.update({
      where: { id },
      data: userData,
    });
  }

  /**
   * Delete a user
   * @param {string|number} id - User ID
   * @returns {Promise<Object>} Deleted user
   */
  static async delete(id) {
    return prisma.user.delete({
      where: { id },
    });
  }
}
