CREATE TABLE NhanVien (
   maNV VARCHAR(20) PRIMARY KEY,
   hoTen NVARCHAR(50),
   gioiTinh NVARCHAR(10),
   ngaySinh DATE,
   sdt VARCHAR(15),
   email VARCHAR(100)
);
CREATE TABLE NhanVienPhucVu (
    maNV VARCHAR(20) PRIMARY KEY,
    FOREIGN KEY (maNV) REFERENCES NhanVien(maNV)
);
CREATE TABLE NhanVienKho (
    maNV VARCHAR(20) PRIMARY KEY,
    FOREIGN KEY (maNV) REFERENCES NhanVien(maNV)
);	
CREATE TABLE QuanLiBep (
    maNV VARCHAR(20) PRIMARY KEY,
    FOREIGN KEY (maNV) REFERENCES NhanVien(maNV)
);
CREATE TABLE DauBepChinh (
    maNV VARCHAR(20) PRIMARY KEY,
    FOREIGN KEY (maNV) REFERENCES NhanVien(maNV)
);
CREATE TABLE PhanCongCa (
   maCa VARCHAR(20) PRIMARY KEY,
   ngay DATE,
   gioBD VARCHAR(10),
   gioKT VARCHAR(10)
);
CREATE TABLE NguyenLieu (
   maNL VARCHAR(20) PRIMARY KEY,
   tenNL NVARCHAR(50),
   donViTinh VARCHAR(10),
   soLuongTon INT,
   donGia DECIMAL(15, 2)
);
CREATE TABLE MonAn (
   maMon VARCHAR(20) PRIMARY KEY,
   tenMon NVARCHAR(50),
   giaBan DECIMAL(15, 2)
);
CREATE TABLE CongThuc (
   maCT VARCHAR(20) PRIMARY KEY,
   ghiChu TEXT
);
CREATE TABLE NhaCungCap (
   maNCC VARCHAR(20) PRIMARY KEY,
   tenNCC NVARCHAR(50),
   diaChi NVARCHAR(100),
   sdt VARCHAR(15)
);
CREATE TABLE HoaDon (
    maHD VARCHAR(20) PRIMARY KEY,
    ngayLap DATETIME,
    tongTien DECIMAL(15, 2),
    maNVPhucVu VARCHAR(20),
    FOREIGN KEY (maNVPhucVu) REFERENCES NhanVien(maNV)
);
CREATE TABLE ChiTietHoaDon (
    maHD VARCHAR(20),
	maMon VARCHAR(20),
	soLuong INT,
	thanhTien DECIMAL(15, 2),
	PRIMARY KEY (maHD, maMon),
	FOREIGN KEY (maHD) REFERENCES HoaDon(maHD),
	FOREIGN KEY (maMon) REFERENCES MonAn(maMon)
);
CREATE TABLE TieuTonThucTe (
    maMon VARCHAR(20),
    maNL VARCHAR(20),
    soLuong INT,
    PRIMARY KEY (maMon, maNL),
    FOREIGN KEY (maMon) REFERENCES MonAn(maMon),
    FOREIGN KEY (maNL) REFERENCES NguyenLieu(maNL)
);
CREATE TABLE DonHang (
    maDH VARCHAR(20) PRIMARY KEY,
    ngayDat DATETIME,
    trangThai NVARCHAR(50),
    maNCC VARCHAR(20),
	tongTien DECIMAL(15, 2),
    FOREIGN KEY (maNCC) REFERENCES NhaCungCap(maNCC)
);
CREATE TABLE DonHangItem (
    maDH VARCHAR(20),
    maNL VARCHAR(20),
    soLuong INT,
    donGiaNhap DECIMAL(15,2), 
    PRIMARY KEY (maDH, maNL),
    FOREIGN KEY (maDH) REFERENCES DonHang(maDH),
    FOREIGN KEY (maNL) REFERENCES NguyenLieu(maNL)
);
CREATE TABLE CaLamViec (
   maCa VARCHAR(20) PRIMARY KEY, -- Ví dụ: CA_SANG, CA_CHIEU
   tenCa NVARCHAR(50),
   gioBD TIME, -- 07:00:00 AM--
   gioKT TIME  -- 10:00:00 PM--
);
CREATE TABLE LichLamViec (
   maLich INT PRIMARY KEY,
   maNV VARCHAR(20),
   maCa VARCHAR(20),
   ngayLam DATE,
   FOREIGN KEY (maNV) REFERENCES NhanVien(maNV),
   FOREIGN KEY (maCa) REFERENCES CaLamViec(maCa)
);
CREATE TABLE BangChamCong (
   id INT PRIMARY KEY,
   maNV VARCHAR(20),
   ngayCham DATE,
   gioVaoThucTe DATETIME, -- Lưu cả ngày giờ để tính tăng ca qua đêm nếu cần--
   gioRaThucTe DATETIME,
   trangThai NVARCHAR(50), -- Đi muộn, Về sớm, Đúng giờ--
   FOREIGN KEY (maNV) REFERENCES NhanVien(maNV)
);

