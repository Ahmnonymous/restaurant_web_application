-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS rwa_db;
USE rwa_db;

-- Create the Customer table
CREATE TABLE IF NOT EXISTS Customer (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  is_auth TINYINT(1) DEFAULT 0
);

-- Create the AuthCode table
CREATE TABLE IF NOT EXISTS AuthCode (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT,
  code VARCHAR(6) NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES Customer(id)
);

-- Create the Address table
CREATE TABLE IF NOT EXISTS Address (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT,
  area VARCHAR(255) NOT NULL,
  building_number VARCHAR(50),
  apartment_number VARCHAR(50),
  FOREIGN KEY (customer_id) REFERENCES Customer(id)
);

-- Create the PaymentMethod table
CREATE TABLE IF NOT EXISTS PaymentMethod (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT,
  method VARCHAR(50) NOT NULL
);

-- Create the CardPayment table
CREATE TABLE IF NOT EXISTS CardPayment (
  id INT AUTO_INCREMENT PRIMARY KEY,
  payment_method_id INT,
  cardholder_name VARCHAR(255),
  card_number VARCHAR(16),
  expiration VARCHAR(10),
  cvv VARCHAR(4),
  FOREIGN KEY (payment_method_id) REFERENCES PaymentMethod(id)
);

-- Create the PayPalPayment table
CREATE TABLE IF NOT EXISTS PayPalPayment (
  id INT AUTO_INCREMENT PRIMARY KEY,
  payment_method_id INT,
  paypal_account_holder_name VARCHAR(255),
  paypal_email VARCHAR(255),
  FOREIGN KEY (payment_method_id) REFERENCES PaymentMethod(id)
);

-- Create the Menu table
CREATE TABLE IF NOT EXISTS Menu (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category VARCHAR(100) NOT NULL
);

-- Create the Item table
CREATE TABLE IF NOT EXISTS Item (
  id INT AUTO_INCREMENT PRIMARY KEY,
  menu_id INT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  picture VARCHAR(255),
  FOREIGN KEY (menu_id) REFERENCES Menu(id)
);

-- Create the Topping table
CREATE TABLE IF NOT EXISTS Topping (
  id INT AUTO_INCREMENT PRIMARY KEY,
  item_id INT,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (item_id) REFERENCES Item(id)
);

-- Create the Order table
CREATE TABLE IF NOT EXISTS `Order` (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT,
  order_date DATE NOT NULL,
  delivery_datetime DATETIME,
  status VARCHAR(20),
  payment_method_id INT,
  total DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES Customer(id),
  FOREIGN KEY (payment_method_id) REFERENCES PaymentMethod(id)
);

-- Create the OrderItem table
CREATE TABLE IF NOT EXISTS OrderItem (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT,
  item_id INT,
  quantity INT,
  item_price DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES `Order`(id),
  FOREIGN KEY (item_id) REFERENCES Item(id)
);

-- Create the Employee table
CREATE TABLE IF NOT EXISTS Employee (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  password VARCHAR(255) NOT NULL,
  privilege VARCHAR(20)
);

-- Create the Driver table
CREATE TABLE IF NOT EXISTS Driver (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  license_number VARCHAR(20) NOT NULL,
  vehicle_information VARCHAR(255),
  password VARCHAR(255) NOT NULL,
  is_accepted TINYINT(1) DEFAULT 0,
  salary DECIMAL(10,2),
  working_time VARCHAR(255)
);

-- Create the Cart table
CREATE TABLE IF NOT EXISTS Cart (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT,
  item_id INT,
  topping_id INT,
  quantity INT,
  creation_date DATETIME,
  FOREIGN KEY (customer_id) REFERENCES Customer(id),
  FOREIGN KEY (item_id) REFERENCES Item(id),
  FOREIGN KEY (topping_id) REFERENCES Topping(id)
);

-- Create the PastOrders table
CREATE TABLE IF NOT EXISTS PastOrders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT,
  order_date DATE NOT NULL,
  delivery_datetime DATETIME,
  status VARCHAR(20),
  payment_method_id INT,
  FOREIGN KEY (customer_id) REFERENCES Customer(id),
  FOREIGN KEY (payment_method_id) REFERENCES PaymentMethod(id)
);

-- Create the OrderTracking table
CREATE TABLE IF NOT EXISTS OrderTracking (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT,
  status VARCHAR(20),
  delivery_datetime DATETIME,
  FOREIGN KEY (order_id) REFERENCES `Order`(id)
);

-- Create the Rating table
CREATE TABLE IF NOT EXISTS Rating (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT,
  rating INT,
  feedback TEXT,
  FOREIGN KEY (order_id) REFERENCES `Order`(id)
);

INSERT INTO Menu (category)
VALUES
  ('Platters'),
  ('Sandwiches'),
  ('Sweets'),
  ('Beverage');

INSERT INTO Item (menu_id, name, description, price, picture)
VALUES
  (1, 'Foul Plate', 'Delicious item to order', 10.00, 'burger.jpg'),
  (1, 'Spicy Foul Plate', 'Delicious item to order', 12.00, 'burger.jpg'),
  (1, 'Omelets', 'Delicious item to order', 8.00, 'burger.jpg'),
  (1, 'Hardboiled Eggs', 'Delicious item to order', 6.00, 'burger.jpg'),
  (1, 'Tamia', 'Delicious item to order', 9.00, 'burger.jpg'),
  (1, 'Tamia with fillings', 'Delicious item to order', 11.00, 'burger.jpg'),
  (2, 'Foul Sandwich', 'Delicious item to order', 7.00, 'burger.jpg'),
  (2, 'Spicy Foul Sandwich', 'Delicious item to order', 8.00, 'burger.jpg'),
  (2, 'Egg Sandwich', 'Delicious item to order', 6.00, 'burger.jpg'),
  (2, 'Tamia Sandwich', 'Delicious item to order', 7.50, 'burger.jpg'),
  (2, 'Tamia with fillings sandwich', 'Delicious item to order', 9.00, 'burger.jpg'),
  (3, 'Croissants', 'Delicious item to order', 5.00, 'burger.jpg'),
  (3, 'Waffles', 'Delicious item to order', 7.00, 'burger.jpg'),
  (3, 'Oats', 'Delicious item to order', 8.00, 'burger.jpg'),
  (3, 'Feeter', 'Delicious item to order', 4.00, 'burger.jpg'),
  (4, 'Americano', 'Delicious item to order', 6.00, 'burger.jpg'),
  (4, 'Espresso', 'Delicious item to order', 8.00, 'burger.jpg'),
  (4, 'Latte', 'Delicious item to order', 4.00, 'burger.jpg'),
  (4, 'Tea', 'Delicious item to order', 6.00, 'burger.jpg'),
  (4, 'Orange Juice', 'Delicious item to order', 14.00, 'burger.jpg'),
  (4, 'Milk', 'Delicious item to order', 12.00, 'burger.jpg'),
  (4, 'Water', 'Delicious item to order', 1.00, 'burger.jpg');

INSERT INTO Topping (item_id, name, price)
VALUES
  (8, 'Nutella', 1.50),
  (8, 'Lotus', 1.00),
  (8, 'Peanut Butter', 0.50),
  (9, 'Greek Yogurt', 0.75),
  (9, 'Fruits', 0.50),
  (9, 'Nuts', 0.75),
  (9, 'Chia Seeds', 0.25),
  (9, 'Powdered Sugar', 0.25),
  (9, 'Custard', 0.75);
