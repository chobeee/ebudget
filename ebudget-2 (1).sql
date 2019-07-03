-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 03, 2019 at 06:42 PM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ebudget-2`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `comment_id` int(255) NOT NULL,
  `user_id` int(255) NOT NULL,
  `comment` varchar(255) NOT NULL,
  `convo_name` varchar(255) NOT NULL,
  `timestamp` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comment_id`, `user_id`, `comment`, `convo_name`, `timestamp`) VALUES
(2, 57, 'hello', 'dGVzdEB0ZXN0LmNvbTIwMTktMDctMDEyMDE5LTA3LTA3', '2019-07-03 11:02:06.517487'),
(3, 57, 'hello', 'dGVzdEB0ZXN0LmNvbTIwMTktMDctMDEyMDE5LTA3LTA3', '2019-07-03 11:02:23.765474'),
(4, 57, 'hello', 'dGVzdEB0ZXN0LmNvbTIwMTktMDctMDEyMDE5LTA3LTA3', '2019-07-03 11:02:23.767474'),
(5, 57, 'updatee', 'dGVzdEB0ZXN0LmNvbTIwMTktMDctMDEyMDE5LTA3LTA3', '2019-07-03 11:03:14.830395'),
(8, 57, 'yo', 'dGVzdEB0ZXN0LmNvbTIwMTktMDctMDEyMDE5LTA3LTA3', '2019-07-03 12:22:44.219188'),
(10, 116, 'hey', 'dGVzdEB0ZXN0LmNvbTIwMTktMDctMDEyMDE5LTA3LTA3', '2019-07-03 13:04:16.296727'),
(11, 116, 'fefefefedqwdwqdwqdwqdwq', 'dGVzdEB0ZXN0LmNvbTIwMTktMDctMDEyMDE5LTA3LTA3', '2019-07-03 13:08:22.913832'),
(12, 116, 'oh thats me', 'dGVzdEB0ZXN0LmNvbTIwMTktMDctMDEyMDE5LTA3LTA3', '2019-07-03 13:11:40.308123'),
(13, 116, 'hey', 'dGVzdEB0ZXN0LmNvbTIwMTktMDctMDEyMDE5LTA3LTA3', '2019-07-03 13:14:28.770758'),
(14, 116, 'he', 'dGVzdEB0ZXN0LmNvbTIwMTktMDctMDEyMDE5LTA3LTA3', '2019-07-03 13:15:03.687755'),
(15, 116, 'hello', 'dGVzdEB0ZXN0LmNvbTIwMTktMDctMDEyMDE5LTA3LTA3', '2019-07-03 13:17:32.922291'),
(16, 116, 'qwe', 'dGVzdEB0ZXN0LmNvbTIwMTktMDctMDEyMDE5LTA3LTA3', '2019-07-03 13:18:07.365261');

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `user_id` int(255) NOT NULL,
  `rank` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_custom`
--

CREATE TABLE `tbl_custom` (
  `user_id` int(11) NOT NULL,
  `custom_id` int(11) NOT NULL,
  `budget` int(11) NOT NULL,
  `expenses` int(11) NOT NULL,
  `start` date NOT NULL,
  `end` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_custom`
--

INSERT INTO `tbl_custom` (`user_id`, `custom_id`, `budget`, `expenses`, `start`, `end`) VALUES
(94, 18, 9970, 30, '2019-06-29', '2019-07-29'),
(57, 19, 13950, 50, '2019-07-01', '2019-08-01'),
(113, 20, 210, 90, '2019-07-02', '2019-07-09'),
(114, 21, 1910, 90, '2019-07-02', '2019-08-02'),
(116, 22, 19768, 232, '2019-07-02', '2019-08-02');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_custom_transactions`
--

CREATE TABLE `tbl_custom_transactions` (
  `transaction_id` int(12) NOT NULL,
  `custom_id` int(12) NOT NULL,
  `name` varchar(255) NOT NULL,
  `amount` int(100) NOT NULL,
  `note` text NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `icon_src` varchar(255) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_custom_transactions`
--