DELETE FROM NhanVien;

--Thêm thông tin vào bảng nhân viên--
INSERT INTO NhanVien VALUES ('NV001', N'Nguyễn Văn An', N'Nam', '1995-01-01', '0967374322', 'anvannguyen@gamil.com');
INSERT INTO NhanVien VALUES ('NV002', N'Nguyễn Văn Công', N'Nam', '1998-11-09', '0945375362', 'congvannguyen@gamil.com');
INSERT INTO NhanVien VALUES ('NV003', N'Đào Thị Thu', N'Nữ', '1996-05-01', '0964437222', 'thuthidao@gamil.com');
INSERT INTO NhanVien VALUES ('NV004', N'Trần Văn Quyết', N'Nam', '1997-06-11', '0956437432', 'quyetvantran@gamil.com');
INSERT INTO NhanVien VALUES ('NV005', N'Lê Thị Hà', N'Nữ', '1996-07-24', '0924688455', 'hathile@gamil.com');
INSERT INTO NhanVien VALUES ('NV006', N'Đoàn Thị Vân', N'Nữ', '1994-12-22', '0984376883', 'vanthidoan@gamil.com');
INSERT INTO NhanVien VALUES ('NV007', N'Vũ Văn Trung', N'Nam', '1997-07-07', '0954432813', 'trungvanvu@gamil.com');
INSERT INTO NhanVien VALUES ('NV008', N'Lê Thị Tú', N'Nữ', '1997-06-24', '0944688455', 'tuthile@gamil.com');
INSERT INTO NhanVien VALUES ('NV009', N'Nguyễn Thị Huệ', N'Nữ', '1999-07-11', '0954378852', 'huethinguyen@gamil.com');
INSERT INTO NhanVien VALUES ('NV010', N'Trần Văn Minh', N'Nam', '1998-09-12', '0974366532', 'minhvantran@gamil.com');
INSERT INTO NhanVien VALUES ('NV011', N'Hoàng Văn Hà', N'Nam', '1998-07-24', '0924667935', 'havannguyen@gamil.com');
INSERT INTO NhanVien VALUES ('NV012', N'Nguyễn Thị Thảo', N'Nữ', '1995-08-14', '0974368451', 'thaothinguyen@gamil.com');
INSERT INTO NhanVien VALUES ('NV013', N'Phạm Minh Hùng', N'Nam', '1996-03-11', '0901234560', 'hungminhpham@gmail.com');
INSERT INTO NhanVien VALUES ('NV014', N'Ngô Thị Lan', N'Nữ', '1997-09-22', '0901234561', 'lanthingo@gmail.com');
INSERT INTO NhanVien VALUES ('NV015', N'Trịnh Văn Phú', N'Nam', '1995-05-18', '0901234562', 'phuvantrinh@gmail.com');
INSERT INTO NhanVien VALUES ('NV016', N'Hoàng Mỹ Duyên', N'Nữ', '1998-12-29', '0901234563', 'duyenmyhoang@gmail.com');
INSERT INTO NhanVien VALUES ('NV017', N'Đặng Hữu Tài', N'Nam', '1994-11-10', '0901234564', 'taihuudang@gmail.com');
INSERT INTO NhanVien VALUES ('NV018', N'Bùi Thanh Vân', N'Nữ', '1996-04-02', '0901234565', 'vanthanhbui@gmail.com');
INSERT INTO NhanVien VALUES ('NV019', N'Lê Nhật Long', N'Nam', '1999-06-15', '0901234566', 'longnhatle@gmail.com');
INSERT INTO NhanVien VALUES ('NV020', N'Tạ Hữu Nghĩa', N'Nam', '1995-02-21', '0901234567', 'nghiahuuta@gmail.com');
INSERT INTO NhanVien VALUES ('NV021', N'Phan Quỳnh Như', N'Nữ', '1997-03-07', '0901234568', 'nhuquynhpham@gmail.com');
INSERT INTO NhanVien VALUES ('NV022', N'Lê Hoàng Bảo', N'Nam', '1994-08-19', '0901234569', 'baohoangle@gmail.com');
INSERT INTO NhanVien VALUES ('NV023', N'Nguyễn Thụy Vy', N'Nữ', '1998-01-27', '0901234570', 'vythuynguyen@gmail.com');
INSERT INTO NhanVien VALUES ('NV024', N'Trần Kim Ngân', N'Nữ', '1995-04-12', '0901234571', 'ngankimtran@gmail.com');
INSERT INTO NhanVien VALUES ('NV025', N'Huỳnh Quốc Bảo', N'Nam', '1996-10-03', '0901234572', 'baoquochuynh@gmail.com');
INSERT INTO NhanVien VALUES ('NV026', N'Võ Minh Nhật', N'Nam', '1997-07-08', '0901234573', 'nhatminhvo@gmail.com');
INSERT INTO NhanVien VALUES ('NV027', N'Đoàn Hữu Trí', N'Nam', '1998-09-29', '0901234574', 'trihuudoan@gmail.com');

