import { UserRepository } from '../repositories/userrepository';
import { UserMapper } from '../mappers/usermapper';

export class UserService {
  /**
   * Get all users
   * @returns {Promise<Array>} List of user DTOs
   */
  static async getAllUsers() {
    const users = await UserRepository.findAll();
    return UserMapper.toDTOs(users);
  }

  /**
   * Get user by ID
   * @param {string|number} id - User ID
   * @returns {Promise<Object|null>} User DTO or null
   */
  static async getUserById(id) {
    const user = await UserRepository.findById(id);
    return user ? UserMapper.toDTO(user) : null;
  }

  /**
   * Get user by clerk ID
   * @param {string} clerkId - Clerk ID
   * @returns {Promise<Object|null>} User DTO or null
   */
  static async getUserByClerkId(clerkId) {
    const user = await UserRepository.findByClerkId(clerkId);
    return user ? UserMapper.toDTO(user) : null;
  }

  /**
   * Create a new user
   * @param {Object} userData - User data
   * @returns {Promise<Object>} Created user DTO
   */
  static async createUser(userData) {
    const userEntity = UserMapper.toEntity(userData);
    const createdUser = await UserRepository.create(userEntity);
    return UserMapper.toDTO(createdUser);
  }

  /**
   * Update an existing user
   * @param {string|number} id - User ID
   * @param {Object} userData - Updated user data
   * @returns {Promise<Object>} Updated user DTO
   */
  static async updateUser(id, userData) {
    const userEntity = UserMapper.toEntity(userData);
    const updatedUser = await UserRepository.update(id, userEntity);
    return UserMapper.toDTO(updatedUser);
  }

  /**
   * Delete a user
   * @param {string|number} id - User ID
   * @returns {Promise<Object>} Deleted user DTO
   */
  static async deleteUser(id) {
    const deletedUser = await UserRepository.delete(id);
    return UserMapper.toDTO(deletedUser);
  }
}
