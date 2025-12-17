import express from "express";
import { NhaCungCap } from "../models/models.js";

const router = express.Router();

// 1. Lấy danh sách tất cả nhà cung cấp
// GET: /api/nha-cung-cap
router.get("/", async (req, res) => {
  try {
    const listNCC = await NhaCungCap.find();
    res.json(listNCC);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. Lấy chi tiết nhà cung cấp theo mã
// GET: /api/nha-cung-cap/NCC01
router.get("/:maNCC", async (req, res) => {
  try {
    const ncc = await NhaCungCap.findOne({ maNCC: req.params.maNCC });
    if (!ncc) return res.status(404).json({ message: "Không tìm thấy NCC" });
    res.json(ncc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;