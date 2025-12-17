import express from "express";
import { HoaDon } from "../models/models.js";

const router = express.Router();

// 1. Lấy danh sách hóa đơn (Mới nhất lên đầu)
// GET: /api/hoa-don
router.get("/", async (req, res) => {
  try {
    const listHD = await HoaDon.find().sort({ ngayLap: -1 });
    res.json(listHD);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. Xem chi tiết một hóa đơn (Kèm các món đã gọi)
// Tương đương SQL: SELECT ... FROM ChiTietHoaDon WHERE maHD = 'HD001'
// GET: /api/hoa-don/HD001
router.get("/chi-tiet/:maHD", async (req, res) => {
  try {
    const hd = await HoaDon.findOne({ maHD: req.params.maHD });
    if (!hd) return res.status(404).json({ message: "Hóa đơn không tồn tại" });
    res.json(hd);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3. 🔥 THỐNG KÊ: Doanh thu theo tháng (Ví dụ tháng 12/2025)
// Tương đương SQL: SELECT SUM(tongTien) ... WHERE MONTH=12 AND YEAR=2025
// GET: /api/hoa-don/thong-ke/doanh-thu?thang=12&nam=2025
router.get("/thong-ke/doanh-thu", async (req, res) => {
  try {
    const { thang, nam } = req.query;
    
    // Tạo ngày bắt đầu và kết thúc tháng
    const startDate = new Date(`${nam}-${thang}-01`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);

    const stats = await HoaDon.aggregate([
      {
        $match: {
          ngayLap: { $gte: startDate, $lt: endDate }
        }
      },
      {
        $group: {
          _id: null,
          TongDoanhThu: { $sum: "$tongTien" },
          SoLuongHoaDon: { $sum: 1 }
        }
      }
    ]);

    res.json(stats[0] || { TongDoanhThu: 0, SoLuongHoaDon: 0 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 4. 🔥 THỐNG KÊ: Hiệu suất nhân viên (Ai bán được bao nhiêu tiền)
// Tương đương SQL: SELECT nv.hoTen, SUM(hd.tongTien) ... GROUP BY nv.hoTen
// GET: /api/hoa-don/thong-ke/nhan-vien
router.get("/thong-ke/nhan-vien", async (req, res) => {
  try {
    const stats = await HoaDon.aggregate([
      {
        $group: {
          _id: "$maNVPhucVu", // Group theo mã NV
          SoDonDaBan: { $sum: 1 },
          TongTienMangVe: { $sum: "$tongTien" }
        }
      },
      // Lookup sang bảng NhanVien để lấy tên (tương đương JOIN)
      {
        $lookup: {
          from: "nhanviens", // Tên collection trong MongoDB (thường là số nhiều, chữ thường)
          localField: "_id",
          foreignField: "maNV",
          as: "thongTinNV"
        }
      },
      {
        $project: {
          maNV: "$_id",
          SoDonDaBan: 1,
          TongTienMangVe: 1,
          HoTen: { $arrayElemAt: ["$thongTinNV.hoTen", 0] } // Lấy tên từ mảng kết quả lookup
        }
      },
      { $sort: { TongTienMangVe: -1 } } // Sắp xếp giảm dần tiền
    ]);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;