import express from "express";
import { NguyenLieu } from "../models/models.js";

const router = express.Router();

// =========================================================
// 1. Lấy danh sách nguyên liệu (Hỗ trợ tìm kiếm)
// GET: /api/nguyen-lieu
// GET: /api/nguyen-lieu?q=thịt  (Tìm kiếm chữ "thịt")
// =========================================================
router.get("/", async (req, res) => {
  try {
    const { q } = req.query; // Lấy từ khóa tìm kiếm từ URL
    let condition = {}; // Mặc định là lấy hết (điều kiện rỗng)

    // Nếu có từ khóa 'q' thì thêm điều kiện tìm kiếm
    if (q) {
      condition.$or = [
        { tenNL: { $regex: new RegExp(q, "i") } }, // Tìm trong Tên (không phân biệt hoa thường)
        { maNL: { $regex: new RegExp(q, "i") } }   // Tìm trong Mã
      ];
    }

    // Truy vấn với điều kiện (Nếu không có q thì condition rỗng => lấy hết)
    const listNL = await NguyenLieu.find(condition).sort({ tenNL: 1 });
    
    res.json(listNL);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// =========================================================
// 2. API Cảnh báo kho: Tìm nguyên liệu sắp hết (tồn kho < 20)
// GET: /api/nguyen-lieu/sap-het
// =========================================================
router.get("/sap-het", async (req, res) => {
  try {
    // Logic: Lấy những món có số lượng tồn < 20
    const listSapHet = await NguyenLieu.find({ soLuongTon: { $lt: 20 } });
    res.json(listSapHet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// =========================================================
// 3. Nhập kho (Tạo mới hoặc Cộng dồn)
// POST: /api/nguyen-lieu
// =========================================================
router.post("/", async (req, res) => {
  try {
    const { maNL, tenNL, donViTinh, soLuongNhap, donGia } = req.body;

    // 1. Validation cơ bản
    if (!maNL || !soLuongNhap) {
      return res.status(400).json({ 
        message: "Vui lòng nhập ít nhất: Mã NL và Số lượng nhập" 
      });
    }

    const slCanNhap = Number(soLuongNhap);
    if (slCanNhap <= 0) {
      return res.status(400).json({ message: "Số lượng nhập phải lớn hơn 0" });
    }

    // 2. Kiểm tra xem Mã Nguyên Liệu này đã có trong kho chưa?
    let item = await NguyenLieu.findOne({ maNL: maNL });

    if (item) {
      // === TRƯỜNG HỢP 1: ĐÃ CÓ -> CỘNG DỒN SỐ LƯỢNG ===
      item.soLuongTon = (item.soLuongTon || 0) + slCanNhap;
      
      if (donGia) item.donGia = donGia;
      if (tenNL) item.tenNL = tenNL;

      await item.save();

      res.json({
        message: `✅ Đã nhập thêm ${slCanNhap} ${item.donViTinh || ''} cho mã ${maNL}`,
        khoHienTai: item
      });

    } else {
      // === TRƯỜNG HỢP 2: CHƯA CÓ -> TẠO MỚI ===
      if (!tenNL || !donViTinh) {
        return res.status(400).json({ 
          message: "Mã này chưa tồn tại. Vui lòng nhập thêm Tên NL và Đơn vị tính để tạo mới!" 
        });
      }

      const newItem = new NguyenLieu({
        maNL,
        tenNL,
        donViTinh,
        soLuongTon: slCanNhap,
        donGia: donGia || 0
      });

      await newItem.save();

      res.status(201).json({
        message: "✅ Đã tạo mới nguyên liệu thành công!",
        data: newItem
      });
    }

  } catch (err) {
    res.status(500).json({ message: "❌ Lỗi Server: " + err.message });
  }
});

export default router;