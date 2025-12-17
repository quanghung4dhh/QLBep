import mongoose from "mongoose";
const { Schema } = mongoose;


// ---  ĐỊNH NGHĨA SCHEMAS (CẤU TRÚC BẢNG) ---

// 1. Nhân Viên (Gộp 5 bảng SQL thành 1 Collection)
const NhanVienSchema = new Schema({
  maNV: { type: String, required: true, unique: true },
  hoTen: String,
  gioiTinh: String,
  ngaySinh: Date,
  sdt: String,
  email: String,
  roles: [String], // Chứa: 'PhucVu', 'Kho', 'QuanLiBep', 'DauBep'...
});

// 2. Nguyên Liệu
const NguyenLieuSchema = new Schema({
  maNL: { type: String, required: true, unique: true },
  tenNL: String,
  donViTinh: String,
  soLuongTon: Number,
  donGia: Number,
});

// 3. Món Ăn (Gộp Món + Công Thức + Định Lượng)
const MonAnSchema = new Schema({
  maMon: { type: String, required: true, unique: true },
  tenMon: String,
  giaBan: Number,
  congThuc: {
    maCT: String,
    ghiChu: String,
  },
  dinhLuong: [
    {
      // Từ bảng TieuTonThucTe
      maNL: String,
      soLuong: Number,
    },
  ],
});

// 4. Nhà Cung Cấp
const NhaCungCapSchema = new Schema({
  maNCC: { type: String, required: true, unique: true },
  tenNCC: String,
  diaChi: String,
  sdt: String,
});

// 5. Hóa Đơn (Gộp Hóa Đơn + Chi Tiết)
const HoaDonSchema = new Schema({
  maHD: { type: String, required: true, unique: true },
  ngayLap: Date,
  tongTien: Number,
  maNVPhucVu: String,
  chiTiet: [
    {
      // Từ bảng ChiTietHoaDon
      maMon: String,
      soLuong: Number,
      thanhTien: Number,
    },
  ],
});

// 6. Đơn Hàng (Gộp Đơn Hàng + Chi Tiết Nhập)
const DonHangSchema = new Schema({
  maDH: { type: String, required: true, unique: true },
  ngayDat: Date,
  trangThai: String,
  maNCC: String,
  tongTien: Number,
  items: [
    {
      // Từ bảng DonHangItem / ChiTietDonHang
      maNL: String,
      soLuong: Number,
      donGiaNhap: Number,
      thanhTien: Number,
    },
  ],
});

// 7. Ca Làm Việc
const CaLamViecSchema = new Schema({
  maCa: { type: String, required: true, unique: true },
  tenCa: String,
  gioBD: String,
  gioKT: String,
});

// 8. Lịch Làm Việc
const LichLamViecSchema = new Schema({
  maLich: Number,
  maNV: String,
  maCa: String,
  ngayLam: Date,
});

// 9. Bảng Chấm Công
const BangChamCongSchema = new Schema({
  id: Number,
  maNV: String,
  ngayCham: Date,
  gioVaoThucTe: Date,
  gioRaThucTe: Date,
  trangThai: String,
});

// 10. Phân Công Ca (Bảng phụ từ SQL)
const PhanCongCaSchema = new Schema({
  maCa: String,
  ngay: Date,
  gioBD: String,
  gioKT: String,
});

// --- TẠO VÀ EXPORT MODELS ---
export const NhanVien = mongoose.model("NhanVien", NhanVienSchema);
export const NguyenLieu = mongoose.model("NguyenLieu", NguyenLieuSchema);
export const MonAn = mongoose.model("MonAn", MonAnSchema);
export const NhaCungCap = mongoose.model("NhaCungCap", NhaCungCapSchema);
export const HoaDon = mongoose.model("HoaDon", HoaDonSchema);
export const DonHang = mongoose.model("DonHang", DonHangSchema);
export const CaLamViec = mongoose.model("CaLamViec", CaLamViecSchema);
export const LichLamViec = mongoose.model("LichLamViec", LichLamViecSchema);
export const BangChamCong = mongoose.model("BangChamCong", BangChamCongSchema);
export const PhanCongCa = mongoose.model("PhanCongCa", PhanCongCaSchema);


