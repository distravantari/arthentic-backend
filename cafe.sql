-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Dec 22, 2015 at 10:29 AM
-- Server version: 10.1.9-MariaDB
-- PHP Version: 5.6.15

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
  `tanggallahir` date NOT NULL,
  `startmember` date NOT NULL,
  `endmember` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`kodemember`, `nama`, `alamat`, `tanggallahir`, `startmember`, `endmember`) VALUES
(1, 'pembeli1', 'jl. babi1', '1994-05-29', '2015-12-21', '2016-12-21'),
(2, 'pembeli2', 'jl. babi2', '1994-06-27', '2015-12-23', '2016-12-23'),
(3, 'pembeli3', 'sadfasdf', '0000-00-00', '0000-00-00', '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `id` varchar(100) NOT NULL,
  `nama` varchar(1000) NOT NULL,
  `perubahan` mediumtext NOT NULL,
  `row` int(255) NOT NULL,
  `date` date NOT NULL
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
  `StartDate` date NOT NULL,
  `EndDate` date NOT NULL,
  `TotalPemasukkan` decimal(65,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `id` varchar(10) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `komposisi` varchar(1000) NOT NULL,
  `harga` varchar(100) NOT NULL,
  `kuantitas` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`id`, `nama`, `komposisi`, `harga`, `kuantitas`) VALUES
('MN1', 'Capuccino', 'gula, bubuk kopi,air', '20000', 50),
('MN2', 'Capuccino', 'gula, bubuk kopi,air', '20000', 50),
('MN3', 'Capuccino', 'gula, bubuk kopi,air', '20000', 50),
('MN4', 'Espresso', 'bubuk kopi,air', '20000', 50),
('MN5', 'Frapucinno', 'gula merah, bubuk kopi, air', '20000', 50);

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `nomerOrder` int(255) NOT NULL,
  `Id` varchar(10) NOT NULL,
  `Date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Pesanan` varchar(1000) NOT NULL,
  `Quantity` decimal(65,0) NOT NULL,
  `Diskon` decimal(65,0) NOT NULL,
  `HargaSatuan` decimal(65,0) NOT NULL,
  `HargaAkhir` decimal(65,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`nomerOrder`, `Id`, `Date`, `Pesanan`, `Quantity`, `Diskon`, `HargaSatuan`, `HargaAkhir`) VALUES
(1, 'MN1', '2015-12-22 15:41:45', 'Capuccino', '2', '10', '20000', '18000');

-- --------------------------------------------------------

--
-- Table structure for table `pegawai`
--

CREATE TABLE `pegawai` (
  `nik` int(10) NOT NULL,
  `nama` varchar(1000) NOT NULL,
  `alamat` varchar(1000) NOT NULL,
  `jabatan` varchar(1000) NOT NULL,
  `tanggallahir` date NOT NULL,
  `gaji` decimal(65,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pegawai`
--

INSERT INTO `pegawai` (`nik`, `nama`, `alamat`, `jabatan`, `tanggallahir`, `gaji`) VALUES
(1, 'irvan', 'nomaden', 'slave', '1994-12-19', '10000000'),
(2, 'renaldy', 'rumahrenaldy', 'ceo', '1994-06-27', '20000000'),
(3, 'renaldy2', 'rumahrenaldy2', 'ceo2', '1994-06-27', '20000000'),
(4, 'renaldy3', 'rumahrenaldy3', 'ceo3', '1994-06-27', '20000000'),
(5, 'renaldy4', 'rumah', 'ceo', '1994-12-12', '20000000');

-- --------------------------------------------------------

--
-- Table structure for table `stock`
--

CREATE TABLE `stock` (
  `id` varchar(10) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `jumlah` int(100) NOT NULL,
  `hargaTotal` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `stock`
--

INSERT INTO `stock` (`id`, `nama`, `jumlah`, `hargaTotal`) VALUES
('1', 'gula', 20, '2000'),
('2', 'gula merah', 11, '2000'),
('3', 'bubuk kopi', 20, '2000'),
('4', 'bubuk susu', 20, '2000');

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
(1, 'indofood', 'dagodag', '123124'),
(2, 'indoindoan', 'ogaddago', '134235'),
(3, 'indo', 'doasf', '1312');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` varchar(100) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(1000) NOT NULL,
  `permission` varchar(10000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `nama`, `password`, `role`, `permission`) VALUES
('', 'reg', '202cb962ac59075b964b07152d234b70', 'admin', '1100');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
