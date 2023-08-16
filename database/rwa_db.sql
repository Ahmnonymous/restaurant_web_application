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
) AUTO_INCREMENT = 501;

-- Create the AuthCode table
CREATE TABLE IF NOT EXISTS AuthCode (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT,
  code VARCHAR(6) NOT NULL,
  expiration_time DATETIME NOT NULL,
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
  category VARCHAR(100) NOT NULL,
  available CHAR(1) DEFAULT 'Y'
);

-- Create the Item table
CREATE TABLE IF NOT EXISTS Item (
  id INT AUTO_INCREMENT PRIMARY KEY,
  menu_id INT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  picture VARCHAR(255),
  available CHAR(1) DEFAULT 'Y',
  FOREIGN KEY (menu_id) REFERENCES Menu(id)
);

-- Create the Topping table
CREATE TABLE IF NOT EXISTS Topping (
  id INT AUTO_INCREMENT PRIMARY KEY,
  item_id INT,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  available CHAR(1) DEFAULT 'Y',
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
  topping_id INT,
  quantity INT,
  item_price DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES `Order`(id),
  FOREIGN KEY (item_id) REFERENCES Item(id),
  FOREIGN KEY (topping_id) REFERENCES Topping(id) 
);

-- Create the OrderTracking table
CREATE TABLE IF NOT EXISTS OrderTracking (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT,
  status VARCHAR(20),
  location_name VARCHAR(255),
  latitude DECIMAL(9,6),
  longitude DECIMAL(9,6),
  delivery_datetime DATETIME,
  FOREIGN KEY (order_id) REFERENCES `Order`(id)
);

-- Create the OrderOptions table
CREATE TABLE IF NOT EXISTS OrderOptions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  status VARCHAR(100) NOT NULL
);

-- Create the Privilege table
CREATE TABLE IF NOT EXISTS Privilege(
  id INT AUTO_INCREMENT PRIMARY KEY,
  privilege VARCHAR(100) NOT NULL
);

-- Create the Employee table
CREATE TABLE IF NOT EXISTS Employee (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  password VARCHAR(255) NOT NULL,
  privilege VARCHAR(20)
) AUTO_INCREMENT = 101;

CREATE TABLE IF NOT EXISTS Driver (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  age INT,
  phone VARCHAR(20) NOT NULL,
  password VARCHAR(255) NOT NULL,
  is_accepted TINYINT(1) DEFAULT 0,
  salary DECIMAL(10,2),
  working_start_time TIME,
  working_end_time TIME,
  national_id VARCHAR(20)
) AUTO_INCREMENT = 201;

-- Create the Item_Topping table
CREATE TABLE IF NOT EXISTS Item_Topping (
  id INT AUTO_INCREMENT PRIMARY KEY,
  item_id INT,
  topping_id INT,
  FOREIGN KEY (item_id) REFERENCES Item(id),
  FOREIGN KEY (topping_id) REFERENCES Topping(id)
);

