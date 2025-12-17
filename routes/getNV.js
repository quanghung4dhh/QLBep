import express from "express";
import { NhanVien } from "../models/models.js"; // Import Model từ file models ở thư mục cha

const router = express.Router();

// 1. Lấy danh sách toàn bộ nhân viên
// GET: /api/nhan-vien
router.get("/", async (req, res) => {
  try {
    const listNV = await NhanVien.find();
    res.json(listNV);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. Lấy chi tiết 1 nhân viên theo mã (VD: NV001)
// GET: /api/nhan-vien/NV001
router.get("/:maNV", async (req, res) => {
  try {
    const nv = await NhanVien.findOne({ maNV: req.params.maNV });
    if (!nv) {
      return res.status(404).json({ message: "Không tìm thấy nhân viên" });
    }
    res.json(nv);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;