-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 25 Des 2015 pada 10.38
-- Versi Server: 5.6.20
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
-- Struktur dari tabel `customer`
--

CREATE TABLE IF NOT EXISTS `customer` (
  `kodemember` int(10) NOT NULL,
  `nama` varchar(1000) NOT NULL,
  `alamat` varchar(1000) NOT NULL,
  `tanggallahir` date NOT NULL,
  `startmember` date NOT NULL,
  `endmember` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `customer`
--

INSERT INTO `customer` (`kodemember`, `nama`, `alamat`, `tanggallahir`, `startmember`, `endmember`) VALUES
(1, 'pembeli1', 'jl. babi1', '1994-05-29', '2015-12-21', '2016-12-21'),
(2, 'pembeli2', 'jl. babi2', '1994-06-27', '2015-12-23', '2016-12-23'),
(3, 'pembeli3', 'sadfasdad', '0000-00-00', '0000-00-00', '0000-00-00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `history`
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
-- Struktur dari tabel `laporanbulanan`
--

CREATE TABLE IF NOT EXISTS `laporanbulanan` (
  `date` date NOT NULL,
  `menu` varchar(1000) NOT NULL,
  `quantity` decimal(65,0) NOT NULL,
  `harga` decimal(65,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `laporanharian`
--

CREATE TABLE IF NOT EXISTS `laporanharian` (
  `date` date NOT NULL,
  `TotalPemasukkan` decimal(65,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `laporanharian`
--

INSERT INTO `laporanharian` (`date`, `TotalPemasukkan`) VALUES
('2015-12-23', '100000000');

-- --------------------------------------------------------

--
-- Struktur dari tabel `laporanmingguan`
--

CREATE TABLE IF NOT EXISTS `laporanmingguan` (
  `StartDate` date NOT NULL,
  `EndDate` date NOT NULL,
  `TotalPemasukkan` decimal(65,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `laporanmingguan`
--

INSERT INTO `laporanmingguan` (`StartDate`, `EndDate`, `TotalPemasukkan`) VALUES
('2015-12-25', '2015-12-31', '276451785'),
('2015-12-25', '2015-12-31', '10000'),
('2015-12-25', '2015-12-31', '10000');

-- --------------------------------------------------------

--
-- Struktur dari tabel `menu`
--

CREATE TABLE IF NOT EXISTS `menu` (
  `id` varchar(10) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `komposisi` varchar(1000) NOT NULL,
  `harga` varchar(100) NOT NULL,
  `kuantitas` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `menu`
--

INSERT INTO `menu` (`id`, `nama`, `komposisi`, `harga`, `kuantitas`) VALUES
('MN2', 'Capuccino', 'gula, bubuk kopi,air', '20000', 50),
('MN4', 'Espresso', 'bubuk kopi,air', '20008', 50),
('MN5', 'bread', 'terigu', '40000', 90),
('MN9', 'asdadasd', 'hhahah', '80090', 80),
('MN10', 'test', 'test', '900000', 80),
('MN11', 'choco', 'cheese', '90000', 1000),
('MN12', 'asda', '123', '123', 123);

-- --------------------------------------------------------

--
-- Struktur dari tabel `order`
--

CREATE TABLE IF NOT EXISTS `order` (
  `nomerOrder` int(255) NOT NULL,
  `Id` varchar(10) NOT NULL,
  `Date` date NOT NULL,
  `Pesanan` varchar(1000) NOT NULL,
  `Quantity` decimal(65,0) NOT NULL,
  `Diskon` decimal(65,0) NOT NULL,
  `HargaSatuan` decimal(65,0) NOT NULL,
  `HargaAkhir` decimal(65,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `order`
--

INSERT INTO `order` (`nomerOrder`, `Id`, `Date`, `Pesanan`, `Quantity`, `Diskon`, `HargaSatuan`, `HargaAkhir`) VALUES
(2, 'MN2', '2015-12-23', 'Capuccino', '1', '0', '20000', '20000'),
(1, 'MN1', '2015-12-23', 'Capuccino', '1', '0', '20000', '20000'),
(2, 'MN2', '2015-12-23', 'Capuccino', '1', '10', '20000', '18000'),
(12, 'MN9', '2015-12-31', '', '0', '0', '0', '0'),
(12, 'MN9', '2015-12-31', '', '0', '0', '0', '0'),
(1, 'MN11', '2015-12-25', 'choco', '100', '10', '90000', '8100000'),
(1, 'MN11', '2015-12-25', 'choco', '100', '10', '90000', '8100000'),
(2, 'mn11', '2015-12-25', 'choco', '9000', '79', '90000', '170100000'),
(2, 'mn11', '2015-12-25', 'choco', '1001', '1', '90000', '89189100'),
(1, 'mn12', '2015-12-25', 'asda', '100', '12', '123', '10824'),
(1, 'mn11', '2015-12-25', 'choco', '12', '12', '90000', '950400'),
(1, 'mn12', '2015-12-25', 'asda', '12', '1', '123', '1461');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pegawai`
--

CREATE TABLE IF NOT EXISTS `pegawai` (
  `nik` int(10) NOT NULL,
  `nama` varchar(1000) NOT NULL,
  `alamat` varchar(1000) NOT NULL,
  `jabatan` varchar(1000) NOT NULL,
  `tanggallahir` date NOT NULL,
  `gaji` decimal(65,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `pegawai`
--

INSERT INTO `pegawai` (`nik`, `nama`, `alamat`, `jabatan`, `tanggallahir`, `gaji`) VALUES
(1, 'irvan', 'nomaden', 'slave', '1994-12-19', '10000000'),
(2, 'renaldy', 'rumahrenaldy', 'pimp', '1994-06-26', '20000000'),
(3, 'renaldy2', 'rumahrenaldy2', 'ceo2', '1994-06-27', '20000000'),
(4, 'renaldy3', 'rumahrenaldy3', 'ceo3', '1994-06-27', '20000000'),
(5, 'renaldy4', 'rumah', 'ceo', '1994-12-12', '20000000'),
(7, 'kan', 'kan', 'akn', '1997-12-12', '80000000');

-- --------------------------------------------------------

--
-- Struktur dari tabel `setting`
--

CREATE TABLE IF NOT EXISTS `setting` (
  `tax` int(11) NOT NULL,
  `services` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `setting`
--

INSERT INTO `setting` (`tax`, `services`) VALUES
(10, 5);

-- --------------------------------------------------------

--
-- Struktur dari tabel `stock`
--

CREATE TABLE IF NOT EXISTS `stock` (
  `id` varchar(10) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `jumlah` int(100) NOT NULL,
  `hargaTotal` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `stock`
--

INSERT INTO `stock` (`id`, `nama`, `jumlah`, `hargaTotal`) VALUES
('1', 'gula', 20, '2000'),
('2', 'gula merah', 11, '2000'),
('3', 'bubuk kopi', 20, '20000'),
('4', 'bubuk susu,keju', 20, '2000'),
('', '', 0, '0');

-- --------------------------------------------------------

--
-- Struktur dari tabel `supplier`
--

CREATE TABLE IF NOT EXISTS `supplier` (
  `nis` int(10) NOT NULL,
  `nama` varchar(1000) NOT NULL,
  `alamat` varchar(1000) NOT NULL,
  `nomertelepon` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `supplier`
--

INSERT INTO `supplier` (`nis`, `nama`, `alamat`, `nomertelepon`) VALUES
(1, 'indofood', 'dagodag0', '123124'),
(2, 'indoindoan', 'ogaddago', '134235'),
(3, 'indo', 'doasf', '1312');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` varchar(100) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(1000) NOT NULL,
  `permission` varchar(10000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id`, `nama`, `password`, `role`, `permission`) VALUES
('', 'reg', '202cb962ac59075b964b07152d234b70', 'admin', '1100'),
('', 'req', '202cb962ac59075b964b07152d234b70', '1110', '1110');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
