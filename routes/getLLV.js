import express from "express";
import { LichLamViec, BangChamCong, CaLamViec, NhanVien } from "../models/models.js";

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
          as: "infoNV",
        },
      },
      // Join với bảng CaLamViec để lấy tên ca
      {
        $lookup: {
          from: "calamviecs",
          localField: "maCa",
          foreignField: "maCa",
          as: "infoCa",
        },
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
          ngayLam: 1,
        },
      },
      { $sort: { ngayLam: -1 } }, // Ngày mới nhất lên đầu
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
    const list = await LichLamViec.find({ maNV: req.params.maNV }).sort({
      ngayLam: -1,
    });
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
          as: "infoNV",
        },
      },
      {
        $project: {
          id: 1,
          maNV: 1,
          TenNhanVien: { $arrayElemAt: ["$infoNV.hoTen", 0] },
          ngayCham: 1,
          gioVaoThucTe: 1,
          gioRaThucTe: 1,
          trangThai: 1,
        },
      },
      { $sort: { ngayCham: -1 } },
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
          SoLuong: { $sum: 1 },
        },
      },
    ]);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    // Input nhận vào: Mã nhân viên, Mã ca, Ngày làm
    // (Lưu ý: Nên dùng Mã (ID) thay vì Tên để tránh trùng lặp tên)
    const { maNV, maCa, ngayLam } = req.body;

    // 1. VALIDATION: Kiểm tra dữ liệu đầu vào
    if (!maNV || !maCa || !ngayLam) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập đủ: maNV, maCa, ngayLam" });
    }

    // 2. Kiểm tra xem Nhân viên và Ca có tồn tại không?
    const nvExists = await NhanVien.findOne({ maNV });
    const caExists = await CaLamViec.findOne({ maCa });

    if (!nvExists)
      return res.status(404).json({ message: "Mã nhân viên không tồn tại!" });
    if (!caExists)
      return res.status(404).json({ message: "Mã ca làm việc không tồn tại!" });

    // 3. Kiểm tra trùng lặp (Nhân viên này đã được xếp ca này vào ngày này chưa?)
    const existingLich = await LichLamViec.findOne({ maNV, maCa, ngayLam });
    if (existingLich) {
      return res
        .status(400)
        .json({ message: "Nhân viên này đã có lịch làm việc này rồi!" });
    }

    // 4. Tự động tạo maLich (Vì trong Schema bạn để maLich là Number)
    // Logic: Tìm mã lớn nhất hiện tại + 1. Nếu chưa có thì bắt đầu từ 1.
    const lastLich = await LichLamViec.findOne().sort({ maLich: -1 });
    const newMaLich = lastLich && lastLich.maLich ? lastLich.maLich + 1 : 1;

    // 5. Tạo và Lưu
    const newLich = new LichLamViec({
      maLich: newMaLich,
      maNV,
      maCa,
      ngayLam: new Date(ngayLam), // Chuyển chuỗi ngày thành đối tượng Date
    });

    await newLich.save();

    res.status(201).json({
      message: "✅ Phân công ca thành công!",
      chiTiet: newLich,
    });
  } catch (err) {
    res.status(500).json({ message: "❌ Lỗi Server: " + err.message });
  }
});

router.post("/cham-cong", async (req, res) => {
  try {
    const { tenNV, trangThai, lyDo, ngayCham } = req.body;

    // 1. Validation cơ bản
    if (!tenNV || !trangThai) {
      return res.status(400).json({ message: "Vui lòng nhập Tên nhân viên và Trạng thái!" });
    }

    // 2. Tìm Mã nhân viên từ Tên nhân viên
    // (Lưu ý: Nếu có 2 người trùng tên, lệnh này sẽ lấy người đầu tiên tìm thấy. 
    // Trong thực tế nên dùng Mã NV để chính xác hơn).
    const nv = await NhanVien.findOne({ 
        hoTen: { $regex: new RegExp(`^${tenNV}$`, "i") } // Tìm chính xác tên, không phân biệt hoa thường
    });

    if (!nv) {
      return res.status(404).json({ message: `❌ Không tìm thấy nhân viên tên là: ${tenNV}` });
    }

    // 3. Tự động tạo ID cho bảng chấm công (Vì id là Number)
    const lastCC = await BangChamCong.findOne().sort({ id: -1 });
    const newId = lastCC && lastCC.id ? lastCC.id + 1 : 1;

    // 4. Xử lý thời gian (Nếu không gửi ngày thì lấy ngày hiện tại)
    const thoiGianCham = ngayCham ? new Date(ngayCham) : new Date();

    // 5. Tạo dữ liệu chấm công
    const newChamCong = new BangChamCong({
      id: newId,
      maNV: nv.maNV, // Lưu mã vừa tìm được
      ngayCham: thoiGianCham,
      trangThai: trangThai,
      lyDo: lyDo || "", // Nếu không có lý do thì để rỗng
      // Nếu trạng thái là "Đi làm" hoặc "Đi muộn" thì set giờ vào là lúc này
      gioVaoThucTe: ["Đi làm", "Đi muộn"].includes(trangThai) ? thoiGianCham : null,
      gioRaThucTe: null 
    });

    await newChamCong.save();

    res.status(201).json({
      message: "✅ Chấm công thành công!",
      chiTiet: {
        tenNV: nv.hoTen,
        trangThai: newChamCong.trangThai,
        lyDo: newChamCong.lyDo,
        ngay: thoiGianCham
      }
    });

  } catch (err) {
    res.status(500).json({ message: "❌ Lỗi Server: " + err.message });
  }
});

export default router;
