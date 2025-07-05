import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hash, role });
    res.status(201).json({
      status: true,
      message: "Register Success",
      data: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(400).json({ message: "UserName Sudah Terdaftar" });
    }
    console.error("Register error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findByUserName(username);
    if (!user)
      return res.status(401).json({ message: "UserName atau Password salah" });

    if (!user.password) {
      console.error(
        `User ${user.username} tidak memiliki password di database`
      );
      return res.status(500).json({ message: "Internal server error" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: "Password Salah" });

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      status: true,
      message: "Login Success",
      data: {
        id: user.id,
        username: user.username,
        role: user.role,
        access_token: token,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const user = await User.findAll();
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error getting users: ", error);
    res.status(500).json({ message: "Gagal Mengambil Users" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, role } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.update(id, {
      username,
      password: hash,
      role,
    });

    if (!user) {
      return res.status(404).json({ message: "User Tidak di temukan" });
    }
    res.status(200).json({
      message: "User berhasil di perbarui",
      data: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error updating user: ", error);
    res.status(500).json({ message: "Gagal Update user" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteuser = await User.delete(id);

    if (!deleteuser) {
      return res.status(404).json({ message: "User Tidak di temukan" });
    }
    res.status(200).json({ message: "User Berhasil di Hapus" });
  } catch (error) {
    console.error("Error deleting user: ", error);
    res.status(500).json({ message: "User Gagal di Hapus" });
  }
};
