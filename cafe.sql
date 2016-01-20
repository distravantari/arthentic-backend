-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jan 20, 2016 at 07:34 AM
-- Server version: 10.1.9-MariaDB
-- PHP Version: 5.5.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cafe`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `kodemember` int(10) NOT NULL,
  `nama` varchar(1000) NOT NULL,
  `alamat` varchar(1000) NOT NULL,
  `tanggallahir` varchar(100) NOT NULL,
  `startmember` varchar(100) NOT NULL,
  `endmember` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`kodemember`, `nama`, `alamat`, `tanggallahir`, `startmember`, `endmember`) VALUES
(9809123, 'avi', 'pandan', '2012-12-12', '0000-00-00', '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `nama` varchar(1000) NOT NULL,
  `perubahan` mediumtext NOT NULL,
  `row` int(255) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`nama`, `perubahan`, `row`, `date`, `status`) VALUES
('sheny', 'stock', 1, '2016-01-16 05:58:18', 'insert'),
('sheny', 'stock', 1, '2016-01-16 05:58:38', 'update'),
('sheny', 'stock', 2, '2016-01-16 05:59:46', 'insert'),
('sheny', 'stock', 1, '2016-01-16 05:59:59', 'update'),
('sheny', 'stock', 1, '2016-01-16 06:00:11', 'update'),
('sheny', 'stock', 2, '2016-01-16 06:00:39', 'insert'),
('sheny', 'stock', 1, '2016-01-16 06:00:51', 'delete'),
('sheny', 'stock', 2, '2016-01-16 06:01:07', 'insert'),
('sheny', 'stock', 2, '2016-01-16 06:02:30', 'update'),
('sheny', 'stock', 3, '2016-01-16 06:08:27', 'insert'),
('sheny', 'stock', 4, '2016-01-16 06:09:07', 'insert'),
('sheny', 'stock', 5, '2016-01-16 06:09:46', 'insert'),
('sheny', 'stock', 6, '2016-01-16 06:10:46', 'insert'),
('sheny', 'stock', 5, '2016-01-16 06:12:25', 'update'),
('sheny', 'stock', 7, '2016-01-16 06:15:46', 'insert'),
('sheny', 'stock', 8, '2016-01-16 06:15:57', 'insert'),
('sheny', 'stock', 7, '2016-01-16 06:16:12', 'update'),
('sheny', 'stock', 8, '2016-01-16 06:18:58', 'delete'),
('sheny', 'stock', 8, '2016-01-16 06:19:23', 'insert'),
('sheny', 'stock', 9, '2016-01-16 06:20:37', 'insert'),
('sheny', 'stock', 8, '2016-01-16 06:20:45', 'update'),
('sheny', 'stock', 10, '2016-01-16 06:21:09', 'insert'),
('sheny', 'stock', 11, '2016-01-16 06:23:14', 'insert'),
('sheny', 'stock', 12, '2016-01-16 06:24:04', 'insert'),
('sheny', 'stock', 13, '2016-01-16 06:24:20', 'insert'),
('sheny', 'stock', 14, '2016-01-16 06:24:46', 'insert'),
('sheny', 'stock', 15, '2016-01-16 06:25:06', 'insert'),
('sheny', 'stock', 14, '2016-01-16 06:26:37', 'update'),
('sheny', 'stock', 12, '2016-01-16 06:27:42', 'update'),
('sheny', 'stock', 13, '2016-01-16 06:28:51', 'update'),
('sheny', 'stock', 15, '2016-01-16 06:29:06', 'update'),
('sheny', 'stock', 16, '2016-01-16 06:30:12', 'insert'),
('sheny', 'stock', 17, '2016-01-16 06:30:56', 'insert'),
('sheny', 'stock', 18, '2016-01-16 06:31:49', 'insert'),
('sheny', 'stock', 19, '2016-01-16 06:32:43', 'insert'),
('aviall', 'menu', 1, '2016-01-16 06:41:31', 'insert'),
('aviall', 'stock', 1, '2016-01-16 06:50:26', 'update'),
('aviall', 'stock', 12, '2016-01-16 06:50:39', 'update'),
('aviall', 'stock', 13, '2016-01-16 06:50:52', 'update'),
('aviall', 'stock', 14, '2016-01-16 06:51:01', 'update'),
('aviall', 'stock', 15, '2016-01-16 06:51:22', 'update'),
('distra', 'stock', 13, '2016-01-16 08:57:30', 'update'),
('distra', 'stock', 12, '2016-01-16 08:57:53', 'update'),
('distra', 'stock', 14, '2016-01-16 09:00:05', 'update'),
('distra', 'stock', 15, '2016-01-16 09:00:23', 'update'),
('distra', 'stock', 13, '2016-01-16 09:01:27', 'update'),
('distra', 'stock', 13, '2016-01-16 09:08:56', 'update'),
('distra', 'stock', 13, '2016-01-16 09:09:32', 'update'),
('distra', 'stock', 13, '2016-01-16 09:10:38', 'update'),
('distra', 'stock', 1, '2016-01-16 09:54:41', 'update'),
('distra', 'stock', 1, '2016-01-16 10:01:35', 'update'),
('distra', 'stock', 21, '2016-01-16 10:02:10', 'delete'),
('distra', 'stock', 20, '2016-01-16 10:02:14', 'delete'),
('distra', 'stock', 1, '2016-01-16 10:06:22', 'update'),
('distra', 'stock', 21, '2016-01-16 10:16:23', 'insert'),
('distra', 'stock', 21, '2016-01-16 10:16:34', 'update'),
('distra', 'stock', 21, '2016-01-16 10:18:15', 'update'),
('distra', 'stock', 20, '2016-01-16 10:18:27', 'update'),
('distra', 'stock', 20, '2016-01-16 10:18:44', 'update'),
('distra', 'stock', 20, '2016-01-16 10:18:55', 'update'),
('distra', 'stock', 20, '2016-01-16 10:18:59', 'update'),
('distra', 'stock', 20, '2016-01-16 10:19:08', 'update'),
('distra', 'stock', 21, '2016-01-16 10:19:13', 'update'),
('distra', 'stock', 21, '2016-01-16 10:19:48', 'update'),
('distra', 'stock', 20, '2016-01-16 10:23:02', 'update'),
('distra', 'stock', 20, '2016-01-16 10:24:43', 'update'),
('distra', 'stock', 20, '2016-01-16 10:25:12', 'update'),
('distra', 'stock', 20, '2016-01-16 10:25:15', 'update'),
('distra', 'stock', 1, '2016-01-16 11:15:13', 'update'),
('distra', 'stock', 1, '2016-01-16 11:15:28', 'update'),
('distra', 'stock', 20, '2016-01-16 11:20:02', 'update'),
('distra', 'stock', 20, '2016-01-16 11:20:18', 'update'),
('distra', 'stock', 21, '2016-01-16 11:21:14', 'update'),
('distra', 'stock', 21, '2016-01-16 11:21:21', 'update'),
('distra', 'stock', 2, '2016-01-16 11:47:21', 'update'),
('distra', 'stock', 3, '2016-01-16 11:47:31', 'update'),
('distra', 'stock', 3, '2016-01-16 11:47:39', 'update'),
('distra', 'stock', 4, '2016-01-16 11:47:44', 'update'),
('distra', 'stock', 5, '2016-01-16 11:47:54', 'update'),
('distra', 'stock', 6, '2016-01-16 11:48:01', 'update'),
('distra', 'stock', 7, '2016-01-16 11:48:09', 'update'),
('distra', 'stock', 8, '2016-01-16 11:48:30', 'update'),
('distra', 'stock', 10, '2016-01-16 11:48:44', 'update'),
('distra', 'stock', 9, '2016-01-16 11:48:57', 'update'),
('distra', 'stock', 11, '2016-01-16 11:49:05', 'update'),
('distra', 'stock', 12, '2016-01-16 11:49:11', 'update'),
('distra', 'stock', 13, '2016-01-16 11:49:23', 'update'),
('distra', 'stock', 14, '2016-01-16 11:49:38', 'update'),
('distra', 'stock', 15, '2016-01-16 11:49:57', 'update'),
('distra', 'stock', 16, '2016-01-16 11:50:13', 'update'),
('distra', 'stock', 17, '2016-01-16 11:50:25', 'update'),
('distra', 'stock', 18, '2016-01-16 11:50:34', 'update'),
('distra', 'stock', 19, '2016-01-16 11:50:44', 'update'),
('distra', 'stock', 21, '2016-01-16 11:51:13', 'update'),
('distra', 'stock', 2, '2016-01-16 11:51:29', 'update'),
('distra', 'stock', 3, '2016-01-16 11:52:45', 'update'),
('distra', 'stock', 4, '2016-01-16 11:52:52', 'update'),
('distra', 'stock', 3, '2016-01-16 11:53:02', 'update'),
('distra', 'stock', 4, '2016-01-16 11:53:14', 'update'),
('distra', 'stock', 4, '2016-01-16 11:53:22', 'update'),
('distra', 'stock', 5, '2016-01-16 11:53:38', 'update'),
('distra', 'stock', 6, '2016-01-16 11:53:49', 'update'),
('distra', 'stock', 6, '2016-01-16 11:54:14', 'update'),
('distra', 'stock', 6, '2016-01-16 11:54:27', 'update'),
('distra', 'stock', 7, '2016-01-16 11:54:44', 'update'),
('distra', 'stock', 1, '2016-01-16 11:54:51', 'update'),
('distra', 'stock', 8, '2016-01-16 11:54:57', 'update'),
('distra', 'stock', 9, '2016-01-16 11:55:02', 'update'),
('distra', 'stock', 10, '2016-01-16 11:55:17', 'update'),
('distra', 'stock', 11, '2016-01-16 11:55:25', 'update'),
('distra', 'stock', 12, '2016-01-16 11:55:33', 'update'),
('distra', 'stock', 21, '2016-01-16 11:55:43', 'update'),
('distra', 'stock', 21, '2016-01-16 11:56:25', 'delete'),
('distra', 'stock', 20, '2016-01-16 11:56:31', 'delete'),
('distra', 'stock', 1, '2016-01-16 11:57:11', 'update'),
('distra', 'stock', 1, '2016-01-16 11:57:20', 'update'),
('distra', 'stock', 1, '2016-01-16 11:57:23', 'update'),
('distra', 'stock', 1, '2016-01-16 11:57:42', 'update'),
('distra', 'expenses', 1, '2016-01-16 12:03:21', 'insert sewa mobil'),
('distra', 'stock', 1, '2016-01-16 12:21:46', 'update'),
('distra', 'employee', 1, '2016-01-16 13:39:08', 'insert'),
('distra', 'employee', 1, '2016-01-16 13:39:26', 'update'),
('distra', 'employee', 1, '2016-01-16 13:39:38', 'update'),
('distra', 'employee', 2, '2016-01-16 13:49:54', 'insert'),
('distra', 'employee', 2, '2016-01-16 13:50:09', 'update'),
('distra', 'employee', 3, '2016-01-16 13:50:48', 'insert'),
('distra', 'employee', 3, '2016-01-16 13:51:00', 'update'),
('distra', 'employee', 3, '2016-01-16 13:51:08', 'update'),
('distra', 'employee', 3, '2016-01-16 13:51:15', 'update'),
('distra', 'employee', 3, '2016-01-16 13:51:27', 'update'),
('distra', 'employee', 2, '2016-01-16 13:51:35', 'delete'),
('distra', 'employee', 2, '2016-01-16 13:51:55', 'insert'),
('distra', 'employee', 2, '2016-01-16 13:52:04', 'update'),
('distra', 'employee', 2, '2016-01-16 13:52:10', 'delete'),
('distra', 'member', 1, '2016-01-16 13:53:58', 'insert'),
('distra', 'member', 1, '2016-01-16 13:54:15', 'update'),
('distra', 'stock', 8, '2016-01-16 13:58:23', 'update'),
('distra', 'stock', 8, '2016-01-16 13:58:29', 'update'),
('avi', 'stock', 1, '2016-01-16 15:52:44', 'update'),
('avi', 'stock', 1, '2016-01-16 15:52:45', 'update'),
('sheny', 'expenses', 1, '2016-01-17 04:34:58', 'insert cleaning tools'),
('sheny', 'stock', 2, '2016-01-17 04:38:49', 'update'),
('sheny', 'stock', 2, '2016-01-17 04:38:56', 'update'),
('distra', 'stock', 1, '2016-01-17 04:49:45', 'update'),
('distra', 'stock', 1, '2016-01-17 04:49:47', 'update'),
('distra', 'stock', 1, '2016-01-17 04:50:51', 'update'),
('distra', 'menu', 1, '2016-01-17 04:51:01', 'update'),
('distra', 'stock', 1, '2016-01-17 04:52:02', 'update'),
('distra', 'menu', 2, '2016-01-17 04:53:12', 'insert'),
('distra', 'menu', 2, '2016-01-17 04:56:18', 'insert'),
('distra', 'menu', 1, '2016-01-17 04:56:30', 'update'),
('distra', 'menu', 2, '2016-01-17 04:57:39', 'insert'),
('distra', 'menu', 3, '2016-01-17 05:00:19', 'insert'),
('distra', 'menu', 1, '2016-01-17 05:01:16', 'update'),
('distra', 'menu', 2, '2016-01-17 05:01:26', 'update'),
('distra', 'menu', 1, '2016-01-17 05:04:02', 'update'),
('distra', 'menu', 2, '2016-01-17 05:04:09', 'update'),
('distra', 'menu', 3, '2016-01-17 05:04:50', 'insert'),
('distra', 'menu', 3, '2016-01-17 05:06:22', 'insert'),
('distra', 'menu', 3, '2016-01-17 05:07:49', 'insert'),
('distra', 'menu', 4, '2016-01-17 05:09:45', 'insert'),
('distra', 'menu', 1, '2016-01-17 05:13:55', 'delete'),
('distra', 'menu', 1, '2016-01-17 05:14:48', 'update'),
('distra', 'menu', 1, '2016-01-17 05:14:58', 'update'),
('distra', 'stock', 1, '2016-01-17 05:18:13', 'update'),
('distra', 'stock', 3, '2016-01-17 05:18:20', 'update'),
('distra', 'menu', 1, '2016-01-17 05:19:21', 'update'),
('distra', 'menu', 1, '2016-01-17 05:19:27', 'update'),
('distra', 'expenses', 1, '2016-01-17 05:20:36', 'insert espresso-production'),
('distra', 'menu', 2, '2016-01-17 07:15:33', 'update'),
('distra', 'menu', 2, '2016-01-17 07:16:05', 'update'),
('distra', 'supplier', 1, '2016-01-17 07:21:21', 'insert'),
('distra', 'supplier', 1, '2016-01-17 07:21:31', 'update'),
('distra', 'supplier', 2, '2016-01-17 07:21:50', 'insert'),
('sheny', 'stock', 1, '2016-01-17 15:22:04', 'update'),
('sheny', 'stock', 2, '2016-01-17 15:22:31', 'update'),
('sheny', 'stock', 3, '2016-01-17 15:22:53', 'update'),
('sheny', 'stock', 5, '2016-01-17 15:23:30', 'update'),
('sheny', 'stock', 7, '2016-01-17 15:23:45', 'update'),
('sheny', 'stock', 9, '2016-01-17 15:24:03', 'update'),
('sheny', 'stock', 10, '2016-01-17 15:25:06', 'update'),
('sheny', 'stock', 12, '2016-01-17 15:25:52', 'update'),
('sheny', 'stock', 13, '2016-01-17 15:26:04', 'update'),
('sheny', 'stock', 16, '2016-01-17 15:26:55', 'update'),
('sheny', 'stock', 17, '2016-01-17 15:27:13', 'update'),
('sheny', 'stock', 18, '2016-01-17 15:27:25', 'update'),
('sheny', 'stock', 19, '2016-01-17 15:27:35', 'update'),
('sheny', 'stock', 13, '2016-01-17 15:29:21', 'update'),
('sheny', 'stock', 14, '2016-01-17 15:29:29', 'update'),
('sheny', 'stock', 15, '2016-01-17 15:29:37', 'update'),
('sheny', 'stock', 19, '2016-01-17 15:30:41', 'insert'),
('sheny', 'stock', 20, '2016-01-17 15:34:30', 'insert'),
('sheny', 'stock', 11, '2016-01-17 15:34:50', 'update'),
('sheny', 'menu', 1, '2016-01-17 15:41:33', 'update'),
('sheny', 'menu', 1, '2016-01-17 15:42:38', 'update'),
('sheny', 'menu', 1, '2016-01-17 15:43:22', 'update'),
('sheny', 'menu', 1, '2016-01-17 15:43:59', 'update'),
('sheny', 'menu', 1, '2016-01-17 15:44:22', 'update'),
('sheny', 'menu', 2, '2016-01-17 15:45:57', 'update'),
('sheny', 'menu', 3, '2016-01-17 15:49:31', 'update'),
('sheny', 'menu', 2, '2016-01-17 15:49:52', 'update'),
('sheny', 'menu', 4, '2016-01-17 15:53:14', 'insert'),
('sheny', 'menu', 4, '2016-01-17 15:56:10', 'insert'),
('sheny', 'menu', 3, '2016-01-17 15:56:46', 'update'),
('sheny', 'menu', 5, '2016-01-17 16:00:40', 'insert'),
('sheny', 'menu', 6, '2016-01-17 16:02:01', 'insert'),
('sheny', 'menu', 7, '2016-01-17 16:04:14', 'insert'),
('sheny', 'menu', 8, '2016-01-17 17:20:38', 'insert'),
('sheny', 'menu', 9, '2016-01-17 17:24:20', 'insert'),
('sheny', 'menu', 7, '2016-01-17 17:24:28', 'update'),
('sheny', 'menu', 8, '2016-01-17 17:24:36', 'update'),
('sheny', 'menu', 5, '2016-01-17 17:25:13', 'update'),
('sheny', 'menu', 7, '2016-01-17 17:25:29', 'update'),
('sheny', 'menu', 10, '2016-01-17 17:26:48', 'insert'),
('sheny', 'menu', 11, '2016-01-17 17:27:47', 'insert'),
('sheny', 'menu', 12, '2016-01-17 17:28:36', 'insert'),
('sheny', 'stock', 20, '2016-01-17 17:40:43', 'update'),
('sheny', 'menu', 13, '2016-01-17 17:48:55', 'insert'),
('sheny', 'menu', 14, '2016-01-17 17:51:05', 'insert'),
('sheny', 'menu', 15, '2016-01-17 17:53:44', 'insert'),
('sheny', 'menu', 16, '2016-01-17 17:56:26', 'insert'),
('sheny', 'menu', 17, '2016-01-17 18:01:24', 'insert'),
('sheny', 'menu', 18, '2016-01-17 18:03:05', 'insert'),
('sheny', 'menu', 17, '2016-01-17 18:03:44', 'update'),
('sheny', 'menu', 19, '2016-01-17 18:14:05', 'insert'),
('sheny', 'menu', 20, '2016-01-17 18:14:58', 'insert'),
('sheny', 'menu', 21, '2016-01-17 18:18:07', 'insert'),
('sheny', 'menu', 22, '2016-01-17 18:18:47', 'insert'),
('distra', 'stock', 9, '2016-01-17 18:19:28', 'update'),
('sheny', 'stock', 21, '2016-01-17 23:28:27', 'insert'),
('sheny', 'stock', 22, '2016-01-17 23:29:00', 'insert'),
('sheny', 'stock', 23, '2016-01-17 23:30:05', 'insert'),
('sheny', 'stock', 24, '2016-01-17 23:30:43', 'insert'),
('sheny', 'stock', 21, '2016-01-17 23:30:56', 'update'),
('sheny', 'stock', 22, '2016-01-17 23:31:08', 'update'),
('sheny', 'stock', 23, '2016-01-17 23:31:30', 'update'),
('sheny', 'stock', 25, '2016-01-17 23:32:32', 'insert'),
('sheny', 'stock', 26, '2016-01-17 23:33:46', 'insert'),
('sheny', 'stock', 27, '2016-01-17 23:34:13', 'insert'),
('sheny', 'stock', 26, '2016-01-17 23:34:25', 'update'),
('sheny', 'stock', 28, '2016-01-17 23:35:02', 'insert'),
('sheny', 'stock', 29, '2016-01-17 23:35:49', 'insert'),
('sheny', 'stock', 23, '2016-01-17 23:39:02', 'update'),
('sheny', 'stock', 30, '2016-01-17 23:40:12', 'insert'),
('sheny', 'stock', 23, '2016-01-17 23:43:27', 'update'),
('sheny', 'stock', 30, '2016-01-17 23:43:48', 'insert'),
('sheny', 'menu', 23, '2016-01-17 23:47:48', 'insert'),
('sheny', 'menu', 24, '2016-01-17 23:49:48', 'insert'),
('sheny', 'menu', 25, '2016-01-17 23:50:44', 'delete'),
('sheny', 'menu', 24, '2016-01-17 23:50:54', 'update'),
('sheny', 'menu', 25, '2016-01-17 23:51:49', 'insert'),
('sheny', 'menu', 26, '2016-01-17 23:53:13', 'insert'),
('sheny', 'menu', 27, '2016-01-17 23:55:30', 'insert'),
('sheny', 'menu', 28, '2016-01-17 23:56:19', 'insert'),
('sheny', 'menu', 28, '2016-01-17 23:56:29', 'update'),
('sheny', 'menu', 29, '2016-01-17 23:57:36', 'insert'),
('sheny', 'menu', 30, '2016-01-17 23:58:09', 'insert'),
('sheny', 'menu', 31, '2016-01-17 23:58:42', 'insert'),
('sheny', 'menu', 30, '2016-01-17 23:58:49', 'update'),
('sheny', 'menu', 32, '2016-01-17 23:59:29', 'insert'),
('sheny', 'menu', 33, '2016-01-18 00:00:10', 'insert'),
('sheny', 'menu', 34, '2016-01-18 00:01:15', 'delete'),
('sheny', 'stock', 31, '2016-01-18 00:02:05', 'insert'),
('sheny', 'menu', 34, '2016-01-18 00:02:49', 'insert'),
('sheny', 'menu', 35, '2016-01-18 00:03:21', 'insert'),
('sheny', 'menu', 36, '2016-01-18 00:04:46', 'insert'),
('sheny', 'menu', 37, '2016-01-18 00:05:44', 'insert'),
('sheny', 'stock', 29, '2016-01-18 00:06:12', 'update'),
('sheny', 'menu', 36, '2016-01-18 00:17:53', 'update'),
('sheny', 'menu', 23, '2016-01-18 01:22:44', 'update'),
('sheny', 'menu', 24, '2016-01-18 01:22:56', 'update'),
('sheny', 'menu', 13, '2016-01-18 03:42:45', 'update'),
('sheny', 'menu', 4, '2016-01-18 03:43:54', 'update'),
('sheny', 'menu', 15, '2016-01-18 03:44:13', 'update'),
('sheny', 'menu', 17, '2016-01-18 03:44:36', 'update'),
('sheny', 'menu', 16, '2016-01-18 03:45:48', 'update'),
('sheny', 'menu', 18, '2016-01-18 03:49:39', 'update'),
('sheny', 'menu', 38, '2016-01-18 04:03:03', 'delete'),
('sheny', 'stock', 32, '2016-01-18 04:19:51', 'insert'),
('sheny', 'stock', 1, '2016-01-18 04:43:51', 'update');

-- --------------------------------------------------------

--
-- Table structure for table `invoice`
--

CREATE TABLE `invoice` (
  `id` int(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `kuantitas` varchar(100) NOT NULL,
  `totalSatuan` varchar(100) NOT NULL,
  `discount` int(100) NOT NULL,
  `hargaSatuan` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `laporanbulanan`
--

CREATE TABLE `laporanbulanan` (
  `date` date NOT NULL,
  `menu` varchar(1000) NOT NULL,
  `quantity` decimal(65,0) NOT NULL,
  `harga` decimal(65,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `laporanharian`
--

CREATE TABLE `laporanharian` (
  `date` date NOT NULL,
  `TotalPemasukkan` decimal(65,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `laporanmingguan`
--

CREATE TABLE `laporanmingguan` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `TotalPemasukkan` decimal(65,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `laporanmingguan`
--

INSERT INTO `laporanmingguan` (`id`, `date`, `TotalPemasukkan`) VALUES
(8, '2016-01-17', '41000'),
(9, '2016-01-17', '41000');

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `id` varchar(10) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `komposisi` varchar(1000) NOT NULL,
  `hargaProduksi` varchar(100) NOT NULL,
  `harga` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL DEFAULT 'ready',
  `reorder` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`id`, `nama`, `komposisi`, `hargaProduksi`, `harga`, `status`, `reorder`) VALUES
('mn2', 'Espresso', 'houseblend-bean 54', '8100', '16000', 'ready', ''),
('mn3', 'Hot Espresso Macchiato', 'houseblend-bean 54,diamond-milk 80', '9420', '20000', 'ready', ''),
('mn4', 'Hot Caffe Latte', 'houseblend-bean 54,diamond-milk 100,gula-sachet 2', '10070', '22000', 'ready', ''),
('mn5', 'Hot Cappuccino', 'houseblend-bean 54,diamond-milk 100,gula-sachet 2,chocolate-powder 10', '10400', '22000', 'ready', ''),
('mn6', 'Hot Espresso Con Panna', 'houseblend-bean 54,diamond-milk 80,gula-sachet 2,whipped cream  20', '12997', '25000', 'ready', ''),
('mn7', 'Hot Americano', 'houseblend-bean 54', '8100', '16000', 'ready', ''),
('mn8', 'Hot Mochaccino', 'houseblend-bean 54,diamond-milk 80,choco-cream 4,gula-sachet 2', '10061', '22000', 'ready', ''),
('mn9', 'Hot Flat White', 'houseblend-bean 54,diamond-milk 80', '9420', '20000', 'ready', ''),
('mn10', 'Hot Hazelnut Latte', 'houseblend-bean 54,diamond-milk 100,hazelnut-syrup 30', '16363', '29000', 'ready', ''),
('mn11', 'Hot Caramel Latte', 'houseblend-bean 54,diamond-milk 100,caramel-syrup 30', '16363', '29000', 'ready', ''),
('mn12', 'Hot Vanilla Latte', 'houseblend-bean 54,diamond-milk 100,vanilla-syrup 30', '16363', '29000', 'ready', ''),
('mn13', 'Hot Tiramisu Latte', 'houseblend-bean 54,diamond-milk 100,tiramisu-syrup 30', '16363', '29000', 'ready', ''),
('mn14', 'Iced Espresso Macchiato', 'houseblend-bean 81,diamond-milk 120,gula-cair 30,es-kristal 420', '15414', '28000', 'ready', ''),
('mn15', 'Iced Caffe Latte', 'houseblend-bean 81,diamond-milk 150,gula-car 30,es-kristal 420', '15909', '32000', 'ready', ''),
('mn16', 'Iced Cappuccino', 'houseblend-bean 81,diamond-milk 150,gula-cair 30,es-kristal 420,chocolate-powder 10', '16229', '30000', 'ready', ''),
('mn17', 'Iced Espresso Con Panna', 'houseblend-bean 81,diamond-milk 120,gula-cair 30,whipped cream  20', '18671', '33000', 'ready', ''),
('mn18', 'Iced Mochaccino', 'houseblend-bean 81,diamond-milk 120,choco-cream 8,gula-cair 30,es-kristal 420', '16377', '30000', 'ready', ''),
('mn19', 'Iced Flat White', 'houseblend-bean 81,diamond-milk 120,gula-cair 30,es-kristal 420', '15414', '28000', 'ready', ''),
('mn20', 'Iced Hazelnut Latte', 'houseblend-bean 81,diamond-milk 150,hazelnut-syrup 30,gula-cair 45,es-kristal 420', '22867', '36000', 'ready', ''),
('mn21', 'Iced Caramel Latte', 'houseblend-bean 81,diamond-milk 150,caramel-syrup 30,gula-cair 45,es-kristal 420', '22867', '36000', 'ready', ''),
('mn22', 'Iced Vanilla Latte', 'houseblend-bean 81,diamond-milk 150,vanilla-syrup 30,gula-cair 45,es-kristal 420', '22867', '36000', 'ready', ''),
('mn23', 'Iced Tiramisu Latte', 'houseblend-bean 81,diamond-milk 150,tiramisu-syrup 30,gula-cair 45,es-kristal 420', '22867', '36000', 'ready', ''),
('mn24', 'Greentea Tiramisu Torte Cake', 'greentea-cake 1', '16666', '23000', 'ready', ''),
('mn25', 'Triple Chocolate Cake', 'cheese-cake 1', '20000', '25000', 'ready', ''),
('mn26', 'Cookiela', 'cookies 1', '10000', '15000', 'ready', ''),
('mn27', 'Klappertaart', 'klapertaart 1', '8500', '15000', 'ready', ''),
('mn28', 'Panacotta', 'pannacotta 1', '19000', '27000', 'ready', ''),
('mn29', 'Greentea Pudding', 'greentea-pudding 1', '6000', '12000', 'ready', ''),
('mn30', 'Greentea Pudding (Take away)', 'greentea-pudding 1', '12000', '15000', 'ready', ''),
('mn31', 'Taro Pudding', 'taro-pudding 1', '6000', '12000', 'ready', ''),
('mn32', 'Taro Pudding (Take away)', 'taro-pudding 1', '12000', '15000', 'ready', ''),
('mn33', 'Mango Pudding', 'mango-pudding 1', '6000', '12000', 'ready', ''),
('mn34', 'Mango Pudding (Take Away)', 'mango-pudding 1', '12000', '15000', 'ready', ''),
('mn35', 'Caramel Pudding', 'caramel-pudding 1', '6000', '12000', 'ready', ''),
('mn36', 'Caramel Pudding (Take Away)', 'caramel-pudding 1', '12000', '15000', 'ready', ''),
('mn37', 'Mac N Cheese', 'macncheese 1', '23000', '32000', 'ready', ''),
('mn38', 'Cinnamon Rolls', 'cinroll 1', '9000', '15000', 'ready', '');

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `nomerOrder` int(255) NOT NULL,
  `Id` varchar(10) NOT NULL,
  `Date` date NOT NULL,
  `Pesanan` varchar(1000) NOT NULL,
  `Quantity` decimal(65,0) NOT NULL,
  `Diskon` decimal(65,0) NOT NULL,
  `HargaSatuan` decimal(65,0) NOT NULL,
  `hargaProduksi` decimal(65,0) NOT NULL,
  `HargaAkhir` decimal(65,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`nomerOrder`, `Id`, `Date`, `Pesanan`, `Quantity`, `Diskon`, `HargaSatuan`, `hargaProduksi`, `HargaAkhir`) VALUES
(2, 'mn2', '2016-01-17', 'espresso', '2', '10', '25000', '20000', '25000'),
(1, 'mn3', '2016-01-17', 'picollo', '2', '10', '20000', '20000', '16000'),
(3, '1', '2016-01-19', 'kue', '2', '10', '2000', '0', '3600');

-- --------------------------------------------------------

--
-- Table structure for table `pegawai`
--

CREATE TABLE `pegawai` (
  `nik` int(10) NOT NULL,
  `nama` varchar(1000) NOT NULL,
  `alamat` varchar(1000) NOT NULL,
  `jabatan` varchar(1000) NOT NULL,
  `tanggallahir` varchar(100) NOT NULL,
  `gaji` decimal(65,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pegawai`
