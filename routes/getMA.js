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

router.post("/", async (req, res) => {
  try {
    const { maMon, tenMon, giaBan, trangThai } = req.body;

    // 1. VALIDATION: Kiểm tra dữ liệu đầu vào
    if (!maMon || !tenMon || giaBan === undefined) {
      return res.status(400).json({ 
        message: "Vui lòng nhập đủ: Mã món, Tên món và Giá bán" 
      });
    }

    if (giaBan < 0) {
      return res.status(400).json({ message: "Giá bán không được âm!" });
    }

    // 2. Kiểm tra trùng mã món
    const existingMon = await MonAn.findOne({ maMon });
    if (existingMon) {
      return res.status(400).json({ 
        message: `Mã món '${maMon}' đã tồn tại! Vui lòng chọn mã khác.` 
      });
    }

    // 3. Xử lý trạng thái (Nếu không gửi lên thì mặc định là 'Còn bán')
    // Nếu người dùng gửi text lạ, ta có thể ép về mặc định hoặc báo lỗi. 
    // Ở đây mình gán mặc định nếu thiếu.
    const status = trangThai || "Còn bán";

    // 4. Tạo và Lưu
    const newMonAn = new MonAn({
      maMon,
      tenMon,
      giaBan,
      trangThai: status
    });

    await newMonAn.save();

    res.status(201).json({
      message: "✅ Thêm món ăn thành công!",
      data: newMonAn
    });

  } catch (err) {
    res.status(500).json({ message: "❌ Lỗi Server: " + err.message });
  }
});

export default router;