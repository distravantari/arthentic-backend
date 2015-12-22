-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Dec 22, 2015 at 06:27 AM
-- Server version: 5.6.20
-- PHP Version: 5.5.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `cafe`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE IF NOT EXISTS `customer` (
  `kodemember` int(10) NOT NULL,
  `nama` varchar(1000) NOT NULL,
  `alamat` varchar(1000) NOT NULL,
  `tanggal lahir` date NOT NULL,
  `startmember` date NOT NULL,
  `endmember` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`kodemember`, `nama`, `alamat`, `tanggal lahir`, `startmember`, `endmember`) VALUES
(1, 'irvan', 'bandung', '2015-12-12', '2015-12-12', '2015-12-14'),
(2, 'irvan', 'bandung', '2015-12-12', '2015-12-12', '2015-12-14');

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE IF NOT EXISTS `history` (
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

CREATE TABLE IF NOT EXISTS `laporanbulanan` (
  `bulan` int(10) NOT NULL,
  `tahun` int(10) NOT NULL,
  `totalpendapatan` decimal(65,0) NOT NULL,
  `persediaanawal` decimal(65,0) NOT NULL,
  `pembelian` decimal(65,0) NOT NULL,
  `tersediauntukdijual` decimal(65,0) NOT NULL,
  `persediaanakhir` decimal(65,0) NOT NULL,
  `hargapokokpenjualan` decimal(65,0) NOT NULL,
  `labakotor` decimal(65,0) NOT NULL,
  `totalbiayaoperasi` decimal(65,0) NOT NULL,
  `labaoperasi` decimal(65,0) NOT NULL,
  `biayabunga` decimal(65,0) NOT NULL,
  `labasebelumpajak` decimal(65,0) NOT NULL,
  `biayapajak` decimal(65,0) NOT NULL,
  `lababersih` decimal(65,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `laporanharian`
--

CREATE TABLE IF NOT EXISTS `laporanharian` (
  `date` date NOT NULL,
  `TotalPemasukkan` decimal(65,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `laporanharian`
--

INSERT INTO `laporanharian` (`date`, `TotalPemasukkan`) VALUES
('2015-12-12', '21600'),
('2015-12-12', '21600');

-- --------------------------------------------------------

--
-- Table structure for table `laporanmingguan`
--

CREATE TABLE IF NOT EXISTS `laporanmingguan` (
  `StartDate` date NOT NULL,
  `EndDate` date NOT NULL,
  `TotalPemasukkan` decimal(65,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE IF NOT EXISTS `menu` (
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
('001', 'kue', 'gula 2 kg, air 1 l', '20000', 1);

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE IF NOT EXISTS `order` (
  `nomerOrder` int(255) NOT NULL,
  `Id` int(10) NOT NULL,
  `Date` datetime NOT NULL,
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
(1, 1, '2015-12-12 00:00:00', 'kue', '2', '10', '2000', '3600'),
(1, 2, '2015-12-12 00:00:00', 'nasi', '2', '10', '10000', '18000'),
(1, 1, '2015-12-12 00:00:00', 'nasi', '2', '10', '10000', '18000');

-- --------------------------------------------------------

--
-- Table structure for table `pegawai`
--

CREATE TABLE IF NOT EXISTS `pegawai` (
  `nik` int(10) NOT NULL,
  `nama` varchar(1000) NOT NULL,
  `alamat` varchar(1000) NOT NULL,
  `jabatan` varchar(1000) NOT NULL,
  `tanggallahir` date NOT NULL,
  `gaji` decimal(65,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `stock`
--

CREATE TABLE IF NOT EXISTS `stock` (
  `id` varchar(10) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `jumlah` varchar(100) NOT NULL,
  `hargaTotal` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE IF NOT EXISTS `supplier` (
  `nis` int(10) NOT NULL,
  `nama` varchar(1000) NOT NULL,
  `alamat` varchar(1000) NOT NULL,
  `nomertelepon` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `supplier`
--

INSERT INTO `supplier` (`nis`, `nama`, `alamat`, `nomertelepon`) VALUES
(1, 'hahaha', 'abcd', '');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` varchar(100) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(1000) NOT NULL,
  `permission` varchar(10000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
