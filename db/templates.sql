-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 13, 2021 at 01:07 PM
-- Server version: 8.0.26
-- PHP Version: 7.2.24-0ubuntu0.18.04.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `templates`
--

-- --------------------------------------------------------

--
-- Table structure for table `emailTemplates`
--

CREATE TABLE `emailTemplates` (
  `id` int NOT NULL,
  `templateName` varchar(255) NOT NULL,
  `senderEmail` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `templateKey` varchar(255) NOT NULL,
  `content` text,
  `status` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `emailTemplates`
--

INSERT INTO `emailTemplates` (`id`, `templateName`, `senderEmail`, `subject`, `description`, `templateKey`, `content`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Email Verification Template', 'mohsin.nawaz@nxb.com.pk', 'Verify Email Address', '', '2', '<p style=\"text-align: center;\">\n<span style=\"color: #000000; font-size: 18pt;\"><em><strong><img src=\"https://img.icons8.com/windows/452/showing-small-size.png\" alt=\"DUMMYTEXT Logo\" width=\"300\" height=\"103\" />&nbsp;<br />Welcome [user.firstName]!</strong></em></span></p>\n<p style=\"text-align: center;\">For your records, your username is: <span style=\"color: #ed5627;\">[user.email]</span>.<br /><br /></p>\n<p style=\"text-align: center;\"><span style=\"color: #ffffff; background-color: #ed5627; font-size: 14pt;\">\n<a style=\"color: #ffffff; background-color: #ed5627;\"><strong>&nbsp; CODE: [user.emailToken]&nbsp;&nbsp;</strong></a></span></p>\n<p style=\"text-align: center;\">&nbsp;</p>\n<p style=\"text-align: center;\"><em><strong>Cheers from your DUMMYTEXT team!</strong></em></p>\n<p style=\"text-align: center;\">&nbsp;</p>\n<p style=\"text-align: center;\"><span style=\"font-size: 8pt; color: #7e8c8d;\">&copy;2020 DUMMYTEXT. All rights reserved.&nbsp; |&nbsp; Powered by Nextbridge</span></p>', 'active', '2021-07-26 13:58:39', '2021-07-26 13:58:39'),
(2, 'Reset Password', 'mohsin.nawaz@nxb.com.pk', 'Reset Password', '', '3', '<p style=\"text-align: center;\">\n<span style=\"color: #000000; font-size: 18pt;\"><em><strong><img src=\"https://img.icons8.com/windows/452/showing-small-size.png\" alt=\"DUMMYTEXT Logo\" width=\"300\" height=\"103\" />&nbsp;<br />Welcome [user.firstName]!</strong></em></span></p>\n<p style=\"text-align: center;\">For your records, your username is: <span style=\"color: #ed5627;\">[user.email]</span>.<br /><br /></p>\n<p style=\"text-align: center;\"><span style=\"color: #ffffff; background-color: #ed5627; font-size: 14pt;\">\n<a style=\"color: #ffffff;\" href=\"[user.resetToken]\"><strong>&nbsp; Click Here&nbsp;&nbsp;</strong></a></span></p>\n<p style=\"text-align: center;\">&nbsp;</p>\n<p style=\"text-align: center;\"><em><strong>Cheers from your DUMMYTEXT team!</strong></em></p>\n<p style=\"text-align: center;\">&nbsp;</p>\n<p style=\"text-align: center;\"><span style=\"font-size: 8pt; color: #7e8c8d;\">&copy;2020 DUMMYTEXT. All rights reserved.&nbsp; |&nbsp; Powered by Nextbridge</span></p>', 'active', '2021-07-26 13:58:39', '2021-07-26 13:58:39'),
(3, 'Reset Password OTP', 'mohsin.nawaz@nxb.com.pk', 'Reset Password OTP', '', '4', '<p style=\"text-align: center;\">\n<span style=\"color: #000000; font-size: 18pt;\"><em><strong><img src=\"https://img.icons8.com/windows/452/showing-small-size.png\" alt=\"DUMMYTEXT Logo\" width=\"300\" height=\"103\" />&nbsp;<br />Welcome [user.firstName]!</strong></em></span></p>\n<p style=\"text-align: center;\">For your records, your username is: <span style=\"color: #ed5627;\">[user.email]</span>.<br /><br /></p>\n<p style=\"text-align: center;\"><span style=\"color: #ffffff; background-color: #ed5627; font-size: 14pt;\">\n<a style=\"color: #ffffff; background-color: #ed5627;\"><strong>&nbsp; CODE: [user.resetToken]&nbsp;&nbsp;</strong></a></span></p>\n<p style=\"text-align: center;\">&nbsp;</p>\n<p style=\"text-align: center;\"><em><strong>Cheers from your DUMMYTEXT team!</strong></em></p>\n<p style=\"text-align: center;\">&nbsp;</p>\n<p style=\"text-align: center;\"><span style=\"font-size: 8pt; color: #7e8c8d;\">&copy;2020 DUMMYTEXT. All rights reserved.&nbsp; |&nbsp; Powered by Nextbridge</span></p>', 'active', '2021-07-26 13:58:39', '2021-07-26 13:58:39');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `emailTemplates`
--
ALTER TABLE `emailTemplates`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `emailTemplates`
--
ALTER TABLE `emailTemplates`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