--Thêm thông tin vào bảng nhân viên phục vụ--
INSERT INTO NhanVienPhucVu VALUES ('NV001');
INSERT INTO NhanVienPhucVu VALUES ('NV002');
INSERT INTO NhanVienPhucVu VALUES ('NV003');
INSERT INTO NhanVienPhucVu VALUES ('NV013');
INSERT INTO NhanVienPhucVu VALUES ('NV014');
INSERT INTO NhanVienPhucVu VALUES ('NV015');
INSERT INTO NhanVienPhucVu VALUES ('NV016');
INSERT INTO NhanVienPhucVu VALUES ('NV017');
INSERT INTO NhanVienPhucVu VALUES ('NV018');
INSERT INTO NhanVienPhucVu VALUES ('NV019');
INSERT INTO NhanVienPhucVu VALUES ('NV020');

--Thêm thông tin vào bảng nhân viên kho--
INSERT INTO NhanVienKho VALUES ('NV004');
INSERT INTO NhanVienKho VALUES ('NV005');
INSERT INTO NhanVienKho VALUES ('NV021');
INSERT INTO NhanVienKho VALUES ('NV022');
INSERT INTO NhanVienKho VALUES ('NV023');
INSERT INTO NhanVienKho VALUES ('NV024');

--Thêm thông tin vào bảng quản lý bếp--
INSERT INTO QuanLiBep VALUES ('NV006');

--Thêm thông tin vào bảng đầu bếp chính--
INSERT INTO DauBepChinh VALUES ('NV007');
INSERT INTO DauBepChinh VALUES ('NV025');
INSERT INTO DauBepChinh VALUES ('NV026');


--Thêm thông tin vào bảng phân công ca--
INSERT INTO PhanCongCa VALUES ('CA01','2024-12-03','08:00','12:00');
INSERT INTO PhanCongCa VALUES ('CA02','2024-12-03','12:00','16:00');
INSERT INTO PhanCongCa VALUES ('CA03','2024-12-03','16:00','20:00');
INSERT INTO PhanCongCa VALUES ('CA04','2024-12-03','08:00','16:00');
INSERT INTO PhanCongCa VALUES ('CA05','2024-12-04','08:00','12:00');
INSERT INTO PhanCongCa VALUES ('CA06','2024-12-04','12:00','16:00');
INSERT INTO PhanCongCa VALUES ('CA07','2024-12-04','16:00','20:00');
INSERT INTO PhanCongCa VALUES ('CA08','2024-12-04','08:00','16:00');
INSERT INTO PhanCongCa VALUES ('CA09','2024-12-05','08:00','12:00');
INSERT INTO PhanCongCa VALUES ('CA10','2024-12-05','08:00','16:00');


