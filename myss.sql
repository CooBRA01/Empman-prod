CREATE DATABASE signup;
USE signup;
CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  salary DECIMAL(10, 2) NOT NULL,
  image VARCHAR(255) NOT NULL
);

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  salary DECIMAL(10, 2) NOT NULL,
  image VARCHAR(255) NOT NULL
);
INSERT INTO users (name, email, password, address, salary, image)
VALUES ('John Doe', 'johndoe@example.com', 'hashed_password', '123 Main St, City, Country', 5000.00, 'employee_image.jpg');

