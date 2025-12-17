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

router.post("/", async (req, res) => {
  try {
    const data = req.body; // Lấy dữ liệu gửi lên từ Frontend/Postman

    // 1. Kiểm tra xem Mã NV đã tồn tại chưa (Tránh lỗi trùng lặp)
    const existingNV = await NhanVien.findOne({ maNV: data.maNV });
    if (existingNV) {
      return res
        .status(400)
        .json({ message: "❌ Lỗi: Mã nhân viên này đã tồn tại!" });
    }

    // 2. Tạo đối tượng nhân viên mới
    const newNV = new NhanVien(data);

    // 3. Lưu vào Database
    await newNV.save();

    // 4. Trả về thông báo thành công (201 = Created)
    res.status(201).json({
      message: "✅ Thêm nhân viên thành công!",
      nhanVien: newNV,
    });
  } catch (err) {
    // Bắt lỗi (ví dụ: thiếu dữ liệu, sai kiểu dữ liệu...)
    res.status(500).json({ message: "❌ Lỗi Server: " + err.message });
  }
});
export default router;
