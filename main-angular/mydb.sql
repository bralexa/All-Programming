
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


CREATE TABLE `familymembers` (
  `familyMemberId` int(11) NOT NULL,
  `name` varchar(15) COLLATE utf32_unicode_ci NOT NULL,
  `nickname` varchar(10) COLLATE utf32_unicode_ci NOT NULL,
  `description` varchar(10) COLLATE utf32_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci;

--
-- Dumping data for table `familymembers`
--


INSERT INTO `familymembers` (`familyMemberId`, `name`, `nickname`, `description`) VALUES
(111, 'Dina', 'Dini', 'Mother'),
(222, 'Dan', 'Dudush', 'son');

-- --------------------------------------------------------

--
-- Table structure for table `kinsmans`
--

CREATE TABLE `kinsmans` (
  `kinsmanId` int(11) NOT NULL,
  `name` varchar(15) COLLATE utf32_unicode_ci NOT NULL,
  `nickname` varchar(10) COLLATE utf32_unicode_ci NOT NULL,
  `description` varchar(10) COLLATE utf32_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci;

--
-- Dumping data for table `kinsmans`
--

INSERT INTO `kinsmans` (`kinsmanId`, `name`, `nickname`, `description`) VALUES
(111, 'Dina', 'Dini', 'Mother'),
(222, 'Dan', 'Dudush', 'son');

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `taskId` int(11) NOT NULL,
  `description` varchar(100) COLLATE utf32_unicode_ci NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `familyMemberId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`taskId`, `description`, `date`, `familyMemberId`) VALUES
(1, 'Ckean the house', '2018-07-27 00:00:00', 111),
(2, 'new task', '2018-07-26 00:00:00', 111),
(4, 'new taskkk desc', '2018-07-26 00:00:00', 111),
(5, 'fsfsdgf', '2018-07-26 20:17:51', 111),
(6, 'new task', '2018-07-26 20:19:02', 111),
(7, 'new task', '2018-07-26 20:19:11', 111),
(8, 'new task', '2018-07-26 20:19:15', 111),
(9, 'new task', '2018-07-26 20:24:39', 111),
(10, 'new task', '2018-07-26 20:24:56', 111),
(11, 'new task', '2018-07-26 20:25:08', 111),
(12, 'new task', '2018-07-26 20:25:10', 111),
(13, 'my new task', '2018-07-26 20:44:02', 111),
(14, 'my new task 2', '2018-07-26 20:44:06', 111),
(15, 'my new task 223423523', '2018-07-26 20:44:09', 111),
(16, 'vdsgdsfhdfh', '2018-07-26 21:35:26', 111),
(17, 'bvchbxcvhxf', '2018-07-26 21:36:48', 111),
(18, 'ffasfasf', '2018-07-26 21:36:57', 222),
(19, 'gfdshgdfhdf', '2018-07-26 21:42:31', 111);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `familymembers`
--
ALTER TABLE `familymembers`
  ADD PRIMARY KEY (`familyMemberId`);

--
-- Indexes for table `kinsmans`
--
ALTER TABLE `kinsmans`
  ADD PRIMARY KEY (`kinsmanId`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`taskId`),
  ADD KEY `tasks_family_members` (`familyMemberId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `taskId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_family_members` FOREIGN KEY (`familyMemberId`) REFERENCES `familymembers` (`familyMemberId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