--Thêm thông tin vào bảng nguyên liệu--
INSERT INTO NguyenLieu VALUES ('NL01', N'Thịt bò', 'kg', 50, 250000);
INSERT INTO NguyenLieu VALUES ('NL02', N'Thịt gà', 'kg', 60, 120000);
INSERT INTO NguyenLieu VALUES ('NL03', N'Rau cải', 'kg', 40, 30000);
INSERT INTO NguyenLieu VALUES ('NL04', N'Hành lá', 'kg', 20, 40000);
INSERT INTO NguyenLieu VALUES ('NL05', N'Tỏi', 'kg', 15, 80000);
INSERT INTO NguyenLieu VALUES ('NL06', N'Hành tím', 'kg', 25, 60000);
INSERT INTO NguyenLieu VALUES ('NL07', N'Ớt', 'kg', 10, 70000);
INSERT INTO NguyenLieu VALUES ('NL08', N'Gạo', 'kg', 200, 18000);
INSERT INTO NguyenLieu VALUES ('NL09', N'Miến', 'kg', 30, 80000);
INSERT INTO NguyenLieu VALUES ('NL10', N'Hải sản hỗn hợp', 'kg', 50, 180000);
INSERT INTO NguyenLieu VALUES ('NL11', N'Thịt heo', 'kg', 70, 150000);
INSERT INTO NguyenLieu VALUES ('NL12', N'Cá hồi', 'kg', 20, 350000);
INSERT INTO NguyenLieu VALUES ('NL13', N'Thịt vịt', 'kg', 30, 140000);
INSERT INTO NguyenLieu VALUES ('NL14', N'Bún tươi', 'kg', 40, 20000);
INSERT INTO NguyenLieu VALUES ('NL15', N'Bánh phở', 'kg', 35, 22000);
INSERT INTO NguyenLieu VALUES ('NL16', N'Dầu ăn', 'lít', 80, 40000);
INSERT INTO NguyenLieu VALUES ('NL17', N'Bơ', 'kg', 15, 150000);
INSERT INTO NguyenLieu VALUES ('NL18', N'Nước mắm', 'lít', 100, 30000);
INSERT INTO NguyenLieu VALUES ('NL19', N'Xì dầu', 'lít', 90, 35000);
INSERT INTO NguyenLieu VALUES ('NL20', N'Khoai tây', 'kg', 50, 25000);
INSERT INTO NguyenLieu VALUES ('NL21', N'Rau muống', 'kg', 25, 28000);
INSERT INTO NguyenLieu VALUES ('NL22', N'Rau ngót', 'kg', 20, 26000);
INSERT INTO NguyenLieu VALUES ('NL23', N'Bí đỏ', 'kg', 30, 22000);
INSERT INTO NguyenLieu VALUES ('NL24', N'Dưa leo', 'kg', 35, 30000);
INSERT INTO NguyenLieu VALUES ('NL25', N'Cà rốt', 'kg', 40, 25000);
INSERT INTO NguyenLieu VALUES ('NL26', N'Nấm hương', 'kg', 20, 150000);
INSERT INTO NguyenLieu VALUES ('NL27', N'Nấm kim châm', 'kg', 20, 160000);
INSERT INTO NguyenLieu VALUES ('NL28', N'Lá chanh', 'kg', 10, 90000);
INSERT INTO NguyenLieu VALUES ('NL29', N'Ngò rí', 'kg', 18, 45000);
INSERT INTO NguyenLieu VALUES ('NL30', N'Sả cây', 'kg', 25, 35000);

--Thêm thông tin vào bảng món ăn--
INSERT INTO MonAn VALUES ('MA01', N'Phở bò', 45000);
INSERT INTO MonAn VALUES ('MA02', N'Cơm gà chiên', 35000);
INSERT INTO MonAn VALUES ('MA03', N'Lẩu hải sản', 180000);
INSERT INTO MonAn VALUES ('MA04', N'Bún thịt nướng', 40000);
INSERT INTO MonAn VALUES ('MA05', N'Mì xào hải sản', 60000);
INSERT INTO MonAn VALUES ('MA06', N'Cá hồi áp chảo', 150000);
INSERT INTO MonAn VALUES ('MA07', N'Cháo gà', 30000);
INSERT INTO MonAn VALUES ('MA08', N'Salad rau củ', 25000);
INSERT INTO MonAn VALUES ('MA09', N'Gỏi cuốn', 30000);
INSERT INTO MonAn VALUES ('MA10', N'Cơm chiên dương châu', 45000);
INSERT INTO MonAn VALUES ('MA11', N'Lẩu bò', 160000);
INSERT INTO MonAn VALUES ('MA12', N'Mì udon xào', 55000);
INSERT INTO MonAn VALUES ('MA13', N'Súp bí đỏ', 35000);
INSERT INTO MonAn VALUES ('MA14', N'Thịt heo kho', 50000);
INSERT INTO MonAn VALUES ('MA15', N'Canh chua cá', 45000);

