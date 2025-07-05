import prisma from "../database/dbConfig.js";

class Link {
  static async create(linkData) {
    return prisma.link.create({
      data: linkData,
    });
  }
  static async findAll() {
    return prisma.link.findMany({
      select: { id: true, link: true },
      orderBy: [{ created_at: "asc" }],
    });
  }
  static async update(id, linkData) {
    try {
      //parseInt digunakan karena id yang dari url bertipe string
      return await prisma.link.update({
        where: { id: parseInt(id) },
        data: { link: linkData },
      });
    } catch (error) {
      if (error.code === "P2025") {
        return null;
      }
      throw error;
    }
  }
  static async delete(id) {
    try {
      //harus menyertakan await agar error bisa di tangkap
      return await prisma.link.delete({
        where: { id: parseInt(id) },
      });
    } catch (error) {
      if (error.code === "P2025") {
        return null;
      }
      throw error;
    }
  }
}

export default Link;
