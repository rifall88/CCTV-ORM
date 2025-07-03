import prisma from "../database/dbConfig.js";

class User {
  static async create(userData) {
    return prisma.user.create({
      data: userData,
    });
  }
  static async findByUserName(username) {
    return prisma.user.findUnique({
      where: { username },
    });
  }
}

export default User;
