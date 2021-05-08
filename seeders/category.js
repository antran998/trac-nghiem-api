const categorySeeding = (db) => {
  return db.category.bulkCreate([
    { name: "Chương 1: Este-Lipit", subjectId: 3 },
    { name: "Chương 2: Cacbohiđrat", subjectId: 3 },
    { name: "Chương 3: Amin, Amino Axit Và Protein", subjectId: 3 },
    { name: "Chương 4: Polime Và Vật Liệu Polime", subjectId: 3 },
    { name: "Chương 5: Đại Cương Về Kim Loại", subjectId: 3 },
    { name: "Chương 6: Kim Loại Kiềm, Kim Loại Kiềm Thổ, Nhôm", subjectId: 3 },
    { name: "Chương 7: Sắt Và Một Số Kim Loại Quan Trọng", subjectId: 3 },
    { name: "Chương 8: Phân Biệt Một Số Chất Vô Cơ", subjectId: 3 },
    { name: "Chương 9: Hóa Học Và Vấn Đề Phát Triển Kinh Tế, Xã Hội, Môi Trường", subjectId: 3 },


    { name: "Chương 1: Dao Động Cơ", subjectId: 2 },
    { name: "Chương 2: Sóng Cơ Và Sóng Âm", subjectId: 2 },
    { name: "Chương 3: Dòng Điện Xoay Chiều", subjectId:  2},
    { name: "Chương 4: Dao Động Và Sóng Điện Từ", subjectId:  2},
    { name: "Chương 5: Sóng Ánh Sáng", subjectId:  2},
    { name: "Chương 6: Lượng Tử Ánh Sáng ", subjectId:  2},
    { name: "Chương 7: Hạt Nhân Nguyên Tử", subjectId:  2},
    { name: "Chương 8: Từ Vi Mô Đến Vĩ Mô ", subjectId:  2},


    { name: "Chương 1: Ứng Dụng Đạo Hàm Để Khảo Sát Và Vẽ Đồ Thị Của Hàm Số", subjectId: 1 },
    { name: "Chương 2: Hàm Số Lũy Thừa Hàm Số Mũ Và Hàm Số Lôgarit", subjectId: 1 },
    { name: "Chương 3: Nguyên Hàm - Tích Phân Và Ứng Dụng", subjectId:  1},
    { name: "Chương 4: Số Phức", subjectId:  1},
    { name: "Chương 5: Khối Đa Diện", subjectId:  1},
    { name: "Chương 6:  Mặt Nón, Mặt Trụ, Mặt Cầu ", subjectId:  1},
    { name: "Chương 7: Hạt Nhân Nguyên Tử", subjectId:  1},
    { name: "Chương 8: Phương Pháp Tọa Độ Trong Không Gian ", subjectId:  1},


    { name: "Chương 1: Cơ Chế Di Truyền Và Biến Dị", subjectId: 4 },
    { name: "Chương 2: Tính Quy Luật Của Hiện Tượng Di Truyền", subjectId: 4 },
    { name: "Chương 3: Di Truyền Học Quần Thể", subjectId:  4},
    { name: "Chương 4: Ứng Dụng Di Truyền Học", subjectId:  4},
    { name: "Chương 5: Di Truyền Học Người", subjectId:  4},
    { name: "Chương 6: Bằng Chứng Và Cơ Chế Tiến Hóa ", subjectId:  4},
    { name: "Chương 7: Sự Phát Sinh Và Phát Triển Của Sự Sống Trên Trái Đất", subjectId:  4},
    { name: "Chương 8: Cá Thể Và Quần Thể Sinh Vật ", subjectId:  4},
    { name: "Chương 9: Quần Xã Sinh Vật ", subjectId:  4},
    { name: "Chương 3: Hệ Sinh Thái, Sinh Quyển Và Bảo Vệ Môi Trường ", subjectId:  4},
  

    { name: "Chương 1: Sự Hình Thành Trật Tự Thế Giới Mới Sau Chiến Tranh Thế Giới Thứ Hai (1945 - 1949) ", subjectId: 7 },
    { name: "Chương 2: Liên Xô Và Các Nước Đông Âu (1945 - 1991). Liên Bang Nga (1991 - 2000)  ", subjectId:  7},
    { name: "Chương 3: Các Nước Á, Phi và Mĩ Latinh (1945 - 2000) ", subjectId:  7},
    { name: "Chương 4: Mĩ, Tây Âu, Nhật Bản (1945 - 2000) ", subjectId:  7},
    { name: "Chương 5: Quan Hệ Quốc Tế (1945 - 2000) ", subjectId:  7},
    { name: "Chương 6: Cách mạng khoa học - công nghệ và xu thế toàn cầu hoá  ", subjectId: 7},
    { name: "Chương 7: Việt Nam Từ Năm 1919 Đến Năm 1930 ", subjectId:  7},
    { name: "Chương 8:  Việt Nam Từ Năm 1930 Đến Năm 1945 ", subjectId: 7},
    { name: "Chương 9:  Việt Nam Từ Năm 1945 Đến Năm 1954 ", subjectId: 7},
    { name: "Chương 10:  Việt Nam Từ Năm 1954 Đến Năm 1975 ", subjectId: 7},
    { name: "Chương 11:   Việt Nam Từ Năm 1975 Đến Năm 2000 ", subjectId: 7},


    { name: "Chương 1:Địa Lý Việt Nam", subjectId: 8 },
    { name: " Chương 2:Vị Trí Địa Lí Và Lịch Sử Phát Triển Lãnh Thổ ", subjectId:  8},
    { name: "Chương 3: Đặc Điểm Chung Của Tự Nhiên ", subjectId:  8},
    { name: "Chương 4: Vấn Đề Sử Dụng Và Bảo Vệ Tự Nhiên", subjectId:  8},
    { name: "Chương 5: Địa Lí Dân Cư ", subjectId:  8},
    { name: " Chương 6: Địa Lý Kinh Tế ", subjectId: 8},
    { name: " Chương 7: Một Số Vấn Đề Phát Triển Và Phân Bố Nông Nghiệp", subjectId:  8},
    { name: "Chương 8: Một Số Vấn Đề Phát Triển Và Phân Bố Công Nghiệp", subjectId: 8},
    { name: "Chương 9: Điạ Lý Các Vùng Kinh Tế", subjectId: 8},
    { name: "Chương 10: Địa Lý Địa Phương ", subjectId: 8},


    { name: "Chương 1: Linh Kiện Điện Tử", subjectId: 9},
    { name: "Chương 2: Một Số Mạch Điện Tử Cơ Bản ", subjectId:  9},
    { name: "Chương 3: Một Số Mạch Điện Tử Điều Khiển Đơn Giản", subjectId:  9},
    { name: "Chương 4: Một Số Thiết Bị Điện Tử Dân Dụng", subjectId:  9},
    { name: "Chương 5: Mạch Điện Xoay Chiều Ba Pha ", subjectId:  9},
    { name: "Chương 6: Mạng Điện Sản Xuất Quy Mô Nhỏ", subjectId: 9},

    { name: "Chương 1: Khái Niệm Về Hệ Cơ Sở Dữ Liệu", subjectId: 10},
    { name: "Chương 2: Hệ Quản Trị Cơ Sở Dữ Liệu Microsoft Access ", subjectId:  10},
    { name: "Chương 3: Hệ Cơ Sở Dữ Liệu Quan Hệ", subjectId: 10 },
    { name: "Chương 4: Kiến Trúc Và Bảo Mật Các Hệ Cơ Sở Dữ Liệu", subjectId: 10 },
   

    { name: "Unit 1: Home life - Đời sống gia đình", subjectId: 5},
    { name: " Unit 2: Cultural Diversity - Sự đa dạng văn hóa ", subjectId:  5},
    { name: "Unit 3: Ways of Socialising - Phương thức giao tiếp xã hội", subjectId: 5 },
    { name: "Unit 4: School Education System - Hệ thống giáo dục", subjectId: 5 },
    { name: "Unit 5: Higher Education - Nền giáo dục bậc cao", subjectId: 5 },
    { name: "Unit 6: Future Jobs - Nghề nghiệp tương lai", subjectId: 5 },
    { name: "Unit 7: Economic Reforms - Sự cải cách kinh tế", subjectId: 5 },
    { name: "Unit 8: Life in the future - Cuộc sống trong tương lai", subjectId: 5 },
    { name: "Unit 9: Deserts - Sa mạc", subjectId: 5 },
    { name: "Unit 10: Endangered Species - Những loài đang gặp nguy hiểm", subjectId: 5 },
    { name: "Unit 11: Books - Các loại sách", subjectId: 5},
    { name: "Unit 12: Water Sports - Những môn thể thao dưới nước", subjectId: 5},
    { name: "Unit 13: The 22nd Sea Game - Sea Game lần thứ 22", subjectId: 5},
    { name: "Unit 14: International Organizations - Những tổ chức quốc tế", subjectId: 5},
    { name: "Unit 15: Women In Society - Người phụ nữ trong xã hội", subjectId: 5},
    { name: "Unit 16: The Association of Southeast Asian Nations - Hiệp hội các quốc gia Đông Nam Á", subjectId: 5},
    
   
   
  ]);
};

module.exports = categorySeeding;