--Thêm thông tin vào bảng công thức--
INSERT INTO CongThuc VALUES ('CT01',  N'Công thức nấu phở bò chuẩn vị');
INSERT INTO CongThuc VALUES ('CT02',  N'Công thức cơm gà chiên giòn');
INSERT INTO CongThuc VALUES ('CT03',  N'Nấu lẩu hải sản đậm vị');
INSERT INTO CongThuc VALUES ('CT04',  N'Công thức bún thịt nướng - nước mắm chua ngọt');
INSERT INTO CongThuc VALUES ('CT05',  N'Mì xào hải sản nhanh');
INSERT INTO CongThuc VALUES ('CT06',  N'Cá hồi áp chảo sốt chanh');
INSERT INTO CongThuc VALUES ('CT07',  N'Cháo gà thơm ngon');
INSERT INTO CongThuc VALUES ('CT08',  N'Salad rau củ healthy');
INSERT INTO CongThuc VALUES ('CT09',  N'Gỏi cuốn tôm thịt');
INSERT INTO CongThuc VALUES ('CT10', N'Cơm chiên dương châu đúng chuẩn');
INSERT INTO CongThuc VALUES ('CT11', N'Lẩu bò truyền thống');
INSERT INTO CongThuc VALUES ('CT12', N'Mì udon xào kiểu Nhật');
INSERT INTO CongThuc VALUES ('CT13', N'Súp bí đỏ béo thơm');
INSERT INTO CongThuc VALUES ('CT14', N'Thịt heo kho nước dừa');
INSERT INTO CongThuc VALUES ('CT15', N'Canh chua cá truyền thống');

DELETE FROM NhaCungCap;
--Thêm thông tin nhà cung cấp--
INSERT INTO NhaCungCap VALUES ('NCC01', N'Công ty Thực phẩm Hà Nội', N'12 Trần Hưng Đạo', '0988001122');
INSERT INTO NhaCungCap VALUES ('NCC02', N'Nhà cung cấp Rau Sạch', N'45 Lê Lợi', '0988223344');
INSERT INTO NhaCungCap VALUES ('NCC03', N'Công ty Hải Sản Biển Đông', N'99 Nguyễn Huệ', '0988556677');
INSERT INTO NhaCungCap VALUES ('NCC04', N'Tổng kho gia vị An Hà', N'22 Trần Phú', '0988001132');
INSERT INTO NhaCungCap VALUES ('NCC05', N'Nhà cung cấp Trứng Sạch', N'16 Nguyễn Du', '0988543744');
INSERT INTO NhaCungCap VALUES ('NCC06', N'Nhà cung cấp hoa quả tươi', N'44 Nguyễn An Ninh', '0988556887');


--Thêm thông tin vào bảng hóa đơn--
INSERT INTO HoaDon (maHD, ngayLap, tongTien, maNVPhucVu)
VALUES ('HD001', '2024-01-01 10:00', 120000, 'NV001'),
       ('HD002', '2024-01-02 11:20', 150000, 'NV002'),
       ('HD003', '2024-01-03 12:45', 98000,  'NV003'),
       ('HD004', '2024-01-04 09:30', 210000, 'NV004'),
       ('HD005', '2024-01-05 18:10', 76000,  'NV005'),
       ('HD006', '2024-01-06 19:40', 134000, 'NV006'),
       ('HD007', '2024-01-07 20:15', 88000,  'NV007'),
       ('HD008', '2024-01-08 13:55', 160000, 'NV008'),
       ('HD009', '2024-01-09 14:20', 112000, 'NV001'),
       ('HD010', '2024-01-10 15:45', 178000, 'NV002'),
       ('HD011', '2024-01-11 16:30', 95000,  'NV003'),
       ('HD012', '2024-01-12 18:50', 210000, 'NV004'),
       ('HD013', '2024-01-13 09:25', 123000, 'NV005'),
       ('HD014', '2024-01-14 08:40', 156000, 'NV006'),
       ('HD015', '2024-01-15 19:15', 98000,  'NV007'),
       ('HD016', '2024-01-16 20:45', 110000, 'NV008'),
       ('HD017', '2024-01-17 11:10', 134000, 'NV001'),
       ('HD018', '2024-01-18 12:30', 178000, 'NV002'),
       ('HD019', '2024-01-19 13:45', 142000, 'NV003'),
       ('HD020', '2024-01-20 14:10', 166000, 'NV004'),
       ('HD021', '2024-01-21 10:20', 91000,  'NV005'),
       ('HD022', '2024-01-22 11:35', 187000, 'NV006'),
       ('HD023', '2024-01-23 12:50', 129000, 'NV007'),
       ('HD024', '2024-01-24 18:25', 150000, 'NV008'),
       ('HD025', '2024-01-25 19:40', 97000,  'NV001'),
       ('HD026', '2024-01-26 20:55', 199000, 'NV002'),
       ('HD027', '2024-01-27 17:10', 105000, 'NV003'),
       ('HD028', '2024-01-28 13:25', 167000, 'NV004'),
       ('HD029', '2024-01-29 15:15', 145000, 'NV005'),
       ('HD030', '2024-01-30 16:50', 178000, 'NV006');

