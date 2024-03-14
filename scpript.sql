-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: banhang
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `chitiethoadon`
--

DROP TABLE IF EXISTS `chitiethoadon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chitiethoadon` (
  `mahoadon` varchar(50) DEFAULT NULL,
  `masanpham` int DEFAULT NULL,
  `gia` double DEFAULT NULL,
  `soluong` int DEFAULT NULL,
  KEY `masanpham` (`masanpham`),
  KEY `mahoadon` (`mahoadon`),
  CONSTRAINT `chitiethoadon_ibfk_2` FOREIGN KEY (`masanpham`) REFERENCES `sanpham` (`masanpham`),
  CONSTRAINT `chitiethoadon_ibfk_3` FOREIGN KEY (`mahoadon`) REFERENCES `hoadon` (`mahoadon`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chitiethoadon`
--

LOCK TABLES `chitiethoadon` WRITE;
/*!40000 ALTER TABLE `chitiethoadon` DISABLE KEYS */;
INSERT INTO `chitiethoadon` VALUES ('WB10-255316874',1,40000,1),('WB10-255316874',3,160000,3),('WB10-255316874',2,160000,2),('WB10-255922264',9,200000,2),('WB10-255922264',3,160000,2);
/*!40000 ALTER TABLE `chitiethoadon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hinhanh`
--

DROP TABLE IF EXISTS `hinhanh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hinhanh` (
  `anh_id` int NOT NULL AUTO_INCREMENT,
  `url` varchar(255) DEFAULT NULL,
  `masanpham` int DEFAULT NULL,
  PRIMARY KEY (`anh_id`),
  KEY `masanpham` (`masanpham`),
  CONSTRAINT `hinhanh_ibfk_1` FOREIGN KEY (`masanpham`) REFERENCES `sanpham` (`masanpham`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hinhanh`
--

LOCK TABLES `hinhanh` WRITE;
/*!40000 ALTER TABLE `hinhanh` DISABLE KEYS */;
INSERT INTO `hinhanh` VALUES (1,'../asset/anh/chibi figure/24 1.jpg',1),(2,'../asset/anh/chibi figure/24 2.jpg',1),(3,'../asset/anh/chibi figure/24 3.jpg',1),(4,'../asset/anh/chibi figure/24 4.jpg',1),(5,'../asset/anh/chibi figure/24 4.jpg',2),(6,'../asset/anh/chibi figure/24 4.jpg',3),(7,'../asset/anh/chibi figure/24 4.jpg',4),(9,'../asset/anh/chibi figure/24 4.jpg',6),(10,'../asset/anh/chibi figure/24 4.jpg',7),(11,'../asset/anh/chibi figure/24 4.jpg',8),(12,'../asset/anh/chibi figure/24 4.jpg',9),(13,'../asset/anh/chibi figure/24 4.jpg',10),(14,'../asset/anh/chibi figure/24 1.jpg',5),(15,'../asset/anh/chibi figure/24 1.jpg',11),(16,'../asset/anh/chibi figure/24 1.jpg',12);
/*!40000 ALTER TABLE `hinhanh` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hoadon`
--

DROP TABLE IF EXISTS `hoadon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hoadon` (
  `mahoadon` varchar(50) NOT NULL,
  `trangthaihoadon` enum('Wating','Da Giao Hang','Da Huy') DEFAULT 'Wating',
  `ngaymua` date DEFAULT NULL,
  `tongtien` double DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`mahoadon`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `hoadon_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hoadon`
--

LOCK TABLES `hoadon` WRITE;
/*!40000 ALTER TABLE `hoadon` DISABLE KEYS */;
INSERT INTO `hoadon` VALUES ('WB10-255316874','Wating','2024-10-03',840000,1),('WB10-255922264','Wating','2024-10-03',720000,1);
/*!40000 ALTER TABLE `hoadon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sanpham`
--

DROP TABLE IF EXISTS `sanpham`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sanpham` (
  `masanpham` int NOT NULL AUTO_INCREMENT,
  `gia` double DEFAULT NULL,
  `soluong` int DEFAULT NULL,
  `theloai` varchar(5) DEFAULT NULL,
  `ten` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`masanpham`),
  KEY `theloai` (`theloai`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sanpham`
--

LOCK TABLES `sanpham` WRITE;
/*!40000 ALTER TABLE `sanpham` DISABLE KEYS */;
INSERT INTO `sanpham` VALUES (1,40000,10,'1','Mô hình: Super Saiya God Goku'),(2,160000,10,'1','Mô hình: Titan Thiết Giáp'),(3,160000,10,'1','Mô hình: Gray Fullbuster'),(4,180000,10,'1','Mô hình: Satoru Gojo'),(5,210000,10,'1','Mô hình: Huggy Wuggy'),(6,160000,10,'1','Mô hình: Komi không thể nói'),(7,420000,10,'1','Mô hình: SAO Kirito'),(8,520000,10,'1','Mô hình: Cloud Strife cầm kiếm'),(9,200000,10,'1','Mô hình: Thầy Aizawa chiến đấu'),(10,200000,10,'4','Cosplay: Unisex Demon Slayer Kimetsu no Yaiba'),(11,210000,10,'3','Bộ figure: DRAGONBALL SS SON GOKU DX'),(12,220000,10,'2','Chibi figure: TV Anime MASHLE Mash Burnedead');
/*!40000 ALTER TABLE `sanpham` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('active','inactive','delete') DEFAULT 'active',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `role` enum('nguoiban','nguoimua','admin','nguoiquanly') DEFAULT 'nguoimua',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin@gmail.com','admin','active','admin','123','admin');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-10 14:53:24
