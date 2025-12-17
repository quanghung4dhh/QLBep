import express from "express";
import { CaLamViec, PhanCongCa } from "../models/models.js";

const router = express.Router();

// 1. Lấy danh sách các Ca Làm Việc (Sáng, Chiều, Tối...)
// GET: /api/ca-lam-viec
router.get("/", async (req, res) => {
  try {
    const listCa = await CaLamViec.find();
    res.json(listCa);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. Lấy danh sách Phân Công Ca (Lịch biểu chung của cửa hàng)
// GET: /api/ca-lam-viec/phan-cong
router.get("/phan-cong", async (req, res) => {
  try {
    // Tìm kiếm và sắp xếp theo ngày mới nhất
    const listPhanCong = await PhanCongCa.find().sort({ ngay: -1 });
    res.json(listPhanCong);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3. (Mở rộng) Xem phân công ca trong một ngày cụ thể
// GET: /api/ca-lam-viec/phan-cong/tim-kiem?ngay=2024-12-03
router.get("/phan-cong/tim-kiem", async (req, res) => {
  try {
    const { ngay } = req.query;
    if (!ngay) return res.status(400).json({ message: "Vui lòng nhập ngày (YYYY-MM-DD)" });

    const start = new Date(ngay);
    const end = new Date(ngay);
    end.setDate(end.getDate() + 1); // Cộng thêm 1 ngày để lấy trọn vẹn 24h

    const result = await PhanCongCa.find({
      ngay: { $gte: start, $lt: end }
    });
    
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;