--Thêm thông tin vào bảng chi tiết hóa đơn--
INSERT INTO ChiTietHoaDon (maHD, maMon, soLuong, thanhTien) VALUES
('HD001', 'MA01', 1, 120000),
('HD002', 'MA02', 1, 150000),
('HD003', 'MA03', 1, 98000),
('HD004', 'MA04', 1, 210000),
('HD005', 'MA05', 1, 76000),
('HD006', 'MA06', 1, 134000),
('HD007', 'MA07', 1, 88000),
('HD008', 'MA08', 1, 160000),
('HD009', 'MA09', 1, 112000),
('HD010', 'MA10', 1, 178000),
('HD011', 'MA11', 1, 95000),
('HD012', 'MA12', 1, 210000),
('HD013', 'MA13', 1, 123000),
('HD014', 'MA14', 1, 156000),
('HD015', 'MA15', 1, 98000),
('HD016', 'MA01', 1, 110000),
('HD017', 'MA02', 1, 134000),
('HD018', 'MA03', 1, 178000),
('HD019', 'MA04', 1, 142000),
('HD020', 'MA05', 1, 166000),
('HD021', 'MA06', 1, 91000),
('HD022', 'MA07', 1, 187000),
('HD023', 'MA08', 1, 129000),
('HD024', 'MA09', 1, 150000),
('HD025', 'MA10', 1, 97000),
('HD026', 'MA11', 1, 199000),
('HD027', 'MA12', 1, 105000),
('HD028', 'MA13', 1, 167000),
('HD029', 'MA14', 1, 145000),
('HD030', 'MA15', 1, 178000);


--Thêm thông tin vào bảng tiêu tốn thực tế--
INSERT INTO TieuTonThucTe (maMon, maNL, soLuong) VALUES
('MA01','NL01',2), ('MA01','NL02',1),
('MA02','NL03',1), ('MA02','NL04',2),
('MA03','NL05',1), ('MA03','NL06',1),
('MA04','NL07',3), ('MA04','NL08',1),
('MA05','NL09',2), ('MA05','NL10',1),
('MA06','NL11',1), ('MA06','NL12',2),
('MA07','NL13',1), ('MA07','NL14',1),
('MA08','NL15',2), ('MA08','NL16',1),
('MA09','NL17',1), ('MA09','NL18',2),
('MA10','NL19',1), ('MA10','NL20',1);


