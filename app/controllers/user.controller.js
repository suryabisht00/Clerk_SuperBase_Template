import { UserService } from '../services/user.service.js';

export class UserController {
  /**
   * Get all users
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch users', 
        error: error.message 
      });
    }
  }

  /**
   * Get user by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await UserService.getUserById(id);
      
      if (!user) {
        return res.status(404).json({ 
          success: false, 
          message: 'User not found' 
        });
      }
      
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch user', 
        error: error.message 
      });
    }
  }

  /**
   * Get user by clerk ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async getUserByClerkId(req, res) {
    try {
      const { clerkId } = req.params;
      const user = await UserService.getUserByClerkId(clerkId);
      
      if (!user) {
        return res.status(404).json({ 
          success: false, 
          message: 'User not found' 
        });
      }
      
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch user', 
        error: error.message 
      });
    }
  }

  /**
   * Create a new user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async createUser(req, res) {
    try {
      const userData = req.body;
      const newUser = await UserService.createUser(userData);
      
      res.status(201).json({ 
        success: true, 
        message: 'User created successfully', 
        data: newUser 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: 'Failed to create user', 
        error: error.message 
      });
    }
  }

  /**
   * Update an existing user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const userData = req.body;
      
      const updatedUser = await UserService.updateUser(id, userData);
      
      res.status(200).json({ 
        success: true, 
        message: 'User updated successfully', 
        data: updatedUser 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: 'Failed to update user', 
        error: error.message 
      });
    }
  }

  /**
   * Delete a user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      
      const deletedUser = await UserService.deleteUser(id);
      
      res.status(200).json({ 
        success: true, 
        message: 'User deleted successfully', 
        data: deletedUser 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: 'Failed to delete user', 
        error: error.message 
      });
    }
  }
}
