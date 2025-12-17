import express from "express";
import { NguyenLieu } from "../models/models.js";

const router = express.Router();

// 1. Lấy danh sách toàn bộ nguyên liệu
// GET: /api/nguyen-lieu
router.get("/", async (req, res) => {
  try {
    const listNL = await NguyenLieu.find();
    res.json(listNL);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. API Cảnh báo kho: Tìm nguyên liệu sắp hết (tồn kho < 20)
// GET: /api/nguyen-lieu/sap-het
router.get("/sap-het", async (req, res) => {
  try {
    // Logic giống câu SQL: SELECT ... WHERE soLuongTon < 20
    const listSapHet = await NguyenLieu.find({ soLuongTon: { $lt: 20 } });
    res.json(listSapHet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;