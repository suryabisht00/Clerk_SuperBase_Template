import { UserDTO } from '../dto/user.dto';

export class UserMapper {
  /**
   * Maps a user entity to a UserDTO
   * @param {Object} userEntity - User entity from the database
   * @returns {UserDTO} - Mapped user DTO
   */
  static toDTO(userEntity) {
    return new UserDTO(userEntity);
  }

  /**
   * Maps multiple user entities to UserDTOs
   * @param {Array} userEntities - Array of user entities
   * @returns {Array<UserDTO>} - Array of mapped user DTOs
   */
  static toDTOs(userEntities) {
    return userEntities.map(entity => this.toDTO(entity));
  }

  /**
   * Maps a UserDTO to entity format (for create/update operations)
   * @param {UserDTO} userDTO - The user DTO
   * @returns {Object} - User in entity format
   */
  static toEntity(userDTO) {
    return {
      clerkId: userDTO.clerkId,
      email: userDTO.email,
      username: userDTO.username,
      name: userDTO.name
    };
  }
}