--Thêm thông tin vào bảng đơn hàng--
INSERT INTO DonHang (maDH, ngayDat, trangThai, maNCC) VALUES
('DH001', '2024-02-01 10:00', N'Hoàn thành', 'NCC01'),
('DH002', '2024-02-02 11:00', N'Hoàn thành', 'NCC02'),
('DH003', '2024-02-03 12:00', N'Hoàn thành', 'NCC03'),
('DH004', '2024-02-04 13:00', N'Hoàn thành', 'NCC04'),
('DH005', '2024-02-05 14:00', N'Hoàn thành', 'NCC05'),
('DH006', '2024-02-06 15:00', N'Hoàn thành', 'NCC06'),
('DH007', '2024-02-07 16:00', N'Hoàn thành', 'NCC01'),
('DH008', '2024-02-08 17:00', N'Hoàn thành', 'NCC02'),
('DH009', '2024-02-09 18:00', N'Hoàn thành', 'NCC03'),
('DH010', '2024-02-10 19:00', N'Hoàn thành', 'NCC04'),
('DH011', '2024-02-11 20:00', N'Hoàn thành', 'NCC05'),
('DH012', '2024-02-12 21:00', N'Hoàn thành', 'NCC03'),
('DH013', '2024-02-13 22:00', N'Hoàn thành', 'NCC01'),
('DH014', '2024-02-14 23:00', N'Hoàn thành', 'NCC02'),
('DH015', '2024-02-15 08:00', N'Hoàn thành', 'NCC03'),
('DH016', '2024-02-16 10:00', N'Đang xử lý', 'NCC01'),
('DH017', '2024-02-17 11:00', N'Đang xử lý', 'NCC06'),
('DH018', '2024-02-18 12:00', N'Đang xử lý', 'NCC03'),
('DH019', '2024-02-19 13:00', N'Đang xử lý', 'NCC04'),
('DH020', '2024-02-20 14:00', N'Đang xử lý', 'NCC02');


--Thêm thông tin vào bảng đơn hàng item--
INSERT INTO DonHang VALUES ('DH001', '2024-02-01 08:00', N'Hoàn thành', 'NCC01', 5000000);
INSERT INTO DonHang VALUES ('DH002', '2024-03-02 09:30', N'Đang xử lí', 'NCC03', 4500000);
-- Thêm chi tiết (Giả sử nhập 10kg Thịt bò giá 240k và 20kg Gà giá 110k)
INSERT INTO ChiTietDonHang VALUES ('DH001', 'NL01', 10, 240000, 2400000);
INSERT INTO ChiTietDonHang VALUES ('DH001', 'NL02', 20, 110000, 2200000);
-- Tạo định nghĩa ca--
INSERT INTO CaLamViec VALUES ('CA1', N'Ca Sáng', '08:00', '12:00');
INSERT INTO CaLamViec VALUES ('CA2', N'Ca Chiều', '12:00', '16:00');
INSERT INTO CaLamViec VALUES ('CA3', N'Ca Tối',   '16:00', '22:00');

-- Phân công NV001 làm Ca Sáng ngày 01/12/2025--
INSERT INTO LichLamViec VALUES (1, 'NV001', 'CA1', '2025-12-01');
-- Phân công NV002 làm Ca Chiều ngày 01/12/2025--
INSERT INTO LichLamViec VALUES (2, 'NV002', 'CA2', '2025-12-01');

-- Chấm công: NV001 đi làm thực tế (Vào 7:55, Ra 12:05)
INSERT INTO BangChamCong VALUES (1, 'NV001', '2025-12-01', '2025-12-01 07:55:00', '2025-12-01 10:05:00', N'Đúng giờ');



 --Lấy danh sách của toàn bộ nhân viên--
SELECT maNV, hoTen, gioiTinh, ngaySinh FROM NhanVien;

--Tìm nhân viên có tên là Bảo--
SELECT * FROM NhanVien
WHERE hoTen LIKE N'%Bảo';

--Kiểm tra kho sắp hết hàng--
SELECT maNL,tenNL,donViTinh, soLuongTon FROM NguyenLieu WHERE soLuongTon < 20; 

--Tổng giá trị hàng tồn kho--
SELECT SUM(soLuongTon * donGia) as TongKho
FROM NguyenLieu; 
--Đưa ra hóa đơn của món ăn--
SELECT M.tenMon, C.soLuong, M.giaBan, C.thanhTien
FROM ChiTietHoaDon C
JOIN MonAn M ON C.maMon = M.maMon
WHERE C.maHD = 'HD001';

--Đưa ra danh sách các món ăn có giá trên 60K--
SELECT tenMon, giaBan 
FROM MonAn 
WHERE giaBan > 60000
ORDER BY giaBan DESC;

