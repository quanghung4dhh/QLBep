import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Import hàm kết nối DB
import { connectDB } from "./database/db.js";

// --- IMPORT CÁC ROUTES ---
import nhanVienRoutes from "./routes/getNV.js";
import nguyenLieuRoutes from "./routes/getNL.js";
import monAnRoutes from "./routes/getMA.js";

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối Database
connectDB();

// API Test server
app.get("/", (req, res) => {
  res.send("🚀 Server Nhà Bếp đang chạy!");
});

// --- ĐĂNG KÝ ROUTES (Mounting) ---
// Tất cả API trong nhanVien.js sẽ bắt đầu bằng /api/nhan-vien
app.use("/api/nhan-vien", nhanVienRoutes);

// Tất cả API trong nguyenLieu.js sẽ bắt đầu bằng /api/nguyen-lieu
app.use("/api/nguyen-lieu", nguyenLieuRoutes);

// Tất cả API trong monAn.js sẽ bắt đầu bằng /api/mon-an
app.use("/api/mon-an", monAnRoutes);


// Chạy Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`👉 Test Nhân viên: http://localhost:${PORT}/api/nhan-vien`);
  console.log(`👉 Test Món ăn: http://localhost:${PORT}/api/mon-an`);
  console.log(`👉 Test Kho: http://localhost:${PORT}/api/nguyen-lieu`);
});