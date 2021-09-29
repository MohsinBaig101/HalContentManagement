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
-- Database: `account`
--

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `slug`, `createdAt`, `updatedAt`) VALUES
(1, 'Admin', 'admin', '2021-07-27 08:59:09', '2021-07-27 08:59:09'),
(2, 'Creator', 'creator', '2021-07-27 08:59:09', '2021-07-27 08:59:09');

-- --------------------------------------------------------

--
-- Table structure for table `tiers_subscriptions`
--

CREATE TABLE `tiers_subscriptions` (
  `tierId` int NOT NULL,
  `userId` int NOT NULL,
  `status` enum('active','inActive') DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tiers_subscriptions`
--

INSERT INTO `tiers_subscriptions` (`tierId`, `userId`, `status`, `createdAt`, `updatedAt`) VALUES
(11, 6, 'active', '2021-08-11 12:44:26', '2021-08-11 12:44:26');

-- --------------------------------------------------------

--
-- Table structure for table `userDetails`
--

CREATE TABLE `userDetails` (
  `id` int NOT NULL,
  `nameForFan` varchar(255) DEFAULT NULL,
  `creationName` varchar(255) DEFAULT NULL,
  `soundMoreAccurate` varchar(255) DEFAULT NULL,
  `coverPhoto` varchar(255) DEFAULT NULL,
  `pageURL` varchar(255) DEFAULT NULL,
  `about` text,
  `introVideo` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userDetails`
--

INSERT INTO `userDetails` (`id`, `nameForFan`, `creationName`, `soundMoreAccurate`, `coverPhoto`, `pageURL`, `about`, `introVideo`, `createdAt`, `updatedAt`, `UserId`) VALUES
(1, 'string', 'string', 'string', '2021-08-05T13:49:24.299Z-af8d63a477078732b79ff9d9fc60873f.jpg', 'string', 'string', '2021-08-05T14:13:15.175Z-SampleVideo_1280x720_1mb.mp4', '2021-08-05 13:49:24', '2021-08-05 14:23:18', 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `profilePic` varchar(255) DEFAULT NULL,
  `emailVerified` tinyint(1) DEFAULT '0',
  `emailToken` varchar(255) DEFAULT NULL,
  `resetToken` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `role` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`, `phone`, `profilePic`, `emailVerified`, `emailToken`, `resetToken`, `status`, `role`, `createdAt`, `updatedAt`) VALUES
(2, 'Mohsin Baig', 'Nawaz Baig', 'mbaigarid@gmail.com', '$2b$10$vGShMoYmpubqq4Z4Yv0UX.K4kRwnLJUHfanWxBqD22FInR7fAQHU2', '11223344', 'http://localhost:9001/files/2021-08-03T16:17:20.090Z-photo-1524492412937-b28074a5d7da.jpeg', 1, 'jBoVHe', 'X4dE3y', 'active', 2, '2021-08-03 15:32:47', '2021-08-11 09:50:55'),
(6, 'Mohsin', 'Nawaz Baig', 'mohsinbaig7867861@gmail.com', '$2b$10$9TP4QGd8T0HPPvrEy7Zd0e/ZFymp7Z1GXIP8SmwoSwT6LlufuVY9S', '3434334', 'https://www.gravatar.com/avatar/276f4d50acad8aa76eb74ffd9430094d?d=https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_960_720.png', 1, 'UPLbqO', 'ilSqKo', 'active', 2, '2021-08-11 11:44:23', '2021-08-11 12:46:51'),
(8, 'ali', 'string', 'mohsinbaig786786@gmail.com', '$2b$10$Vr6RNx4zO21pDVbPbri3tuwgIxSoxXhF25K4W8R.vRNpQcor0.v4y', 'string', 'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_960_720.png', 0, 'gPKCHt', NULL, 'pending', 2, '2021-08-12 13:51:39', '2021-08-12 13:51:39');

-- --------------------------------------------------------

--
-- Table structure for table `userTiers`
--

CREATE TABLE `userTiers` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `image` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `status` enum('active','inActive') DEFAULT NULL,
  `benefits` json NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userTiers`
--

INSERT INTO `userTiers` (`id`, `title`, `price`, `image`, `description`, `status`, `benefits`, `createdAt`, `updatedAt`, `UserId`) VALUES
(1, 'Updated Title', 7, '2021-08-06T11:53:36.801Z-BeFunky-design.png', 'Updated Description', 'active', '[\"string1\", \"string2\"]', '2021-08-06 11:53:36', '2021-08-09 07:07:00', 2),
(2, 'tier 2', 4, '2021-08-10T11:41:22.685Z-watch-4.png', 'description', 'active', '[\"string1\", \"string2\", \"string3\", \"string4\"]', '2021-08-10 11:41:22', '2021-08-10 11:41:22', 2),
(3, 'tier 3', 4, '2021-08-10T11:41:30.170Z-watch-4.png', 'description', 'active', '[\"string1\", \"string2\", \"string3\", \"string4\"]', '2021-08-10 11:41:30', '2021-08-10 11:41:30', 2),
(4, 'tier 4', 4, '2021-08-10T12:03:08.360Z-watch-4.png', 'description', 'active', '[\"string1\", \"string2\", \"string3\", \"string4\"]', '2021-08-10 12:03:08', '2021-08-10 12:03:08', 2),
(5, 'tier 5', 4, '2021-08-10T12:03:11.076Z-watch-4.png', 'description', 'active', '[\"string1\", \"string2\", \"string3\", \"string4\"]', '2021-08-10 12:03:11', '2021-08-10 12:03:11', 2),
(6, 'tier 6', 4, '2021-08-10T12:03:13.491Z-watch-4.png', 'description', 'active', '[\"string1\", \"string2\", \"string3\", \"string4\"]', '2021-08-10 12:03:13', '2021-08-10 12:03:13', 2),
(7, 'tier 7', 4, '2021-08-10T12:03:16.002Z-watch-4.png', 'description', 'active', '[\"string1\", \"string2\", \"string3\", \"string4\"]', '2021-08-10 12:03:16', '2021-08-10 12:03:16', 2),
(8, 'tier 8', 4, '2021-08-10T12:03:18.430Z-watch-4.png', 'description', 'active', '[\"string1\", \"string2\", \"string3\", \"string4\"]', '2021-08-10 12:03:18', '2021-08-10 12:03:18', 2),
(9, 'tier 9', 4, '2021-08-10T12:03:21.052Z-watch-4.png', 'description', 'active', '[\"string1\", \"string2\", \"string3\", \"string4\"]', '2021-08-10 12:03:21', '2021-08-10 12:03:21', 2),
(10, 'tier 10', 4, '2021-08-10T12:03:25.304Z-watch-4.png', 'description', 'active', '[\"string1\", \"string2\", \"string3\", \"string4\"]', '2021-08-10 12:03:25', '2021-08-10 12:03:25', 2),
(11, 'updated Tier 11', 12, '2021-08-11T12:40:20.722Z-BeFunky-design.png', 'update tier description', 'active', '[\"string\", \"string\"]', '2021-08-11 12:40:20', '2021-08-11 12:42:49', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tiers_subscriptions`
--
ALTER TABLE `tiers_subscriptions`
  ADD PRIMARY KEY (`tierId`,`userId`),
  ADD UNIQUE KEY `tiers_subscriptions_userId_tierId_unique` (`tierId`,`userId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `userDetails`
--
ALTER TABLE `userDetails`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserId` (`UserId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role` (`role`);

--
-- Indexes for table `userTiers`
--
ALTER TABLE `userTiers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserId` (`UserId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `userDetails`
--
ALTER TABLE `userDetails`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `userTiers`
--
ALTER TABLE `userTiers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tiers_subscriptions`
--
ALTER TABLE `tiers_subscriptions`
  ADD CONSTRAINT `tiers_subscriptions_ibfk_1` FOREIGN KEY (`tierId`) REFERENCES `userTiers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tiers_subscriptions_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `userDetails`
--
ALTER TABLE `userDetails`
  ADD CONSTRAINT `userDetails_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role`) REFERENCES `roles` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `userTiers`
--
ALTER TABLE `userTiers`
  ADD CONSTRAINT `userTiers_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
