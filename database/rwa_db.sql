-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 15, 2023 at 11:11 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rwa_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `area` varchar(255) NOT NULL,
  `building_number` varchar(50) DEFAULT NULL,
  `apartment_number` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`id`, `customer_id`, `area`, `building_number`, `apartment_number`) VALUES
(1, 1, 'Street 1', '123', 'Apt 4B'),
(2, 2, 'Street 2', '456', 'Apt 9C'),
(3, 3, 'Street 3', '789', 'Apt 12D');

-- --------------------------------------------------------

--
-- Table structure for table `authcode`
--

CREATE TABLE `authcode` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `code` varchar(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `authcode`
--

INSERT INTO `authcode` (`id`, `customer_id`, `code`) VALUES
(1, 1, 'ABCD12'),
(2, 2, 'EFGH45'),
(3, 3, 'IJKL78');

-- --------------------------------------------------------

--
-- Table structure for table `cardpayment`
--

CREATE TABLE `cardpayment` (
  `id` int(11) NOT NULL,
  `payment_method_id` int(11) DEFAULT NULL,
  `cardholder_name` varchar(255) DEFAULT NULL,
  `card_number` varchar(16) DEFAULT NULL,
  `expiration` varchar(10) DEFAULT NULL,
  `cvv` varchar(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cardpayment`
--

INSERT INTO `cardpayment` (`id`, `payment_method_id`, `cardholder_name`, `card_number`, `expiration`, `cvv`) VALUES
(1, 1, 'John Doe', '1234567890123456', '12/25', '123'),
(2, 2, 'Jane Smith', '9876543210987654', '06/24', '456'),
(3, 3, 'Michael Johnson', '5555555555555555', '09/23', '789');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `is_auth` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `name`, `password`, `phone`, `is_auth`) VALUES
(1, 'John Doe', 'password123', '1234567890', 1),
(2, 'Jane Smith', 'qwerty789', '9876543210', 0),
(3, 'Michael Johnson', 'securepass', '5555555555', 1);

-- --------------------------------------------------------

--
-- Table structure for table `driver`
--

CREATE TABLE `driver` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `license_number` varchar(20) NOT NULL,
  `vehicle_information` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `is_accepted` tinyint(1) DEFAULT 0,
  `salary` decimal(10,2) DEFAULT NULL,
  `working_time` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `privilege` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `name`, `phone`, `password`, `privilege`) VALUES
(1, 'John Smith', '5551112222', 'employee123', 'Admin'),
(2, 'Jane Doe', '5553334444', 'employee456', 'User'),
(3, 'Michael Brown', '5555555555', 'employee789', 'User');

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

CREATE TABLE `item` (
  `id` int(11) NOT NULL,
  `menu_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `picture` longblob DEFAULT NULL,
  `availability` int(11) DEFAULT NULL,
  `menu_name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `item`
--

INSERT INTO `item` (`id`, `menu_id`, `name`, `description`, `price`, `picture`, `availability`, `menu_name`) VALUES
(4, 1, 'Cola', 'Refreshing cola drink', 2.99, NULL, 10, 'Beverages'),
(5, 1, 'Iced Tea', 'Chilled iced tea', 3.49, NULL, 15, 'Beverages'),
(6, 1, 'Lemonade', 'Homemade lemonade', 3.99, NULL, 12, 'Beverages'),
(7, 1, 'Coffee', 'Freshly brewed coffee', 2.99, NULL, 20, 'Beverages'),
(8, 1, 'Smoothie', 'Fruit smoothie', 4.49, NULL, 8, 'Beverages'),
(9, 2, 'Chicken Wings', 'Crispy chicken wings with BBQ sauce', 9.99, NULL, 5, 'Appetizers'),
(10, 2, 'Mozzarella Sticks', 'Deep-fried mozzarella sticks', 7.99, NULL, 8, 'Appetizers'),
(11, 2, 'Nachos', 'Loaded nachos with cheese and toppings', 8.99, NULL, 10, 'Appetizers'),
(12, 2, 'Spinach Dip', 'Creamy spinach dip served with tortilla chips', 6.99, NULL, 15, 'Appetizers'),
(13, 2, 'Bruschetta', 'Toasted bread topped with tomatoes and basil', 5.99, NULL, 12, 'Appetizers'),
(14, 3, 'Steak', 'Grilled steak with mashed potatoes and vegetables', 19.99, NULL, 3, 'Main Dishes'),
(15, 3, 'Salmon', 'Pan-seared salmon with lemon butter sauce', 17.99, NULL, 5, 'Main Dishes'),
(16, 3, 'Chicken Parmesan', 'Breaded chicken topped with marinara sauce and cheese', 14.99, NULL, 8, 'Main Dishes'),
(17, 3, 'Vegetable Stir-Fry', 'Assorted vegetables stir-fried in a savory sauce', 12.99, NULL, 10, 'Main Dishes'),
(18, 3, 'Beef Tacos', 'Soft tortillas filled with seasoned beef and toppings', 10.99, NULL, 12, 'Main Dishes'),
(19, 4, 'Margherita Pizza', 'Classic pizza with tomato sauce and mozzarella cheese', 12.99, NULL, 8, 'Pizza'),
(20, 4, 'Pepperoni Pizza', 'Pizza topped with pepperoni and cheese', 13.99, NULL, 10, 'Pizza'),
(21, 4, 'Vegetarian Pizza', 'Pizza loaded with assorted vegetables', 13.99, NULL, 6, 'Pizza'),
(22, 4, 'BBQ Chicken Pizza', 'Pizza topped with BBQ chicken, onions, and cheese', 14.99, NULL, 7, 'Pizza'),
(23, 4, 'Supreme Pizza', 'Pizza with a variety of toppings including pepperoni, sausage, and vegetables', 15.99, NULL, 9, 'Pizza'),
(24, 5, 'Cheeseburger', 'Juicy beef patty with melted cheese', 9.99, NULL, 8, 'Burgers'),
(25, 5, 'Bacon Burger', 'Burger topped with crispy bacon and cheese', 10.99, NULL, 10, 'Burgers'),
(26, 5, 'Mushroom Swiss Burger', 'Burger topped with sautéed mushrooms and Swiss cheese', 10.99, NULL, 7, 'Burgers'),
(27, 5, 'Veggie Burger', 'Plant-based burger patty with lettuce and tomato', 8.99, NULL, 12, 'Burgers'),
(28, 5, 'BBQ Burger', 'Burger with BBQ sauce, onion rings, and cheddar cheese', 11.99, NULL, 6, 'Burgers'),
(29, 6, 'Spaghetti Bolognese', 'Spaghetti pasta with meat sauce', 11.99, NULL, 10, 'Pasta'),
(30, 6, 'Fettuccine Alfredo', 'Creamy Alfredo sauce served with fettuccine pasta', 12.99, NULL, 8, 'Pasta'),
(31, 6, 'Penne Arrabiata', 'Penne pasta tossed in a spicy tomato sauce', 10.99, NULL, 12, 'Pasta'),
(32, 6, 'Lasagna', 'Layers of pasta, meat, and cheese baked to perfection', 13.99, NULL, 6, 'Pasta'),
(33, 6, 'Caprese Pasta Salad', 'Pasta salad with tomatoes, mozzarella, and basil', 9.99, NULL, 15, 'Pasta'),
(34, 7, 'Club Sandwich', 'Triple-decker sandwich with turkey, bacon, lettuce, and tomato', 9.99, NULL, 10, 'Sandwiches'),
(35, 7, 'BLT Sandwich', 'Classic sandwich with bacon, lettuce, and tomato', 8.99, NULL, 12, 'Sandwiches'),
(36, 7, 'Chicken Caesar Wrap', 'Grilled chicken and Caesar salad wrapped in a tortilla', 9.99, NULL, 8, 'Sandwiches'),
(37, 7, 'Grilled Cheese', 'Toasted bread with melted cheese', 7.99, NULL, 15, 'Sandwiches'),
(38, 7, 'Turkey Avocado Sandwich', 'Sliced turkey, avocado, and mayo on bread', 8.99, NULL, 10, 'Sandwiches');

-- --------------------------------------------------------

--
-- Table structure for table `itemtopping`
--

CREATE TABLE `itemtopping` (
  `id` int(11) NOT NULL,
  `item_id` int(11) DEFAULT NULL,
  `topping_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `itemtopping`
--

INSERT INTO `itemtopping` (`id`, `item_id`, `topping_id`) VALUES
(1, 13, 1),
(2, 14, 2),
(3, 15, 3),
(4, 16, 1),
(5, 21, 4),
(6, 22, 5),
(7, 23, 6),
(8, 24, 4);

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `id` int(11) NOT NULL,
  `category` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`id`, `category`) VALUES
(1, 'Beverages'),
(2, 'Appetizers'),
(3, 'Main Dishes'),
(4, 'Pizza'),
(5, 'Burgers'),
(6, 'Pasta'),
(7, 'Sandwiches');

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `order_date` date NOT NULL,
  `delivery_datetime` datetime DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `payment_method_id` int(11) DEFAULT NULL,
  `total` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`id`, `customer_id`, `order_date`, `delivery_datetime`, `status`, `payment_method_id`, `total`) VALUES
(1, 1, '2023-07-01', '2023-07-01 18:00:00', 'Delivered', 1, 22.98),
(2, 2, '2023-07-02', '2023-07-02 19:30:00', 'In Progress', 2, 12.99),
(3, 3, '2023-07-03', '2023-07-03 20:15:00', 'Pending', 3, 25.98);

-- --------------------------------------------------------

--
-- Table structure for table `orderitem`
--

CREATE TABLE `orderitem` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `item_price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ordertracking`
--

CREATE TABLE `ordertracking` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `delivery_datetime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ordertracking`
--

INSERT INTO `ordertracking` (`id`, `order_id`, `status`, `delivery_datetime`) VALUES
(1, 1, 'In Progress', '2023-07-01 18:30:00'),
(2, 2, 'Preparing', '2023-07-02 19:00:00'),
(3, 3, 'Out for Delivery', '2023-07-03 20:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `pastorders`
--

CREATE TABLE `pastorders` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `order_date` date NOT NULL,
  `delivery_datetime` datetime DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `payment_method_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pastorders`
--

INSERT INTO `pastorders` (`id`, `customer_id`, `order_date`, `delivery_datetime`, `status`, `payment_method_id`) VALUES
(1, 1, '2023-06-28', '2023-06-28 19:30:00', 'Delivered', 1),
(2, 2, '2023-06-29', '2023-06-29 20:15:00', 'Cancelled', 2),
(3, 3, '2023-06-30', '2023-06-30 18:45:00', 'Delivered', 3);

-- --------------------------------------------------------

--
-- Table structure for table `paymentmethod`
--

CREATE TABLE `paymentmethod` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `method` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `paymentmethod`
--

INSERT INTO `paymentmethod` (`id`, `customer_id`, `method`) VALUES
(1, 1, 'Credit Card'),
(2, 2, 'PayPal'),
(3, 3, 'Cash on Delivery');

-- --------------------------------------------------------

--
-- Table structure for table `paypalpayment`
--

CREATE TABLE `paypalpayment` (
  `id` int(11) NOT NULL,
  `payment_method_id` int(11) DEFAULT NULL,
  `paypal_account_holder_name` varchar(255) DEFAULT NULL,
  `paypal_email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `paypalpayment`
--

INSERT INTO `paypalpayment` (`id`, `payment_method_id`, `paypal_account_holder_name`, `paypal_email`) VALUES
(1, 1, 'John Doe', 'johndoe@example.com'),
(2, 2, 'Jane Smith', 'janesmith@example.com'),
(3, 3, 'Michael Johnson', 'michaeljohnson@example.com');

-- --------------------------------------------------------

--
-- Table structure for table `rating`
--

CREATE TABLE `rating` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `feedback` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rating`
--

INSERT INTO `rating` (`id`, `order_id`, `rating`, `feedback`) VALUES
(1, 1, 4, 'Great service and delicious food!'),
(2, 2, 2, 'The order was delayed and the food was cold.'),
(3, 3, 5, 'Excellent experience, highly recommended!');

-- --------------------------------------------------------

--
-- Table structure for table `topping`
--

CREATE TABLE `topping` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `availability` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `topping`
--

INSERT INTO `topping` (`id`, `name`, `price`, `availability`) VALUES
(1, 'Cheese', 1.50, 15),
(2, 'Pepperoni', 2.00, 10),
(3, 'Mushrooms', 1.50, 12),
(4, 'Extra Cheese', 1.00, 10),
(5, 'Pepperoni', 1.50, 8),
(6, 'Mushrooms', 1.00, 12),
(7, 'Onions', 0.75, 10),
(8, 'Cheese', 0.75, 15),
(9, 'Bacon', 1.50, 10),
(10, 'Mushrooms', 1.00, 12),
(11, 'Lettuce', 0.50, 15);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `authcode`
--
ALTER TABLE `authcode`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `cardpayment`
--
ALTER TABLE `cardpayment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `payment_method_id` (`payment_method_id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `item_id` (`item_id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `driver`
--
ALTER TABLE `driver`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `menu_id` (`menu_id`);

--
-- Indexes for table `itemtopping`
--
ALTER TABLE `itemtopping`
  ADD PRIMARY KEY (`id`),
  ADD KEY `item_id` (`item_id`),
  ADD KEY `topping_id` (`topping_id`);

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `payment_method_id` (`payment_method_id`);

--
-- Indexes for table `orderitem`
--
ALTER TABLE `orderitem`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `item_id` (`item_id`);

--
-- Indexes for table `ordertracking`
--
ALTER TABLE `ordertracking`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `pastorders`
--
ALTER TABLE `pastorders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `payment_method_id` (`payment_method_id`);

--
-- Indexes for table `paymentmethod`
--
ALTER TABLE `paymentmethod`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `paypalpayment`
--
ALTER TABLE `paypalpayment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `payment_method_id` (`payment_method_id`);

--
-- Indexes for table `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `topping`
--
ALTER TABLE `topping`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `authcode`
--
ALTER TABLE `authcode`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `cardpayment`
--
ALTER TABLE `cardpayment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `driver`
--
ALTER TABLE `driver`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `item`
--
ALTER TABLE `item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `itemtopping`
--
ALTER TABLE `itemtopping`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `orderitem`
--
ALTER TABLE `orderitem`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ordertracking`
--
ALTER TABLE `ordertracking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `pastorders`
--
ALTER TABLE `pastorders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `paymentmethod`
--
ALTER TABLE `paymentmethod`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `paypalpayment`
--
ALTER TABLE `paypalpayment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `rating`
--
ALTER TABLE `rating`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `topping`
--
ALTER TABLE `topping`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `address_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`);

--
-- Constraints for table `authcode`
--
ALTER TABLE `authcode`
  ADD CONSTRAINT `authcode_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`);

--
-- Constraints for table `cardpayment`
--
ALTER TABLE `cardpayment`
  ADD CONSTRAINT `cardpayment_ibfk_1` FOREIGN KEY (`payment_method_id`) REFERENCES `paymentmethod` (`id`);

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`),
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`);

--
-- Constraints for table `item`
--
ALTER TABLE `item`
  ADD CONSTRAINT `item_ibfk_1` FOREIGN KEY (`menu_id`) REFERENCES `menu` (`id`);

--
-- Constraints for table `itemtopping`
--
ALTER TABLE `itemtopping`
  ADD CONSTRAINT `itemtopping_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`),
  ADD CONSTRAINT `itemtopping_ibfk_2` FOREIGN KEY (`topping_id`) REFERENCES `topping` (`id`);

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `order_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`),
  ADD CONSTRAINT `order_ibfk_2` FOREIGN KEY (`payment_method_id`) REFERENCES `paymentmethod` (`id`);

--
-- Constraints for table `orderitem`
--
ALTER TABLE `orderitem`
  ADD CONSTRAINT `orderitem_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`),
  ADD CONSTRAINT `orderitem_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`);

--
-- Constraints for table `ordertracking`
--
ALTER TABLE `ordertracking`
  ADD CONSTRAINT `ordertracking_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`);

--
-- Constraints for table `pastorders`
--
ALTER TABLE `pastorders`
  ADD CONSTRAINT `pastorders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`),
  ADD CONSTRAINT `pastorders_ibfk_2` FOREIGN KEY (`payment_method_id`) REFERENCES `paymentmethod` (`id`);

--
-- Constraints for table `paypalpayment`
--
ALTER TABLE `paypalpayment`
  ADD CONSTRAINT `paypalpayment_ibfk_1` FOREIGN KEY (`payment_method_id`) REFERENCES `paymentmethod` (`id`);

--
-- Constraints for table `rating`
--
ALTER TABLE `rating`
  ADD CONSTRAINT `rating_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