-- Create the Cart table
CREATE TABLE IF NOT EXISTS Cart (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT,
  item_id INT,
  item_topping_id INT,
  quantity INT,
  FOREIGN KEY (customer_id) REFERENCES Customer(id),
  FOREIGN KEY (item_id) REFERENCES Item(id),
  FOREIGN KEY (item_topping_id) REFERENCES Item_Topping(id)
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

-- Create the Rating table
CREATE TABLE IF NOT EXISTS Rating (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT,
  rating INT,
  feedback TEXT,
  FOREIGN KEY (order_id) REFERENCES `Order`(id)
);

-- Create the cartd view
CREATE VIEW cartd AS
SELECT
    cu.name AS customer_name,
    c.customer_id,
    c.item_id,
    c.quantity,
    i.name AS item_name,
    i.price AS item_price,
    CASE
        WHEN it.id IS NULL THEN i.description
        ELSE CONCAT('With ', GROUP_CONCAT(t.name SEPARATOR ', '))
    END AS description,
    i.picture
FROM
    Cart c
JOIN
    Customer cu ON c.customer_id = cu.id
JOIN
    Item i ON c.item_id = i.id
LEFT JOIN
    Item_Topping it ON c.item_topping_id = it.id
LEFT JOIN
    Topping t ON it.topping_id = t.id
GROUP BY
    cu.name,
    c.customer_id,
    c.item_id,
    c.quantity,
    i.name,
    i.price,
    i.description,
    i.picture;


-- Insert data into the Menu table
INSERT INTO Menu (category)
VALUES
  ('Platters'),
  ('Sandwiches'),
  ('Sweets'),
  ('Beverage');

-- Insert data into the Item table
INSERT INTO Item (menu_id, name, description, price, picture)
VALUES
  (1, 'Foul Plate', 'Delicious item to order', 10.00, 'burger.webp'),
  (1, 'Spicy Foul Plate', 'Delicious item to order', 12.00, 'burger.webp'),
  (1, 'Omelets', 'Delicious item to order', 8.00, 'burger.webp'),
  (1, 'Hardboiled Eggs', 'Delicious item to order', 6.00, 'burger.webp'),
  (1, 'Tamia', 'Delicious item to order', 9.00, 'burger.webp'),
  (1, 'Tamia with fillings', 'Delicious item to order', 11.00, 'burger.webp'),
  (2, 'Foul Sandwich', 'Delicious item to order', 7.00, 'burger.webp'),
  (2, 'Spicy Foul Sandwich', 'Delicious item to order', 8.00, 'burger.webp'),
  (2, 'Egg Sandwich', 'Delicious item to order', 6.00, 'burger.webp'),
  (2, 'Tamia Sandwich', 'Delicious item to order', 7.50, 'burger.webp'),
  (2, 'Tamia with fillings sandwich', 'Delicious item to order', 9.00, 'burger.webp'),
  (3, 'Croissants', 'Delicious item to order', 5.00, 'burger.webp'),
  (3, 'Waffles', 'Delicious item to order', 7.00, 'burger.webp'),
  (3, 'Oats', 'Delicious item to order', 8.00, 'burger.webp'),
  (3, 'Feeter', 'Delicious item to order', 4.00, 'burger.webp'),
  (4, 'Americano', 'Delicious item to order', 6.00, 'burger.webp'),
  (4, 'Espresso', 'Delicious item to order', 8.00, 'burger.webp'),
  (4, 'Latte', 'Delicious item to order', 4.00, 'burger.webp'),
  (4, 'Tea', 'Delicious item to order', 6.00, 'burger.webp'),
  (4, 'Orange Juice', 'Delicious item to order', 14.00, 'burger.webp'),
  (4, 'Milk', 'Delicious item to order', 12.00, 'burger.webp'),
  (4, 'Water', 'Delicious item to order', 1.00, 'burger.webp');

-- Insert data into the Topping table
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

-- Insert data into the Item_Topping table
INSERT INTO Item_Topping (item_id, topping_id)
VALUES
  (8, 1),   -- Foul Sandwich with Nutella
  (8, 2),   -- Foul Sandwich with Lotus
  (8, 3),   -- Foul Sandwich with Peanut Butter
  (9, 4),   -- Spicy Foul Sandwich with Greek Yogurt
  (9, 5),   -- Spicy Foul Sandwich with Fruits
  (9, 6),   -- Spicy Foul Sandwich with Nuts
  (9, 7),   -- Spicy Foul Sandwich with Chia Seeds
  (9, 8),   -- Spicy Foul Sandwich with Powdered Sugar
  (9, 9);   -- Spicy Foul Sandwich with Custard

-- Insert data into the Customer, Address, Employee, and Driver tables
INSERT INTO Customer (name, password, phone, is_auth)
VALUES
  ('John Doe', 'password123', '+123456789', 1);

INSERT INTO Address (customer_id, area, building_number, apartment_number)
VALUES
  (501, 'Main Street', '123', 'Apt 5B');

INSERT INTO Employee (name, phone, password, privilege)
VALUES
  ('Toqa', '+555555555', 'userpassword', 'Admin'),
  ('Ahmed', '+987654321', 'adminpassword', 'Updating Order'),
  ('Ali', '+987654321', 'adminpassword', 'Shipping Order'),
  ('Abdullah', '+987654321', 'adminpassword', 'Managing Meal'),
  ('Usama', '+555555555', 'userpassword', 'Updating Order'),
  ('User', '+555555555', 'userpassword', 'User');

INSERT INTO Driver (name, age, phone, password, is_accepted, salary, working_start_time, working_end_time, national_id)
VALUES ('John Doe', 30, '123-456-7890', 'securepassword', 1, 5000.00, '08:00:00', '17:00:00', 'ABCD123456');

-- Insert data into the PaymentMethod table
INSERT INTO PaymentMethod (customer_id, method)
VALUES
  (501, 'Card'),
  (501, 'Card'),
  (501, 'PayPal');

-- Insert data into the CardPayment table
INSERT INTO CardPayment (payment_method_id, cardholder_name, card_number, expiration, cvv)
VALUES
  (1, 'John Doe', '1234567812345678', '08/25', '123'),
  (2, 'John Doe', '9876543298765432', '12/23', '456'),
  (3, 'John Doe', '5432167854321678', '05/26', '789');

-- Insert data into the PayPalPayment table
INSERT INTO PayPalPayment (payment_method_id, paypal_account_holder_name, paypal_email)
VALUES
  (3, 'John Doe', 'john.doe@example.com'),
  (1, 'John Doe', 'john.doe.paypal@example.com'),
  (2, 'John Doe', 'john.doe.paypal2@example.com');

INSERT INTO `Order` (customer_id, order_date, delivery_datetime, status, payment_method_id, total)
VALUES
  (501, '2023-08-15', '2023-08-15 13:00:00', 'Cancelled', 1, 25.00),
  (501, '2023-08-16', '2023-08-16 14:30:00', 'Processing', 2, 18.50),
  (501, '2023-08-17', '2023-08-17 12:45:00', 'Ready', 3, 42.75),
  (501, '2023-08-18', '2023-08-18 15:00:00', 'Delivered', 2, 33.00),
  (501, '2023-08-19', '2023-08-19 14:15:00', 'Shipped', 1, 20.50);

INSERT INTO OrderItem (order_id, item_id, topping_id, quantity, item_price)
VALUES
  (1, 2, 1, 2, 12.00), -- Order 1: 2x Spicy Foul Plate with Nutella
  (2, 8, NULL, 1, 7.00),  -- Order 2: 1x Foul Sandwich
  (3, 15, NULL, 3, 8.00), -- Order 3: 3x Oats
  (4, 3, 4, 2, 10.00),   -- Order 4: 2x Omelets with Greek Yogurt topping
  (5, 10, 9, 1, 9.50);   -- Order 5: 1x Tamia Sandwich with Custard topping

INSERT INTO OrderTracking (order_id, status, location_name, latitude, longitude, delivery_datetime)
VALUES
  (1, 'Cancelled', 'Restaurant', 40.7128, -74.0060, '2023-08-15 11:30:00'),
  (2, 'Processing', 'Kitchen', 40.7500, -73.9800, '2023-08-16 14:45:00'),
  (3, 'Ready', 'Pickup Area', 40.8000, -73.9500, '2023-08-17 12:30:00'),
  (4, 'Delivered', 'Customer Address', 40.8500, -73.9100, '2023-08-18 15:45:00'),
  (5, 'Shipped', 'Shipping Center', 40.9000, -73.8700, '2023-08-19 14:00:00');

-- Insert data into the OrderOptions table
INSERT INTO OrderOptions (status)
VALUES
  ('Processing'),
  ('Ready'),
  ('Shipped'),
  ('Delivered'),
  ('Cancelled');

-- Insert data into the Privilege table
INSERT INTO Privilege (privilege)
VALUES
  ('Admin'),
  ('Updating Order'),
  ('Shipping Order'),
  ('Managing Meal'),
  ('Updating Order'),
  ('User');