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
-- Database: `posts`
--

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `teaserText` varchar(255) DEFAULT NULL,
  `postType` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `attributes` json DEFAULT NULL,
  `accessRules` json DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `title`, `description`, `teaserText`, `postType`, `status`, `attributes`, `accessRules`, `createdAt`, `updatedAt`, `userId`) VALUES
(1, 'Updated Title', 'descript updated', '', 'text', 'published', '{\"tags\": [\"tag1\", \"tag2\", \"tag3\"], \"attachments\": []}', '{\"tiers\": [10, 9], \"whoCanSee\": \"tier\"}', '2021-08-10 12:07:01', '2021-08-10 13:05:28', 2),
(2, 'Updated Title', 'descript updated', '', 'text', 'published', '{\"tags\": [\"tag1\", \"tag2\", \"tag3\"], \"attachments\": []}', '{\"tiers\": [10, 9], \"whoCanSee\": \"tier\"}', '2021-08-10 12:08:10', '2021-08-10 13:04:52', 2),
(3, 'Udate Image Title', 'Update Description Image', '', 'image', 'published', '{\"tags\": [], \"images\": [\"2021-08-10T12:10:03.011Z-pexels-photo-674010.jpeg\", \"2021-08-10T13:07:39.716Z-watch-4.png\"], \"attachments\": [\"2021-08-10T12:10:03.014Z-BeFunky-design.png\", \"2021-08-10T13:07:39.715Z-Employee Performance Review Form.docx\"]}', '{\"tiers\": [6, 7, 8], \"whoCanSee\": \"tier\"}', '2021-08-10 12:10:03', '2021-08-10 13:07:39', 2),
(4, 'Updated Title of Audio', 'Updated Description of Audio', '', 'audio', 'published', '{\"tags\": [], \"audios\": [\"2021-08-10T12:11:39.999Z-Kalimba.mp3\", \"2021-08-10T13:09:54.411Z-Kalimba.mp3\"], \"attachments\": []}', '{\"tiers\": [8], \"whoCanSee\": \"tier\"}', '2021-08-10 12:11:40', '2021-08-10 13:09:54', 2),
(5, 'Updated Video Post Title', 'UIpdated Video Description', '', 'video', 'published', '{\"tags\": [], \"video\": [\"2021-08-10T13:02:27.993Z-SampleVideo_1280x720_1mb.mp4\", \"2021-08-10T13:10:53.778Z-SampleVideo_1280x720_1mb.mp4\", \"2021-08-10T13:13:25.626Z-SampleVideo_1280x720_1mb.mp4\", \"2021-08-10T13:13:28.326Z-SampleVideo_1280x720_1mb.mp4\"], \"attachments\": []}', '{\"whoCanSee\": \"free\"}', '2021-08-10 13:02:28', '2021-08-10 13:13:28', 2);

-- --------------------------------------------------------

--
-- Table structure for table `postTiers`
--

CREATE TABLE `postTiers` (
  `id` int NOT NULL,
  `postId` int NOT NULL,
  `tierId` int NOT NULL,
  `status` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `postTiers`
--

INSERT INTO `postTiers` (`id`, `postId`, `tierId`, `status`, `createdAt`, `updatedAt`) VALUES
(10, 5, 2, 'active', '2021-08-10 13:02:28', '2021-08-10 13:02:28'),
(11, 5, 8, 'active', '2021-08-10 13:02:28', '2021-08-10 13:02:28'),
(12, 2, 10, 'active', '2021-08-10 13:04:52', '2021-08-10 13:04:52'),
(13, 2, 9, 'active', '2021-08-10 13:04:52', '2021-08-10 13:04:52'),
(14, 1, 10, 'active', '2021-08-10 13:05:28', '2021-08-10 13:05:28'),
(15, 1, 9, 'active', '2021-08-10 13:05:28', '2021-08-10 13:05:28'),
(16, 3, 6, 'active', '2021-08-10 13:07:39', '2021-08-10 13:07:39'),
(17, 3, 7, 'active', '2021-08-10 13:07:39', '2021-08-10 13:07:39'),
(18, 3, 8, 'active', '2021-08-10 13:07:39', '2021-08-10 13:07:39'),
(19, 4, 8, 'active', '2021-08-10 13:09:54', '2021-08-10 13:09:54');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `postTiers`
--
ALTER TABLE `postTiers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `postId` (`postId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `postTiers`
--
ALTER TABLE `postTiers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `account`.`users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `postTiers`
--
ALTER TABLE `postTiers`
  ADD CONSTRAINT `postTiers_ibfk_1` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