--Cập nhật tên nhân viên Có mã 001 thành Nguyễn Văn B--
UPDATE NhanVien
SET hoTen = 'Nguyen Van B', SDT = '0909999999'
WHERE maNV = 'NV001';
--Đếm số lượng nhân viên theo giới tính--
SELECT gioiTinh, COUNT(maNV) as SoLuong
FROM NhanVien
GROUP BY gioiTinh;
--Công thức cần thiết để nấu ra món phở bò
SELECT m.tenMon, nl.tenNL, t.soLuong, nl.donViTinh
FROM MonAn m
JOIN TieuTonThucTe t ON m.maMon = t.maMon
JOIN NguyenLieu nl ON t.maNL = nl.maNL
WHERE m.tenMon = N'Phở bò';
--Đưa ra danh sách các nguên liệu--
SELECT * FROM NguyenLieu;
--Đưa ra mức tiêu thụ tồn kho thực tế--
UPDATE NguyenLieu
SET soLuongTon = soLuongTon - 5
WHERE maNL = 'NL01';

INSERT INTO MonAn (maMon, tenMon, giaBan)
VALUES ('M01', 'Phở bò', 45000);
--Chi tiết của hóa đơn HD001--
SELECT hd.maHD, m.tenMon, cthd.soLuong, cthd.thanhTien
FROM ChiTietHoaDon cthd
JOIN MonAn m ON cthd.maMon = m.maMon
JOIN HoaDon hd ON cthd.maHD = hd.maHD
WHERE hd.maHD = 'HD001';
--Thống kê mỗi nhân viên đã lập bao nhiêu hóa đơn và tổng số tiền họ mang về--
SELECT nv.hoTen, COUNT(hd.maHD) as SoLuongHoaDon, SUM(hd.tongTien) as TongTien
FROM NhanVien nv
JOIN HoaDon hd ON nv.maNV = hd.maNVPhucVu
GROUP BY nv.hoTen
ORDER BY TongTien DESC;
--Tính doanh thu tháng 12 năm 2025
SELECT SUM(tongTien) as TongDoanhThuThang12
FROM HoaDon
WHERE MONTH(ngayLap) = 12 AND YEAR(ngayLap) = 2025;
--Tổng giá trị tồn kho hiện tại--
SELECT SUM(soLuongTon * donGia) as TongGiaTriKho
FROM NguyenLieu;
--Tính lợi nhuận ước tính trên từng món ăn--
SELECT 
    m.tenMon,
    m.giaBan,
    SUM(t.soLuong * nl.donGia) AS GiaVonNguyenLieu,
    (m.giaBan - SUM(t.soLuong * nl.donGia)) AS LoiNhuanGop
FROM MonAn m
JOIN TieuTonThucTe t ON m.maMon = t.maMon
JOIN NguyenLieu nl ON t.maNL = nl.maNL
GROUP BY m.tenMon, m.giaBan
ORDER BY LoiNhuanGop DESC
--Tổng nguyên liệu đã tiêu thụ dựa trên các hóa đơn đã bán--
SELECT 
    nl.tenNL,
    SUM(cthd.soLuong * t.soLuong) AS TongSoLuongTieuThu,
    nl.donViTinh
FROM ChiTietHoaDon cthd
JOIN TieuTonThucTe t ON cthd.maMon = t.maMon
JOIN NguyenLieu nl ON t.maNL = nl.maNL
GROUP BY nl.tenNL, nl.donViTinh
ORDER BY TongSoLuongTieuThu DESC;
--Thống kê tổng chi phí nhập hàng theo từng nhà cung cấp--
SELECT 
    ncc.tenNCC,
    COUNT(dh.maDH) AS SoDonHang,
    SUM(dhi.soLuong * nl.donGia) AS UocTinhChiPhiNhap
FROM DonHang dh
JOIN NhaCungCap ncc ON dh.maNCC = ncc.maNCC
JOIN DonHangItem dhi ON dh.maDH = dhi.id 
JOIN NguyenLieu nl ON dhi.maNL = nl.maNL
GROUP BY ncc.tenNCC;
--Chi phí nhập hàng--
SELECT dh.maDH, dh.ngayDat, SUM(ct.thanhTien) as TongGiaTriDon
FROM DonHang dh
JOIN ChiTietDonHang ct ON dh.maDH = ct.maDH
GROUP BY dh.maDH, dh.ngayDat;
--Tìm các món ăn sử dụng nguên liệu là thịt bò--
SELECT m.tenMon, m.giaBan, t.soLuong AS LuongThitBoSuDung
FROM MonAn m
JOIN TieuTonThucTe t ON m.maMon = t.maMon
WHERE t.maNL = 'NL01';

