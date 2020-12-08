-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 19, 2020 at 05:44 AM
-- Server version: 10.4.15-MariaDB-log
-- PHP Version: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_linxinw`
--

-- --------------------------------------------------------

--
-- Table structure for table `AuthorList`
--

CREATE TABLE `AuthorList` (
  `Author_ID` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `AuthorList`
--

INSERT INTO `AuthorList` (`Author_ID`, `Name`) VALUES
(5, 'Alex Glendon'),
(2, 'Bill Gates'),
(4, 'George Bush'),
(1, 'J.K Rowling'),
(3, 'William Jafferson Clinton');

-- --------------------------------------------------------

--
-- Table structure for table `BookList`
--

CREATE TABLE `BookList` (
  `Book_ID` int(11) NOT NULL,
  `Book_name` varchar(255) NOT NULL,
  `Category` varchar(255) NOT NULL,
  `Owner_ID` int(11) NOT NULL,
  `Prize` int(11) NOT NULL,
  `On_Sell` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `BookList`
--

INSERT INTO `BookList` (`Book_ID`, `Book_name`, `Category`, `Owner_ID`, `Prize`, `On_Sell`) VALUES
(1, 'Harry Potter', 'fantasy', 1, 3000, -1),
(2, 'Bible', 'god', 3, 1500, -1),
(3, 'Financial Crises', 'economy', 2, 100000, 1),
(4, 'Analysing Qualitative Data in Psychology', 'psychology', 1, 9342, -1),
(5, 'Headway Academic Skills: Reading, Writing', 'English', 1, 9864, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Book_Author`
--

