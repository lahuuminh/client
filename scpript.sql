CREATE TABLE USERS(
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    username VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    status ENUM('active','inactive','delete') default 'active',
    password varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    phone varchar(15),
    role enum(' nguoiban ',' nguoimua ',' admin ',' nguoiquanly') default 'nguoimua'
);
CREATE TABLE hoadon(
     mahoadon INT AUTO_INCREMENT PRIMARY KEY,
    trangthaihoadon ENUM(' Wating ',' Da Giao Hang ',' Da Huy ') default 'Ưating',
    ngaymua date ,
    tongtien double,
    user_id int,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
create table sanpham(
    masanpham INT AUTO_INCREMENT PRIMARY KEY,
    gia double,
    soluong int,
    int theloai,
    FOREIGN KEY (theloai) REFERENCES theloai(id),
    ten varchar(255)   CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
);
CREATE table chitiethoadon(
        mahoadon int,
        masanpham int,
        gia double,
        soluong int,
     FOREIGN KEY (mahoadon) REFERENCES hoadon(mahoadon),
     FOREIGN KEY (masanpham) REFERENCES sanpham(masanpham)
        );
create table hinhanh(
    anh_id INT AUTO_INCREMENT PRIMARY KEY,
    url varchar(255),
    int masanpham,
     FOREIGN KEY (masanpham) REFERENCES sanpham(masanpham)
);
create table theloai(
     id INT AUTO_INCREMENT PRIMARY KEY,
     ten VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
     mota VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
);