--

INSERT INTO `pegawai` (`nik`, `nama`, `alamat`, `jabatan`, `tanggallahir`, `gaji`) VALUES
(1293698159, 'gkfasdf', '8689kjgdfkjf', '082igdlkg', '2012-20-120000', '9070');

-- --------------------------------------------------------

--
-- Table structure for table `pengeluaran`
--

CREATE TABLE `pengeluaran` (
  `bulan` varchar(10) NOT NULL,
  `tahun` varchar(10) NOT NULL,
  `namaPengeluaran` varchar(100) NOT NULL,
  `jumlah` decimal(65,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pengeluaran`
--

INSERT INTO `pengeluaran` (`bulan`, `tahun`, `namaPengeluaran`, `jumlah`) VALUES
('01', '2016', 'sewa mobil', '1000000'),
('01', '2016', 'cleaning tools', '100000'),
('01', '2016', 'espresso-production', '100000');

-- --------------------------------------------------------

--
-- Table structure for table `setting`
--

CREATE TABLE `setting` (
  `tax` int(11) NOT NULL,
  `services` int(11) NOT NULL,
  `pajakPendapatan` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `setting`
--

INSERT INTO `setting` (`tax`, `services`, `pajakPendapatan`) VALUES
(0, 5, 0);

-- --------------------------------------------------------

--
-- Table structure for table `stock`
--

CREATE TABLE `stock` (
  `id` varchar(10) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `jumlah` int(100) NOT NULL,
  `satuan` varchar(100) NOT NULL,
  `hargaTotal` decimal(10,0) NOT NULL,
  `status` varchar(100) NOT NULL DEFAULT 'ready',
  `reorder` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `stock`
--

INSERT INTO `stock` (`id`, `nama`, `jumlah`, `satuan`, `hargaTotal`, `status`, `reorder`) VALUES
('1', 'diamond-milk', 3000, 'ml', '50100', 'ready', '2000'),
('2', 'gayo-bean', 1000, 'gr', '234000', 'empty', '500'),
('3', 'gula-cair', 5000, 'gr', '95000', 'ready', '2000'),
('4', 'gula-sachet', 2000, 'pcs', '40000', 'ready', '100'),
('5', 'whipped-cream', 750, 'ml', '171000', 'ready', '350'),
('6', 'regal', 250, 'pcs', '8000', 'ready', '100'),
('7', 'lipton-tea', 200, 'ml', '38500', 'ready', '30'),
('8', 'thai-tea', 400, 'ml', '46500', 'empty', '800'),
('9', 'choco-cream', 2500, 'gr', '200500', 'ready', '500'),
('10', 'chocolate-powder', 500, 'gr', '16500', 'ready', '200'),
('11', 'lychee', 1200, 'ml', '47000', 'ready', '600'),
('12', 'tiramisu-syrup', 1400, 'ml', '310000', 'ready', '350'),
('13', 'caramel-syrup', 2800, 'ml', '620000', 'empty', '350'),
('14', 'vanilla-syrup', 2100, 'ml', '465000', 'ready', '350'),
('15', 'hazelnut-syrup', 2100, 'ml', '465000', 'ready', '350'),
('16', 'houseblend-bean', 4000, 'gr', '600000', 'ready', '1000'),
('17', 'mandheling-toba-bean', 1000, 'gr', '234000', 'ready', '300'),
('18', 'sans-bean', 1000, 'gr', '145000', 'ready', '300'),
('19', 'bali-kintamani-bean', 1000, 'gr', '234000', 'ready', '300'),
('20', 'es-kristal', 10000, 'gr', '17000', 'ready', '500'),
('21', 'greentea-cake', 12, 'pcs', '200000', 'ready', '3'),
('22', 'cheese-cake', 10, 'pcs', '200000', 'ready', '3'),
('23', 'cookies', 13, 'pcs', '130000', 'ready', '3'),
('24', 'klapertaart', 10, 'pcs', '85000', 'ready', '2'),
('25', 'pannacotta', 4, 'pcs`', '76000', 'ready', '1'),
('27', 'greentea-pudding', 3, 'pcs', '18000', 'ready', '2'),
('28', 'taro-pudding', 3, 'pcs', '18000', 'ready', '2'),
('29', 'mango-pudding', 3, 'pcs', '18000', 'ready', '2'),
('30', 'macncheese', 3, 'pcs', '69000', 'ready', '2'),
('31', 'cinroll', 12, 'pcs', '108000', 'ready', '2'),
('32', 'caramel-pudding', 3, 'pcs', '18000', 'ready', '2'),
('33', 'arrozconleche', 5000, 'gr', '200000', 'ready', '100');

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `nis` int(10) NOT NULL,
  `nama` varchar(1000) NOT NULL,
  `alamat` varchar(1000) NOT NULL,
  `nomertelepon` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `supplier`
--

INSERT INTO `supplier` (`nis`, `nama`, `alamat`, `nomertelepon`) VALUES
(2147483647, 'test', 'test', '081221520071'),
(9864859, 'ini test', 'testing 123', '072085340960385');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` varchar(100) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(1000) NOT NULL,
  `permission` varchar(10000) NOT NULL,
  `status` varchar(100) NOT NULL DEFAULT 'offline'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `nama`, `password`, `role`, `permission`, `status`) VALUES
('', 'sheny', 'b212338060c4490fd0d46eec6e2db11c', 'owner', '111111111111', 'online'),
('', 'aviall', '16f81dfdacd44a3498d03bdd329b5d1a', 'owner', '11111111154', 'offline'),
('', 'distra', '67ed142ebbd1d285daa82aa0f21e4b5b', 'CEO', '11111111111111111111', 'offline'),
('', 'asdasd', 'a8f5f167f44f4964e6c998dee827110c', 'asdasd', 'asdasd', 'offline'),
('', 'asdad', 'fa1b865d9280d4a488afa30fd60216e7', 'asdasd', 'asdasd', 'offline');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `laporanmingguan`
--
ALTER TABLE `laporanmingguan`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `invoice`
--
ALTER TABLE `invoice`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `laporanmingguan`
--
ALTER TABLE `laporanmingguan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
