import express from "express";
import { LichLamViec, BangChamCong } from "../models/models.js";

const router = express.Router();

// =========================================================
// PHẦN 1: LỊCH LÀM VIỆC (Dự kiến)
// =========================================================

// 1. Lấy toàn bộ lịch làm việc (Kèm thông tin Nhân viên và Tên ca)
// GET: /api/lich-lam-viec
router.get("/", async (req, res) => {
  try {
    const listLich = await LichLamViec.aggregate([
      // Join với bảng NhanVien để lấy tên
      {
        $lookup: {
          from: "nhanviens", // Tên collection trong MongoDB
          localField: "maNV",
          foreignField: "maNV",
          as: "infoNV"
        }
      },
      // Join với bảng CaLamViec để lấy tên ca
      {
        $lookup: {
          from: "calamviecs",
          localField: "maCa",
          foreignField: "maCa",
          as: "infoCa"
        }
      },
      // Làm gọn kết quả trả về
      {
        $project: {
          maLich: 1,
          maNV: 1,
          TenNhanVien: { $arrayElemAt: ["$infoNV.hoTen", 0] },
          maCa: 1,
          TenCa: { $arrayElemAt: ["$infoCa.tenCa", 0] },
          GioBatDau: { $arrayElemAt: ["$infoCa.gioBD", 0] },
          ngayLam: 1
        }
      },
      { $sort: { ngayLam: -1 } } // Ngày mới nhất lên đầu
    ]);
    
    res.json(listLich);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. Xem lịch làm việc của riêng 1 nhân viên
// GET: /api/lich-lam-viec/nhan-vien/NV001
router.get("/nhan-vien/:maNV", async (req, res) => {
  try {
    const list = await LichLamViec.find({ maNV: req.params.maNV }).sort({ ngayLam: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// =========================================================
// PHẦN 2: BẢNG CHẤM CÔNG (Thực tế)
// =========================================================

// 3. Lấy bảng chấm công (Ai đi muộn, về sớm, đúng giờ)
// GET: /api/lich-lam-viec/cham-cong
router.get("/cham-cong", async (req, res) => {
  try {
    const listCC = await BangChamCong.aggregate([
      {
        $lookup: {
          from: "nhanviens",
          localField: "maNV",
          foreignField: "maNV",
          as: "infoNV"
        }
      },
      {
        $project: {
          id: 1,
          maNV: 1,
          TenNhanVien: { $arrayElemAt: ["$infoNV.hoTen", 0] },
          ngayCham: 1,
          gioVaoThucTe: 1,
          gioRaThucTe: 1,
          trangThai: 1
        }
      },
      { $sort: { ngayCham: -1 } }
    ]);

    res.json(listCC);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 4. Thống kê trạng thái đi làm (Bao nhiêu lần Đúng giờ, Đi muộn...)
// GET: /api/lich-lam-viec/cham-cong/thong-ke
router.get("/cham-cong/thong-ke", async (req, res) => {
  try {
    const stats = await BangChamCong.aggregate([
      {
        $group: {
          _id: "$trangThai", // Group theo 'Đúng giờ', 'Đi muộn'...
          SoLuong: { $sum: 1 }
        }
      }
    ]);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;