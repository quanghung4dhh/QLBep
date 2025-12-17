import express from "express";
import { MonAn } from "../models/models.js";

const router = express.Router();

// 1. Lấy thực đơn (Danh sách món ăn)
// GET: /api/mon-an
router.get("/", async (req, res) => {
  try {
    const menu = await MonAn.find();
    res.json(menu);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. Tìm món ăn theo tên (Tìm gần đúng)
// GET: /api/mon-an/tim-kiem?ten=Phở
router.get("/tim-kiem", async (req, res) => {
  try {
    const keyword = req.query.ten;
    // Dùng Regex để tìm gần đúng (LIKE %keyword% trong SQL)
    const ketQua = await MonAn.find({ 
      tenMon: { $regex: keyword, $options: "i" } // 'i' là không phân biệt hoa thường
    });
    res.json(ketQua);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3. Xem chi tiết món (kèm công thức và định lượng)
// GET: /api/mon-an/MA01
router.get("/:maMon", async (req, res) => {
  try {
    const mon = await MonAn.findOne({ maMon: req.params.maMon });
    if (!mon) return res.status(404).json({ message: "Món ăn không tồn tại" });
    res.json(mon);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;