CREATE TABLE `Book_Author` (
  `Book_ID` int(11) NOT NULL,
  `Author_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Book_Author`
--

INSERT INTO `Book_Author` (`Book_ID`, `Author_ID`) VALUES
(1, 1),
(2, 2),
(2, 3),
(3, 3),
(3, 4),
(4, 4),
(5, 2),
(5, 4),
(5, 5);

-- --------------------------------------------------------

--
-- Table structure for table `Cart`
--

CREATE TABLE `Cart` (
  `User_ID` int(11) NOT NULL,
  `Book_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Cart`
--

INSERT INTO `Cart` (`User_ID`, `Book_ID`) VALUES
(1, 3),
(2, 5),
(3, 3),
(3, 4),
(4, 5);

-- --------------------------------------------------------

--
-- Table structure for table `OrderList`
--

CREATE TABLE `OrderList` (
  `Order_ID` int(11) NOT NULL,
  `Order_cost` int(11) NOT NULL,
  `Order_date` datetime NOT NULL,
  `Buyer_ID` int(11) NOT NULL,
  `Payment` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `OrderList`
--

INSERT INTO `OrderList` (`Order_ID`, `Order_cost`, `Order_date`, `Buyer_ID`, `Payment`) VALUES
(1, 1000, '2020-11-05 00:00:00', 1, 'Bank of America: 92387532794'),
(2, 2000, '2020-01-03 00:00:00', 3, 'Chase Bank: 238457234');

-- --------------------------------------------------------

--
-- Table structure for table `UserList`
--

CREATE TABLE `UserList` (
  `User_ID` int(11) NOT NULL,
  `User_name` varchar(255) NOT NULL,
  `User_email` varchar(255) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `UserList`
--

INSERT INTO `UserList` (`User_ID`, `User_name`, `User_email`, `Address`, `Password`) VALUES
(1, 'linxinw', '13566811698@outlook.com', '7th Street', '989090'),
(2, 'liuxuf', 'xuf@gmail.com', 'Beverton', '20202020'),
(3, 'Trump', 'RealTrump@gmail.com', 'White House', 'I am trump'),
(4, 'Biden', 'Biden@outlook.com', 'White House', 'I am the next president');

-- --------------------------------------------------------

--
-- Table structure for table `User_Order_Book`
--

CREATE TABLE `User_Order_Book` (
  `User_ID` int(11) NOT NULL,
  `Order_ID` int(11) NOT NULL,
  `Book_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `User_Order_Book`
--

INSERT INTO `User_Order_Book` (`User_ID`, `Order_ID`, `Book_ID`) VALUES
(2, 1, 1),
(4, 1, 4),
(4, 2, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `AuthorList`
--
ALTER TABLE `AuthorList`
  ADD PRIMARY KEY (`Author_ID`),
  ADD UNIQUE KEY `Name` (`Name`);

--
-- Indexes for table `BookList`
--
ALTER TABLE `BookList`
  ADD PRIMARY KEY (`Book_ID`),
  ADD KEY `Owner_ID` (`Owner_ID`);

--
-- Indexes for table `Book_Author`
--
ALTER TABLE `Book_Author`
  ADD PRIMARY KEY (`Book_ID`,`Author_ID`),
  ADD KEY `Author_ID` (`Author_ID`);

--
-- Indexes for table `Cart`
--
ALTER TABLE `Cart`
  ADD PRIMARY KEY (`User_ID`,`Book_ID`),
  ADD KEY `Book_ID` (`Book_ID`);

--
-- Indexes for table `OrderList`
--
ALTER TABLE `OrderList`
  ADD PRIMARY KEY (`Order_ID`),
  ADD KEY `Buyer_ID` (`Buyer_ID`);

--
-- Indexes for table `UserList`
--
ALTER TABLE `UserList`
  ADD PRIMARY KEY (`User_ID`);

--
-- Indexes for table `User_Order_Book`
--
ALTER TABLE `User_Order_Book`
  ADD PRIMARY KEY (`User_ID`,`Order_ID`,`Book_ID`),
  ADD KEY `Order_ID` (`Order_ID`),
  ADD KEY `Book_ID` (`Book_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `AuthorList`
--
ALTER TABLE `AuthorList`
  MODIFY `Author_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `BookList`
--
ALTER TABLE `BookList`
  MODIFY `Book_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `OrderList`
--
ALTER TABLE `OrderList`
  MODIFY `Order_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `UserList`
--
ALTER TABLE `UserList`
  MODIFY `User_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `BookList`
--
ALTER TABLE `BookList`
  ADD CONSTRAINT `BookList_ibfk_1` FOREIGN KEY (`Owner_ID`) REFERENCES `UserList` (`User_ID`);

--
-- Constraints for table `Book_Author`
--
ALTER TABLE `Book_Author`
  ADD CONSTRAINT `Book_Author_ibfk_1` FOREIGN KEY (`Book_ID`) REFERENCES `BookList` (`Book_ID`),
  ADD CONSTRAINT `Book_Author_ibfk_2` FOREIGN KEY (`Author_ID`) REFERENCES `AuthorList` (`Author_ID`);

--
-- Constraints for table `Cart`
--
ALTER TABLE `Cart`
  ADD CONSTRAINT `Cart_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `UserList` (`User_ID`),
  ADD CONSTRAINT `Cart_ibfk_2` FOREIGN KEY (`Book_ID`) REFERENCES `BookList` (`Book_ID`);

--
-- Constraints for table `OrderList`
--
ALTER TABLE `OrderList`
  ADD CONSTRAINT `OrderList_ibfk_1` FOREIGN KEY (`Buyer_ID`) REFERENCES `UserList` (`User_ID`);

--
-- Constraints for table `User_Order_Book`
--
ALTER TABLE `User_Order_Book`
  ADD CONSTRAINT `User_Order_Book_ibfk_1` FOREIGN KEY (`Order_ID`) REFERENCES `OrderList` (`Order_ID`),
  ADD CONSTRAINT `User_Order_Book_ibfk_2` FOREIGN KEY (`User_ID`) REFERENCES `UserList` (`User_ID`),
  ADD CONSTRAINT `User_Order_Book_ibfk_3` FOREIGN KEY (`Book_ID`) REFERENCES `BookList` (`Book_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
