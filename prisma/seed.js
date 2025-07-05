import prisma from "../src/database/dbConfig.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  try {
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    await prisma.user.create({
      data: {
        username: "Admin",
        password: hashedPassword,
        role: "admin",
      },
    });
    console.log("Berhasil membuat user admin");
  } catch (error) {
    console.error("Gagal membuat user admin : ", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
