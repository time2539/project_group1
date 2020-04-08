-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 08, 2020 at 07:59 AM
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
  `accept_by` int(11) NOT NULL,
  `type_id` int(11) NOT NULL,
  `img_path` text NOT NULL,
  `status` varchar(1) NOT NULL,
  `detail` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `type`
--

CREATE TABLE `type` (
  `type_id` int(11) NOT NULL,
  `type_name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `type`
--

INSERT INTO `type` (`type_id`, `type_name`) VALUES
(1, 'เครื่องใช้ไฟฟ้า');

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
  `lastname` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `username`, `password`, `role`, `firstname`, `lastname`) VALUES
(2, 'admin', '$2b$10$EGH/lBpT6XLTyLY7jT.T8ezrMPz28FZG1F3JP80j.v.FSh4/7aRN2', 'admin', 'tanapat', 'apiwongngam'),
(3, 'user', '$2b$10$mBh0lU48rz5X70PSGLfrGu/cyrfL.fLVjn7ScIg.3fetATvZNtF0.', 'user', 'tanapatuser', 'apiwongngamuser'),
(4, 'time', '$2b$10$C7v6kBoWGsAF2TvQQYOb7uFaZ8BnFCVKR7YRmrxXMpR15z42ieOA2', 'admin', 'tana', 'eiei');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `maintenance_noti`
--
ALTER TABLE `maintenance_noti`
  ADD PRIMARY KEY (`maintenance_id`),
  ADD KEY `create_by` (`create_by`),
  ADD KEY `type_id` (`type_id`);

--
-- Indexes for table `type`
--
ALTER TABLE `type`
  ADD PRIMARY KEY (`type_id`);

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
  MODIFY `maintenance_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `type`
--
ALTER TABLE `type`
  MODIFY `type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `maintenance_noti`
--
ALTER TABLE `maintenance_noti`
  ADD CONSTRAINT `maintenance_noti_ibfk_1` FOREIGN KEY (`create_by`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `maintenance_noti_ibfk_2` FOREIGN KEY (`type_id`) REFERENCES `type` (`type_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