INSERT INTO `tbl_custom_transactions` (`transaction_id`, `custom_id`, `name`, `amount`, `note`, `timestamp`, `icon_src`, `date`) VALUES
(3, 7, 'Bills & Utilities', 123, 'COonverge', '2019-06-29 07:35:46', 'assets/icon/bills_icon.png', '2019-06-29'),
(4, 9, 'Transportation', 123, 'asdkj', '2019-06-29 07:44:09', 'assets/icon/transpo_icon.png', '2019-06-29'),
(5, 16, 'Withdrawal', 30, 'emergency', '2019-06-29 08:08:46', 'assets/icon/withdraw.png', '2019-06-29'),
(6, 18, 'Friends & Lover', 30, 'isaw', '2019-06-29 08:23:58', 'assets/icon/heart_icon.png', '2019-06-29'),
(7, 19, 'Transportation', 50, '', '2019-07-01 06:12:03', 'assets/icon/transpo_icon.png', '2019-07-01'),
(8, 20, 'Health & Fitness', 90, '', '2019-07-02 04:11:59', 'assets/icon/health.png', '2019-07-02'),
(9, 21, 'Transportation', 90, '', '2019-07-02 08:04:49', 'assets/icon/transpo_icon.png', '2019-07-02'),
(10, 22, 'Food & Beverage', 232, '', '2019-07-03 13:22:30', 'assets/icon/food_drinks_icon.png', '2019-07-03');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_week`
--

CREATE TABLE `tbl_week` (
  `user_id` int(11) NOT NULL,
  `week_id` int(11) NOT NULL,
  `budget` int(11) NOT NULL,
  `start` date NOT NULL,
  `end` varchar(255) NOT NULL,
  `year` smallint(6) NOT NULL,
  `month` smallint(6) NOT NULL,
  `expenses` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_week`
--

