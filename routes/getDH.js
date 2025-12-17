import express from "express";
import { DonHang } from "../models/models.js";

const router = express.Router();

// 1. Lấy danh sách đơn nhập hàng
// GET: /api/don-hang
router.get("/", async (req, res) => {
  try {
    const listDH = await DonHang.find().sort({ ngayDat: -1 });
    res.json(listDH);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. Chi tiết đơn hàng (Xem đã nhập những nguyên liệu gì)
// GET: /api/don-hang/DH001
router.get("/:maDH", async (req, res) => {
  try {
    const dh = await DonHang.findOne({ maDH: req.params.maDH });
    if (!dh) return res.status(404).json({ message: "Đơn hàng không tồn tại" });
    res.json(dh);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3. 🔥 THỐNG KÊ: Chi phí nhập hàng theo Nhà Cung Cấp
// Tương đương SQL: SELECT ncc.tenNCC, SUM(...) GROUP BY ncc.tenNCC
// GET: /api/don-hang/thong-ke/chi-phi-nhap
router.get("/thong-ke/chi-phi-nhap", async (req, res) => {
  try {
    const stats = await DonHang.aggregate([
      {
        $group: {
          _id: "$maNCC",
          SoDonHang: { $sum: 1 },
          TongChiPhi: { $sum: "$tongTien" } // Nếu tongTien null thì cần tính từ items (phức tạp hơn xíu)
        }
      },
      {
        $lookup: {
          from: "nhacungcaps",
          localField: "_id",
          foreignField: "maNCC",
          as: "infoNCC"
        }
      },
      {
        $project: {
          TenNCC: { $arrayElemAt: ["$infoNCC.tenNCC", 0] },
          SoDonHang: 1,
          TongChiPhi: 1
        }
      }
    ]);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;