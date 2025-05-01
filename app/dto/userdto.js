export class UserDTO {
  constructor(data) {
    this.id = data.id;
    this.clerkId = data.clerkId;
    this.email = data.email;
    this.username = data.username;
    this.name = data.name;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