INSERT INTO `tbl_week` (`user_id`, `week_id`, `budget`, `start`, `end`, `year`, `month`, `expenses`) VALUES
(57, 11, 919, '2019-04-22', '2019-04-28', 2019, 3, 281),
(57, 23, 590, '2019-06-10', '2019-06-16', 2019, 5, 110),
(57, 26, 50, '2019-06-17', '2019-06-23', 2019, 5, 50),
(57, 27, 400, '2019-06-24', '2019-06-30', 2019, 5, 300),
(57, 28, 6725, '2019-07-01', '2019-07-07', 2019, 6, 275),
(113, 29, 295, '2019-07-01', '2019-07-07', 2019, 6, 5),
(116, 30, 7000, '2019-07-01', '2019-07-07', 2019, 6, 0),
(116, 31, 7000, '2019-07-01', '2019-07-07', 2019, 6, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tips`
--

CREATE TABLE `tips` (
  `id` int(11) NOT NULL,
  `categories` text NOT NULL,
  `title` text NOT NULL,
  `content` text NOT NULL,
  `icon_src` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tips`
--

INSERT INTO `tips` (`id`, `categories`, `title`, `content`, `icon_src`) VALUES
(22, 'Avoid convenience foods and fast food', '', '', NULL),
(23, 'Move bank accounts to take advantage of perks and earn more interest', '', '', NULL),
(26, 'Make your own gifts instead of buying stuff from the store', '', '', NULL),
(27, 'Write a list before you go shopping and stick to it', '', '', NULL),
(28, 'Invite friends over instead of going out', '', '', NULL),
(29, 'Go through your closets and find anything and everything you no longer use. Sell it.', '', '', NULL),
(30, 'For your sake. Quit all your vices', '', '', NULL),
(31, 'Turn off/ unplug all the appliances to lessen your bills', '', '', NULL),
(32, 'Maximize yard sales', '', '', NULL),
(33, 'Buy quality appliances that will last', '', '', NULL),
(34, 'Use credit cards wisely', '', '', NULL),
(35, 'Plan your meals around your grocery store\'s flyer', '', '', NULL),
(36, 'Do a price comparison and find a cheaper grocery store', '', '', NULL),
(37, 'Make your own when you can', '', '', NULL),
(38, 'Avoid stress-spending', '', '', NULL),
(39, 'Share your dreams with people you love', '', '', NULL),
(40, 'Do a \"maintenance run\" on your appliances', '', '', NULL),
(41, 'Buy used when you can', '', '', NULL),
(42, ' Remove your credit card numbers from your online accounts', '', '', NULL),
(43, 'Do holiday shopping right after the holidays', '', '', NULL),
(44, ' Declutter to save your sanity and some cash', '', '', NULL),
(45, 'Try generic brands of items you buy regularly', '', '', NULL),
(46, 'Prepare some meals at home', '', '', NULL),
(47, 'Switch to term life insurance', '', '', NULL),
(48, 'Look for a cheaper place to live', '', '', NULL),
(49, 'Do some basic home and auto maintenance on a regular schedule', '', '', NULL),
(50, 'Learn about all of the benefits your company offers', '', '', NULL),
(51, 'Suggest cheap activities when meeting up with family and friends', '', '', NULL),
(52, 'Don\'t overspend on hygiene products', '', '', NULL),
(53, 'Never give up', '', '', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `day_id` int(11) NOT NULL,
  `week_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `amount` int(100) NOT NULL,
  `note` longtext NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `icon_src` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`day_id`, `week_id`, `name`, `amount`, `note`, `timestamp`, `icon_src`, `date`) VALUES
(22, 11, 'Transportation', 46, '', '2019-04-27 15:15:44', 'assets/icon/transpo_icon.png', '2019-04-27'),
(23, 11, 'Bills & Utilities', 56, '', '2019-04-27 15:16:02', 'assets/icon/bills_icon.png', '2019-04-27'),
(24, 11, 'Bills & Utilities', 89, '', '2019-04-27 16:09:38', 'assets/icon/bills_icon.png', '2019-04-28'),
(25, 11, 'Friends & Lover', 90, '', '2019-04-27 16:10:56', 'assets/icon/heart_icon.png', '2019-04-28'),
(47, 23, 'Friends & Lover', 110, '', '2019-06-12 03:18:04', 'assets/icon/heart_icon.png', '2019-06-12'),
(49, 26, 'Food & Beverage', 50, 'Milktea', '2019-06-22 05:41:56', 'assets/icon/food_drinks_icon.png', '2019-06-22'),
(50, 27, 'Shopping', 300, '', '2019-06-29 01:32:28', 'assets/icon/shopping_icon.png', '2019-06-29'),
(51, 28, 'Food & Beverage', 185, 'milktea cravings', '2019-07-01 06:10:06', 'assets/icon/food_drinks_icon.png', '2019-07-01'),
(52, 29, 'Withdrawal', 5, '', '2019-07-02 04:13:19', 'assets/icon/withdraw.png', '2019-07-02'),
(53, 28, 'Shopping', 90, '', '2019-07-02 09:27:35', 'assets/icon/shopping_icon.png', '2019-07-02');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `type` enum('admin','user') NOT NULL DEFAULT 'user',
  `pwd` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `gender` tinytext NOT NULL,
  `isVerified` tinyint(1) NOT NULL,
  `verify_code` varchar(255) NOT NULL,
  `avatar_src` varchar(255) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `type`, `pwd`, `full_name`, `gender`, `isVerified`, `verify_code`, `avatar_src`, `date`) VALUES
(33, 'admin', 'admin', 'admin', 'admin', 'female', 1, '', '', '2019-07-01 16:00:00'),
(57, 'test', 'user', '123', 'Tricia Mae Gayatin', 'female', 0, 'triciamaetest@gmail.com2019-04-2710:05:28', 'public/avatars/female_default.png', '2019-06-30 16:00:00'),
(111, 'triciag@test.cpm', 'user', '123', 'maemaem', 'female', 0, 'triciag@test.cpm2019-06-2914:01:33', 'public/avatars/female_default.png', '2019-06-30 16:00:00'),
(112, '', 'user', '', '', '', 0, '2019-07-0206:08:20', 'public/avatars/female_default.png', '2019-07-01 16:00:00'),
(113, 'paultest@gmail.com', 'user', '123', 'Pal Enriquez', 'male', 0, 'paultest@gmail.com2019-07-0206:08:22', 'public/avatars/male_default.png', '2019-06-30 16:00:00'),
(114, 'nifma@test.com', 'user', '123', 'Nimfa', 'female', 0, 'nifma@test.com2019-07-0210:00:19', 'public/avatars/female_default.png', '2019-06-30 16:00:00'),
(115, 'nifma@test.com', 'user', '123', 'Nimfa', 'female', 0, 'nifma@test.com2019-07-0210:00:19', 'public/avatars/female_default.png', '2019-06-30 16:00:00'),
(116, 'test@test.com', 'user', '123', 'Test', 'male', 0, 'test@test.com2019-07-0211:54:00', 'public/avatars/male_default.png', '2019-06-30 16:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`);

--
-- Indexes for table `tbl_custom`
--
ALTER TABLE `tbl_custom`
  ADD PRIMARY KEY (`custom_id`);

--
-- Indexes for table `tbl_custom_transactions`
--
ALTER TABLE `tbl_custom_transactions`
  ADD PRIMARY KEY (`transaction_id`);

--
-- Indexes for table `tbl_week`
--
ALTER TABLE `tbl_week`
  ADD PRIMARY KEY (`week_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `tips`
--
ALTER TABLE `tips`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`day_id`),
  ADD KEY `tbl_day_ibfk_1` (`week_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `tbl_custom`
--
ALTER TABLE `tbl_custom`
  MODIFY `custom_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `tbl_custom_transactions`
--
ALTER TABLE `tbl_custom_transactions`
  MODIFY `transaction_id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `tbl_week`
--
ALTER TABLE `tbl_week`
  MODIFY `week_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `tips`
--
ALTER TABLE `tips`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `day_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=117;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_week`
--
ALTER TABLE `tbl_week`
  ADD CONSTRAINT `tbl_week_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`week_id`) REFERENCES `tbl_week` (`week_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
