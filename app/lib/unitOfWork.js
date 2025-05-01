import { db } from "./prisma";
import { UserRepository } from "../repositories/user.repository";

export class UnitOfWork {
  constructor() {
    this.prisma = db;
    this.userRepository = new UserRepository(this.prisma);
  }

  async complete() {
    // This would be used if we needed to commit a transaction
    // For read operations, we don't need to do anything special
  }
}
