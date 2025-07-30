import Link from "../models/linkModel.js";

export const createLink = async (req, res) => {
  try {
    const { link } = req.body;

    const newlink = await Link.create({
      link,
    });
    res.status(201).json({ message: "Link Berhasil di Input", Link: newlink });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(400).json({ message: "Link Sudah Ada" });
    }
    console.error("Error while inserting link: ", error);
    res.status(500).json({ message: "Gagal Input Link" });
  }
};

export const getAllLink = async (_req, res) => {
  try {
    const link = await Link.findAll();
    return res.status(200).json(link);
  } catch (error) {
    console.error("Error getting links: ", error);
    res.status(500).json({ message: "Gagal Mengambil Links" });
  }
};

export const updateLink = async (req, res) => {
  try {
    const { id } = req.params;
    const { link } = req.body;

    const updatelink = await Link.update(id, link);

    if (!updatelink) {
      return res.status(404).json({ message: "Link Tidak di temukan" });
    }
    res.status(200).json({
      message: "Link berhasil di perbarui",
      link: updatelink,
    });
  } catch (error) {
    console.error("Error updating link: ", error);
    res.status(500).json({ message: "Gagal Update Link" });
  }
};

export const deleteLink = async (req, res) => {
  try {
    const { id } = req.params;
    const deletelink = await Link.delete(id);

    if (!deletelink) {
      return res.status(404).json({ message: "Link Tidak di temukan" });
    }
    res.status(200).json({ message: "Link Berhasil di Hapus" });
  } catch (error) {
    console.error("Error deleting link: ", error);
    res.status(500).json({ message: "Link Gagal di Hapus" });
  }
};
