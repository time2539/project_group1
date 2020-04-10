-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 10, 2020 at 04:22 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `maintain`
--

-- --------------------------------------------------------

--
-- Table structure for table `maintenance_noti`
--

CREATE TABLE `maintenance_noti` (
  `maintenance_id` int(11) NOT NULL,
  `create_by` int(11) NOT NULL,
  `accept_by` int(11) DEFAULT NULL,
  `accept_at` timestamp NULL DEFAULT current_timestamp(),
  `img_path` text NOT NULL,
  `status` varchar(1) NOT NULL,
  `detail` text NOT NULL,
  `typeManage` varchar(30) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `maintenance_noti`
--

INSERT INTO `maintenance_noti` (`maintenance_id`, `create_by`, `accept_by`, `accept_at`, `img_path`, `status`, `detail`, `typeManage`, `created_at`, `updated_at`) VALUES
(4, 3, NULL, '2020-04-08 09:45:02', '1586336411970cat-world.jpg', 'W', 'เปิดไม่ติด', '', '2020-04-08 09:00:12', '2020-04-08 09:00:12'),
(5, 3, 4, '2020-04-09 05:55:40', '', 'S', 'มีปัญหา', 'IT', '2020-04-09 05:55:40', '2020-04-09 05:55:40'),
(11, 3, NULL, '2020-04-10 01:55:22', '1586483722864museum.png', 'p', 'อผปแผปแ', 'Software', '2020-04-10 01:55:22', '2020-04-10 01:55:22');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` longtext NOT NULL,
  `role` varchar(10) NOT NULL,
  `firstname` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `address` varchar(100) DEFAULT NULL,
  `phone` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `username`, `password`, `role`, `firstname`, `lastname`, `address`, `phone`) VALUES
(2, 'admin', '$2b$10$EGH/lBpT6XLTyLY7jT.T8ezrMPz28FZG1F3JP80j.v.FSh4/7aRN2', 'admin', 'tanapat', 'apiwongngam', '', ''),
(3, 'user', '$2b$10$mBh0lU48rz5X70PSGLfrGu/cyrfL.fLVjn7ScIg.3fetATvZNtF0.', 'user', 'tanapatuser', 'apiwongngamuser', '', ''),
(4, 'time', '$2b$10$C7v6kBoWGsAF2TvQQYOb7uFaZ8BnFCVKR7YRmrxXMpR15z42ieOA2', 'admin', 'tana', 'eiei', '', ''),
(5, 'time28765', '$2b$10$2qleVzcHNSom4xj6eY6.oujIDT4JEp/te/hHgC1XbrhCA3KSe8Eou', 'admin', 'ธณภัทร ', 'อภิวงค์งาม', 'undefined', 'undefined'),
(6, 'time123', '$2b$10$9YPrmPvX7gvrNXjM9BivAews/qF.Ij15iq9l6uTXumxFwPWh8JCpq', 'admin', 'tana', 'eiei', 'undefined', 'undefined');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `maintenance_noti`
--
ALTER TABLE `maintenance_noti`
  ADD PRIMARY KEY (`maintenance_id`),
  ADD KEY `create_by` (`create_by`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `maintenance_noti`
--
ALTER TABLE `maintenance_noti`
  MODIFY `maintenance_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `maintenance_noti`
--
ALTER TABLE `maintenance_noti`
  ADD CONSTRAINT `maintenance_noti_ibfk_1` FOREIGN KEY (`create_by`) REFERENCES `user` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
